/**
 * Hono app handling the John Deere OAuth proxy flow.
 * Routes: GET /authorize, GET /callback
 */

import type { AuthRequest, OAuthHelpers } from "@cloudflare/workers-oauth-provider";
import { Hono } from "hono";
import type { Env, JDProps } from "./types";
import { fetchWellKnown } from "./jd-api";
import {
  createOAuthState,
  bindStateToSession,
  validateOAuthState,
} from "./workers-oauth-utils";

const SCOPES = "ag1 ag2 ag3 eq1 eq2 org1 org2 files offline_access";

type Bindings = Env & { OAUTH_PROVIDER: OAuthHelpers };

const app = new Hono<{ Bindings: Bindings }>();

/**
 * GET /authorize
 * MCP client redirects the user here. We parse the downstream OAuth request,
 * then redirect to John Deere's authorization page.
 */
app.get("/authorize", async (c) => {
  const oauthReqInfo = await c.env.OAUTH_PROVIDER.parseAuthRequest(c.req.raw);
  if (!oauthReqInfo.clientId) {
    return c.text("Invalid OAuth request", 400);
  }

  const { stateToken } = await createOAuthState(oauthReqInfo, c.env.OAUTH_KV);
  const { setCookie } = await bindStateToSession(stateToken);

  const wk = await fetchWellKnown();
  const redirectUri = new URL("/callback", c.req.url).href;

  const authUrl = new URL(wk.authorization_endpoint);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", c.env.JD_CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", SCOPES);
  authUrl.searchParams.set("state", stateToken);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authUrl.toString(),
      "Set-Cookie": setCookie,
    },
  });
});

/**
 * GET /callback
 * John Deere redirects back here with ?code=...&state=...
 * We exchange the code for JD tokens, then complete the downstream OAuth flow.
 */
app.get("/callback", async (c) => {
  let oauthReqInfo: AuthRequest;
  let clearCookie: string;
  try {
    const result = await validateOAuthState(c.req.raw, c.env.OAUTH_KV);
    oauthReqInfo = result.oauthReqInfo;
    clearCookie = result.clearCookie;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "State validation failed";
    return c.text(message, 400);
  }

  const code = c.req.query("code");
  if (!code) return c.text("Missing authorization code", 400);

  // Exchange JD authorization code for tokens
  const wk = await fetchWellKnown();
  const redirectUri = new URL("/callback", c.req.url).href;

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

  const jdTokens = (await tokenRes.json()) as {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };

  // Complete the downstream OAuth flow, embedding JD tokens as encrypted props
  const { redirectTo } = await c.env.OAUTH_PROVIDER.completeAuthorization({
    request: oauthReqInfo,
    userId: "jd-user",
    metadata: { label: "John Deere User" },
    scope: oauthReqInfo.scope,
    props: {
      accessToken: jdTokens.access_token,
      refreshToken: jdTokens.refresh_token,
      expiresAt: Date.now() + jdTokens.expires_in * 1000,
    } satisfies JDProps,
  });

  const headers = new Headers({ Location: redirectTo });
  headers.append("Set-Cookie", clearCookie);
  return new Response(null, { status: 302, headers });
});

export { app as JDAuthHandler };
