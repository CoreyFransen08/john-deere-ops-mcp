import type { Hono } from "hono";
import type { Env } from "../types";
import { withCors } from "./cors";
import { listDeereEndpoints, type DeereEndpoint } from "./manifest";
import { getSessionId, loadSession, saveSession } from "./sessions";
import { forwardJohnDeereRequest } from "./jd-proxy";

type Bindings = Env;
type DeereApiApp = Hono<{ Bindings: Bindings }>;

function jsonError(error: string, message: string, status: number): Response {
  return Response.json(
    { error, message },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    }
  );
}

function toHonoPath(apiPath: string): string {
  return apiPath.replace(/\{([^}]+)\}/g, ":$1");
}

function paramsFromContext(c: { req: { param: () => Record<string, string> } }): Record<string, string> {
  return c.req.param();
}

async function handleEndpoint(
  c: { req: { raw: Request; param: () => Record<string, string> }; env: Env },
  endpoint: DeereEndpoint
) {
  const sessionId = getSessionId(c.req.raw);
  if (!sessionId) return withCors(jsonError("unauthenticated", "No API session cookie found.", 401), c.req.raw, c.env);

  const session = await loadSession(c.env, sessionId);
  if (!session) return withCors(jsonError("unauthenticated", "API session was not found or expired.", 401), c.req.raw, c.env);

  const result = await forwardJohnDeereRequest(c.req.raw, c.env, session, endpoint, paramsFromContext(c));
  if (result.refreshedSession) await saveSession(c.env, sessionId, result.refreshedSession);
  return withCors(result.response, c.req.raw, c.env);
}

export function registerStructuredDeereRoutes(app: DeereApiApp) {
  for (const endpoint of listDeereEndpoints()) {
    app.on(endpoint.method, toHonoPath(endpoint.apiPath), (c) => handleEndpoint(c, endpoint));
  }
}
