import { Hono } from "hono";
import type { Env } from "../types";
import { JDAuthHandler } from "../jd-auth-handler";
import { ApiAuthRoutes } from "./auth";
import { corsHeaders, withCors } from "./cors";
import { fileToolPage } from "./file-tool-page";
import { listDeereEndpoints } from "./manifest";
import { registerStructuredDeereRoutes } from "./routes";
import { clearSessionCookie, deleteSession, getSessionId, loadSession } from "./sessions";

type Bindings = Env;

const app = new Hono<{ Bindings: Bindings }>();

function jsonError(error: string, message: string, status: number): Response {
  return Response.json(
    { error, message },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    }
  );
}

app.options("/api/*", (c) => new Response(null, { status: 204, headers: corsHeaders(c.req.raw, c.env) }));

app.route("/api/auth", ApiAuthRoutes);

app.post("/api/auth/logout", async (c) => {
  const sessionId = getSessionId(c.req.raw);
  if (sessionId) await deleteSession(c.env, sessionId);
  return withCors(
    Response.json(
      { ok: true },
      {
        headers: {
          "Set-Cookie": clearSessionCookie(),
          "Cache-Control": "no-store",
        },
      }
    ),
    c.req.raw,
    c.env
  );
});

app.get("/api/auth/me", async (c) => {
  const sessionId = getSessionId(c.req.raw);
  if (!sessionId) return withCors(jsonError("unauthenticated", "No API session cookie found.", 401), c.req.raw, c.env);

  const session = await loadSession(c.env, sessionId);
  if (!session) return withCors(jsonError("unauthenticated", "API session was not found or expired.", 401), c.req.raw, c.env);

  return withCors(
    Response.json(
      {
        authenticated: true,
        expiresAt: session.expiresAt,
      },
      { headers: { "Cache-Control": "no-store" } }
    ),
    c.req.raw,
    c.env
  );
});

app.get("/api/endpoints", (c) =>
  withCors(Response.json({ values: listDeereEndpoints() }, { headers: { "Cache-Control": "no-store" } }), c.req.raw, c.env)
);

registerStructuredDeereRoutes(app);

app.all("/api/*", (c) => withCors(jsonError("not_found", "Unknown API route.", 404), c.req.raw, c.env));

app.get("/file-tool", (c) =>
  new Response(fileToolPage(), {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  })
);

app.route("/", JDAuthHandler);

export { app as DefaultHandler };
