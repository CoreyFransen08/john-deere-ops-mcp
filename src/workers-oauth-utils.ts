/**
 * OAuth utility functions for state management and CSRF protection.
 * Adapted from cloudflare/ai demos reference implementation.
 */

import type { AuthRequest } from "@cloudflare/workers-oauth-provider";

export class OAuthError extends Error {
  constructor(
    public code: string,
    public description: string,
    public statusCode = 400
  ) {
    super(description);
    this.name = "OAuthError";
  }

  toResponse(): Response {
    return new Response(
      JSON.stringify({ error: this.code, error_description: this.description }),
      { status: this.statusCode, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * Creates and stores OAuth state information, returning a state token.
 */
export async function createOAuthState(
  oauthReqInfo: AuthRequest,
  kv: KVNamespace,
  stateTTL = 600
): Promise<{ stateToken: string }> {
  const stateToken = crypto.randomUUID();
  await kv.put(`oauth:state:${stateToken}`, JSON.stringify(oauthReqInfo), {
    expirationTtl: stateTTL,
  });
  return { stateToken };
}

/**
 * Binds an OAuth state token to the user's browser session using a secure cookie.
 * Hashes the state token for defense-in-depth.
 */
export async function bindStateToSession(
  stateToken: string
): Promise<{ setCookie: string }> {
  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(stateToken));
  const hashHex = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const setCookie = `__Host-CONSENTED_STATE=${hashHex}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=600`;
  return { setCookie };
}

/**
 * Validates OAuth state from the request, ensuring:
 * 1. The state parameter exists in KV
 * 2. The state hash matches the session cookie
 */
export async function validateOAuthState(
  request: Request,
  kv: KVNamespace
): Promise<{ oauthReqInfo: AuthRequest; clearCookie: string }> {
  const url = new URL(request.url);
  const stateFromQuery = url.searchParams.get("state");

  if (!stateFromQuery) {
    throw new OAuthError("invalid_request", "Missing state parameter", 400);
  }

  const storedDataJson = await kv.get(`oauth:state:${stateFromQuery}`);
  if (!storedDataJson) {
    throw new OAuthError("invalid_request", "Invalid or expired state", 400);
  }

  // Validate session cookie binding
  const cookieHeader = request.headers.get("Cookie") || "";
  const cookies = cookieHeader.split(";").map((c) => c.trim());
  const consentedCookie = cookies.find((c) => c.startsWith("__Host-CONSENTED_STATE="));
  const consentedHash = consentedCookie
    ? consentedCookie.substring("__Host-CONSENTED_STATE=".length)
    : null;

  if (!consentedHash) {
    throw new OAuthError(
      "invalid_request",
      "Missing session binding cookie - authorization flow must be restarted",
      400
    );
  }

  const encoder = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoder.encode(stateFromQuery));
  const stateHash = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  if (stateHash !== consentedHash) {
    throw new OAuthError(
      "invalid_request",
      "State token does not match session - possible CSRF attack",
      400
    );
  }

  const oauthReqInfo = JSON.parse(storedDataJson) as AuthRequest;

  // Delete from KV (one-time use)
  await kv.delete(`oauth:state:${stateFromQuery}`);

  const clearCookie =
    "__Host-CONSENTED_STATE=; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=0";

  return { oauthReqInfo, clearCookie };
}
