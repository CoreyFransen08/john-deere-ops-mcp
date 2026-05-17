import { Hono } from "hono";
import { fetchWellKnown } from "../jd-api";
import type { Env, JDProps } from "../types";
import { createSession, sessionCookie } from "./sessions";

const SCOPES = "ag1 ag2 ag3 eq1 eq2 org1 org2 work1 work2 files offline_access";
const STATE_COOKIE = "__Host-JD_API_STATE";
const PENDING_COOKIE = "__Host-JDAPI_PENDING";
const STATE_TTL_SECONDS = 600;
const PENDING_TTL_SECONDS = 600;

type Bindings = Env;

type JDTokens = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
};

// Stored in KV while user completes the connections.deere.com org-selection step.
type PendingSession = {
  returnTo: string;
  tokens: JDTokens;
};

const app = new Hono<{ Bindings: Bindings }>();

function clearStateCookie(): string {
  return `${STATE_COOKIE}=; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=0`;
}

function setPendingCookie(id: string): string {
  return `${PENDING_COOKIE}=${id}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=${PENDING_TTL_SECONDS}`;
}

function clearPendingCookie(): string {
  return `${PENDING_COOKIE}=; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=0`;
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

/**
 * Call GET /organizations and return the first 'connections' URI found.
 * Returns null if all orgs are already connected or if the call fails.
 */
async function fetchConnectionsUri(accessToken: string): Promise<string | null> {
  try {
    const res = await fetch("https://sandboxapi.deere.com/platform/organizations", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.deere.axiom.v3+json",
      },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      values?: Array<{ links?: Array<{ rel: string; uri: string }> }>;
    };
    for (const org of data.values ?? []) {
      const link = org.links?.find((l) => l.rel === "connections");
      if (link) return link.uri;
    }
    return null;
  } catch {
    return null;
  }
}

function connectionsPage(connectionsUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Connect Your Organization — John Deere</title>
  <meta http-equiv="refresh" content="3;url=${connectionsUrl}">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f4f4f4;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:16px}
    .card{background:#fff;border-radius:10px;padding:44px 40px;max-width:460px;width:100%;text-align:center;box-shadow:0 2px 16px rgba(0,0,0,.1)}
    .badge{display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;background:#367c2b;border-radius:50%;margin-bottom:22px}
    .badge svg{width:26px;height:26px;fill:#fff}
    h1{font-size:21px;font-weight:600;color:#111;margin-bottom:10px;line-height:1.3}
    p{font-size:14px;color:#555;line-height:1.65;margin-bottom:26px}
    .btn{display:inline-block;background:#367c2b;color:#fff;text-decoration:none;padding:12px 28px;border-radius:6px;font-weight:600;font-size:14px}
    .btn:hover{background:#2d6a24}
    .note{font-size:12px;color:#999;margin-top:14px}
    .bar{margin-top:18px;height:3px;background:#eee;border-radius:2px;overflow:hidden}
    .bar-fill{height:100%;background:#367c2b;animation:prog 3s linear forwards}
    @keyframes prog{from{width:0}to{width:100%}}
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">
      <svg viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
    </div>
    <h1>Connect Your Organization</h1>
    <p>One more step before you can access your farm data. Select which John Deere Operations Center organization to share with this application.</p>
    <a class="btn" href="${connectionsUrl}">Select Organization &rarr;</a>
    <p class="note">Redirecting automatically in 3 seconds&hellip;</p>
    <div class="bar"><div class="bar-fill"></div></div>
  </div>
</body>
</html>`;
}

/**
 * GET /api/auth/login
 * Initiates the John Deere OAuth flow for browser-based clients.
 */
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

/**
 * GET /api/auth/callback
 *
 * Case (a) — initial JD OAuth return:
 *   Validates state, exchanges code for tokens, checks org connection status.
 *   If an org needs connecting, stashes tokens + returnTo in KV and redirects
 *   user to connections.deere.com. Otherwise creates a session immediately.
 *
 * Case (b) — return from connections.deere.com:
 *   Detected by the presence of __Host-JDAPI_PENDING cookie and absence of ?code.
 *   Retrieves stashed tokens and returnTo from KV, then creates a session.
 */
app.get("/callback", async (c) => {
  const cookies = parseCookies(c.req.header("Cookie") ?? null);
  const pendingId = cookies.get(PENDING_COOKIE);
  const code = c.req.query("code");

  // ── Case (b): returning from connections.deere.com ────────────────────────
  if (pendingId && !code) {
    const raw = await c.env.OAUTH_KV.get(`api:pending-session:${pendingId}`);

    if (!raw) {
      const headers = new Headers({ "Set-Cookie": clearPendingCookie(), "Cache-Control": "no-store" });
      return new Response("Connection session expired. Please sign in again.", { status: 400, headers });
    }

    await c.env.OAUTH_KV.delete(`api:pending-session:${pendingId}`);
    const { returnTo, tokens } = JSON.parse(raw) as PendingSession;

    const sessionId = await createSession(c.env, {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() + tokens.expires_in * 1000,
    } satisfies JDProps);

    const headers = new Headers({ Location: returnTo, "Cache-Control": "no-store" });
    headers.append("Set-Cookie", clearPendingCookie());
    headers.append("Set-Cookie", sessionCookie(sessionId));
    return new Response(null, { status: 302, headers });
  }

  // ── Case (a): initial JD OAuth callback ───────────────────────────────────
  const stateParam = c.req.query("state");
  if (!stateParam || !code) return c.json({ error: "invalid_request", message: "Missing code or state." }, 400);

  const expectedHash = cookies.get(STATE_COOKIE);
  if (!expectedHash || expectedHash !== (await stateHash(stateParam))) {
    return c.json({ error: "invalid_state", message: "OAuth state cookie did not match." }, 400);
  }

  const storedState = await c.env.OAUTH_KV.get(`api:oauth-state:${stateParam}`);
  if (!storedState) return c.json({ error: "invalid_state", message: "OAuth state expired." }, 400);
  await c.env.OAUTH_KV.delete(`api:oauth-state:${stateParam}`);

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

  const tokens = (await tokenRes.json()) as JDTokens;

  // Check if any org still needs to be connected before creating a session
  const connectionsUri = await fetchConnectionsUri(tokens.access_token);

  if (connectionsUri) {
    const pendingId = crypto.randomUUID();
    await c.env.OAUTH_KV.put(
      `api:pending-session:${pendingId}`,
      JSON.stringify({ returnTo, tokens } satisfies PendingSession),
      { expirationTtl: PENDING_TTL_SECONDS }
    );

    // Append redirect_uri so JD sends the user back to /api/auth/callback after org selection
    const connectionsUrl = new URL(connectionsUri);
    connectionsUrl.searchParams.set("redirect_uri", redirectUri);

    const headers = new Headers({
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    headers.append("Set-Cookie", clearStateCookie());
    headers.append("Set-Cookie", setPendingCookie(pendingId));

    return new Response(connectionsPage(connectionsUrl.toString()), { status: 200, headers });
  }

  // All orgs already connected — create session immediately
  const sessionId = await createSession(c.env, {
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresAt: Date.now() + tokens.expires_in * 1000,
  } satisfies JDProps);

  const headers = new Headers({ Location: returnTo, "Cache-Control": "no-store" });
  headers.append("Set-Cookie", clearStateCookie());
  headers.append("Set-Cookie", sessionCookie(sessionId));
  return new Response(null, { status: 302, headers });
});

export { app as ApiAuthRoutes };
