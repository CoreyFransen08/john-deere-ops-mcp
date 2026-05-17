import { Hono } from "hono";
import { fetchWellKnown } from "../jd-api";
import type { Env, JDProps } from "../types";
import { createSession, sessionCookie } from "./sessions";

const SCOPES = "ag1 ag2 ag3 eq1 eq2 org1 org2 work1 work2 files offline_access";
const STATE_COOKIE = "__Host-JD_API_STATE";
const STATE_TTL_SECONDS = 600;

type Bindings = Env;

const app = new Hono<{ Bindings: Bindings }>();

function clearStateCookie(): string {
  return `${STATE_COOKIE}=; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=0`;
}

function parseCookies(cookieHeader: string | null): Map<string, string> {
  const cookies = new Map<string, string>();
  for (const cookie of (cookieHeader ?? "").split(";")) {
    const [name, ...valueParts] = cookie.trim().split("=");
    if (name) cookies.set(name, valueParts.join("="));
  }
  return cookies;
}

function allowedReturnOrigins(env: Env, fallbackOrigin: string): Set<string> {
  const configured = env.API_ALLOWED_ORIGINS?.split(",").map((origin) => origin.trim()).filter(Boolean);
  return new Set(configured?.length ? configured : [fallbackOrigin]);
}

async function stateHash(state: string): Promise<string> {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(state));
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function safeReturnTo(value: string | null, fallback: URL, env: Env): string {
  if (!value) return new URL("/api/auth/me", fallback).href;
  const candidate = new URL(value, fallback);
  if (!allowedReturnOrigins(env, fallback.origin).has(candidate.origin)) {
    return new URL("/api/auth/me", fallback).href;
  }
  return candidate.href;
}

app.get("/login", async (c) => {
  const state = crypto.randomUUID();
  const requestUrl = new URL(c.req.url);
  const returnTo = safeReturnTo(c.req.query("returnTo") ?? null, requestUrl, c.env);

  await c.env.OAUTH_KV.put(`api:oauth-state:${state}`, JSON.stringify({ returnTo }), {
    expirationTtl: STATE_TTL_SECONDS,
  });

  const wk = await fetchWellKnown();
  const redirectUri = new URL("/api/auth/callback", c.req.url).href;
  const authUrl = new URL(wk.authorization_endpoint);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", c.env.JD_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", SCOPES);
  authUrl.searchParams.set("state", state);

  const stateCookie = `${STATE_COOKIE}=${await stateHash(state)}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=${STATE_TTL_SECONDS}`;

  return new Response(null, {
    status: 302,
    headers: {
      Location: authUrl.toString(),
      "Set-Cookie": stateCookie,
      "Cache-Control": "no-store",
    },
  });
});

app.get("/callback", async (c) => {
  const state = c.req.query("state");
  const code = c.req.query("code");
  if (!state || !code) return c.json({ error: "invalid_request", message: "Missing code or state." }, 400);

  const cookies = parseCookies(c.req.header("Cookie") ?? null);
  const expectedHash = cookies.get(STATE_COOKIE);
  if (!expectedHash || expectedHash !== (await stateHash(state))) {
    return c.json({ error: "invalid_state", message: "OAuth state cookie did not match." }, 400);
  }

  const storedState = await c.env.OAUTH_KV.get(`api:oauth-state:${state}`);
  if (!storedState) return c.json({ error: "invalid_state", message: "OAuth state expired." }, 400);
  await c.env.OAUTH_KV.delete(`api:oauth-state:${state}`);

  const { returnTo } = JSON.parse(storedState) as { returnTo: string };
  const wk = await fetchWellKnown();
  const redirectUri = new URL("/api/auth/callback", c.req.url).href;

  const tokenRes = await fetch(wk.token_endpoint, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${c.env.JD_CLIENT_ID}:${c.env.JD_CLIENT_SECRET}`),
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    return c.text(`Token exchange failed (${tokenRes.status}): ${text}`, 502);
  }

  const tokens = (await tokenRes.json()) as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };

  const sessionId = await createSession(c.env, {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresAt: Date.now() + tokens.expires_in * 1000,
  } satisfies JDProps);

  const headers = new Headers({
    Location: returnTo,
    "Cache-Control": "no-store",
  });
  headers.append("Set-Cookie", clearStateCookie());
  headers.append("Set-Cookie", sessionCookie(sessionId));
  return new Response(null, { status: 302, headers });
});

export { app as ApiAuthRoutes };
