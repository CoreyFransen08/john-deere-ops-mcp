import { refreshAccessToken } from "../jd-api";
import type { Env } from "../types";
import type { ApiSession } from "./sessions";
import type { DeereEndpoint } from "./manifest";

const JD_ACCEPT = "application/vnd.deere.axiom.v3+json";

export type ProxyResult = {
  response: Response;
  refreshedSession?: ApiSession;
};

function jsonResponse(data: unknown, status: number): Response {
  return Response.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function targetForEndpoint(request: Request, endpoint: DeereEndpoint, params: Record<string, string>): URL {
  const source = new URL(request.url);
  const resolvedPath = endpoint.path.replace(/\{([^}]+)\}/g, (_, name: string) => {
    const value = params[name];
    if (!value) throw new Error(`Missing route parameter: ${name}`);
    return encodeURIComponent(value);
  });
  const target = new URL(`https://${endpoint.host}${resolvedPath}`);
  target.search = source.search;
  return target;
}

async function makeDeereRequest(request: Request, target: URL, accessToken: string): Promise<Response> {
  const headers = new Headers();
  headers.set("Authorization", `Bearer ${accessToken}`);
  headers.set("Accept", request.headers.get("Accept") || JD_ACCEPT);
  headers.set("Accept-UOM-System", request.headers.get("Accept-UOM-System") || "METRIC");

  const contentType = request.headers.get("Content-Type");
  const hasBody = !["GET", "HEAD"].includes(request.method.toUpperCase());
  let body: ArrayBuffer | undefined;
  if (hasBody) {
    body = await request.arrayBuffer();
    if (contentType) headers.set("Content-Type", contentType);
    if (!contentType && body.byteLength > 0) headers.set("Content-Type", JD_ACCEPT);
  }

  return fetch(target, {
    method: request.method,
    headers,
    body,
  });
}

function copyDeereResponse(response: Response): Response {
  const headers = new Headers();
  const contentType = response.headers.get("Content-Type");
  const location = response.headers.get("Location");
  if (contentType) headers.set("Content-Type", contentType);
  if (location) headers.set("Location", location);
  headers.set("Cache-Control", "no-store");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function forwardJohnDeereRequest(
  request: Request,
  env: Env,
  session: ApiSession,
  endpoint: DeereEndpoint,
  params: Record<string, string>
): Promise<ProxyResult> {
  const url = targetForEndpoint(request, endpoint, params);

  let deereResponse = await makeDeereRequest(request.clone(), url, session.accessToken);
  let refreshedSession: ApiSession | undefined;

  if (deereResponse.status === 401 && session.refreshToken) {
    try {
      const refreshed = await refreshAccessToken(session, env);
      refreshedSession = {
        ...session,
        accessToken: refreshed.access_token,
        refreshToken: refreshed.refresh_token ?? session.refreshToken,
        expiresAt: Date.now() + refreshed.expires_in * 1000,
      };
      deereResponse = await makeDeereRequest(request, url, refreshedSession.accessToken);
    } catch {
      return {
        response: jsonResponse(
          { error: "session_expired", message: "John Deere session expired. Please authenticate again." },
          401
        ),
      };
    }
  }

  return {
    response: copyDeereResponse(deereResponse),
    refreshedSession,
  };
}
