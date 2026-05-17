import type { Env, JDProps } from "../types";
import { decryptJson, encryptJson } from "./crypto";

const SESSION_COOKIE = "__Host-JD_API_SESSION";
const SESSION_TTL_SECONDS = 30 * 24 * 60 * 60;

export type ApiSession = JDProps & {
  createdAt: number;
  updatedAt: number;
};

function parseCookies(cookieHeader: string | null): Map<string, string> {
  const cookies = new Map<string, string>();
  for (const cookie of (cookieHeader ?? "").split(";")) {
    const [name, ...valueParts] = cookie.trim().split("=");
    if (name) cookies.set(name, valueParts.join("="));
  }
  return cookies;
}

function sessionKey(sessionId: string): string {
  return `api:session:${sessionId}`;
}

export function getSessionId(request: Request): string | null {
  return parseCookies(request.headers.get("Cookie")).get(SESSION_COOKIE) ?? null;
}

export function sessionCookie(sessionId: string): string {
  return `${SESSION_COOKIE}=${sessionId}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearSessionCookie(): string {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=0`;
}

export async function createSession(env: Env, props: JDProps): Promise<string> {
  const sessionId = crypto.randomUUID();
  const now = Date.now();
  const session: ApiSession = {
    ...props,
    createdAt: now,
    updatedAt: now,
  };
  await env.OAUTH_KV.put(sessionKey(sessionId), await encryptJson(session, env.COOKIE_ENCRYPTION_KEY), {
    expirationTtl: SESSION_TTL_SECONDS,
  });
  return sessionId;
}

export async function loadSession(env: Env, sessionId: string): Promise<ApiSession | null> {
  const encrypted = await env.OAUTH_KV.get(sessionKey(sessionId));
  if (!encrypted) return null;
  return decryptJson<ApiSession>(encrypted, env.COOKIE_ENCRYPTION_KEY);
}

export async function saveSession(env: Env, sessionId: string, session: ApiSession): Promise<void> {
  await env.OAUTH_KV.put(
    sessionKey(sessionId),
    await encryptJson({ ...session, updatedAt: Date.now() }, env.COOKIE_ENCRYPTION_KEY),
    { expirationTtl: SESSION_TTL_SECONDS }
  );
}

export async function deleteSession(env: Env, sessionId: string): Promise<void> {
  await env.OAUTH_KV.delete(sessionKey(sessionId));
}
