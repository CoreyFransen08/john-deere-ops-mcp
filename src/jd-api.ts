import type { Env, JDProps, SqlTagFn } from "./types";

const JD_API_BASE = "https://sandboxapi.deere.com/platform";
const JD_ACCEPT = "application/vnd.deere.axiom.v3+json";
const JD_WELL_KNOWN =
  "https://signin.johndeere.com/oauth2/aus78tnlaysMraFhC1t7/.well-known/oauth-authorization-server";

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

type FetchOptions = {
  cache?: boolean;
  ttlMs?: number;
};

type RequestOptions = {
  method: "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
};

export type JDRequestResult<T = unknown> = {
  status: number;
  location: string | null;
  data: T | null;
};

/**
 * Fetch the JD OAuth well-known configuration.
 */
export async function fetchWellKnown() {
  const res = await fetch(JD_WELL_KNOWN);
  if (!res.ok) throw new Error(`Failed to fetch well-known config: ${res.status}`);
  return res.json() as Promise<{ authorization_endpoint: string; token_endpoint: string }>;
}

/**
 * Refresh the JD access token using the refresh token.
 */
export async function refreshAccessToken(
  props: JDProps,
  env: Env
): Promise<{ access_token: string; refresh_token?: string; expires_in: number }> {
  if (!props.refreshToken) throw new Error("No refresh token available");

  const wk = await fetchWellKnown();
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: props.refreshToken,
  });

  const res = await fetch(wk.token_endpoint, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${env.JD_CLIENT_ID}:${env.JD_CLIENT_SECRET}`),
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  });

  if (!res.ok) throw new Error(`Token refresh failed: ${res.status}`);
  return res.json() as Promise<{ access_token: string; refresh_token?: string; expires_in: number }>;
}

/**
 * Initialize the cache table in the Durable Object's embedded SQLite.
 * Uses raw SQL via the ctx.storage.sql interface.
 */
export function initCacheTable(ctx: DurableObjectState) {
  ctx.storage.sql.exec(
    "CREATE TABLE IF NOT EXISTS cache (key TEXT PRIMARY KEY, data TEXT, expires_at INTEGER)"
  );
}

/**
 * Check the DO SQLite cache for a cached API response.
 */
function getCached(sql: SqlTagFn, key: string): unknown | null {
  const rows = sql`SELECT data, expires_at FROM cache WHERE key = ${key}`;
  if (rows.length === 0) return null;
  const row = rows[0] as { data: string; expires_at: number };
  if (row.expires_at < Date.now()) {
    sql`DELETE FROM cache WHERE key = ${key}`;
    return null;
  }
  return JSON.parse(row.data);
}

/**
 * Store an API response in the DO SQLite cache.
 */
function setCache(sql: SqlTagFn, key: string, data: unknown, ttlMs = CACHE_TTL_MS) {
  const jsonData = JSON.stringify(data);
  const expiresAt = Date.now() + ttlMs;
  sql`INSERT OR REPLACE INTO cache (key, data, expires_at) VALUES (${key}, ${jsonData}, ${expiresAt})`;
}

/**
 * Determines whether a given API path should be cached.
 * Field operations and work plans change frequently and are not cached.
 */
function isCacheable(path: string): boolean {
  return (
    !path.includes("fieldOperations") &&
    !path.includes("field-operations") &&
    !path.includes("workPlans")
  );
}

/**
 * Make an authenticated request to the John Deere API.
 * Automatically retries with a refreshed token on 401.
 * Uses DO SQLite cache for cacheable paths.
 */
export async function jdFetch(
  path: string,
  props: JDProps,
  env: Env,
  sql: SqlTagFn,
  options: FetchOptions = {}
): Promise<unknown> {
  const url = path.startsWith("http") ? path : `${JD_API_BASE}${path}`;
  console.log(`[jdFetch] GET ${url}`);
  const shouldUseCache = options.cache !== false && isCacheable(url);

  // Check cache for cacheable paths
  if (shouldUseCache) {
    const cached = getCached(sql, url);
    if (cached) {
      console.log(`[jdFetch] cache HIT for ${url}`);
      return cached;
    }
  }

  const reqHeaders = {
    Authorization: `Bearer ${props.accessToken.slice(0, 8)}…`,
    Accept: JD_ACCEPT,
    "Accept-UOM-System": "METRIC",
  };
  console.log(`[jdFetch] request headers:`, JSON.stringify(reqHeaders));

  let res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${props.accessToken}`,
      Accept: JD_ACCEPT,
      "Accept-UOM-System": "METRIC",
    },
  });

  console.log(`[jdFetch] response status: ${res.status} ${res.statusText}`);
  console.log(`[jdFetch] response headers:`, JSON.stringify(Object.fromEntries(res.headers.entries())));

  // Attempt token refresh on 401
  if (res.status === 401 && props.refreshToken) {
    console.log(`[jdFetch] 401 received, attempting token refresh…`);
    try {
      const refreshed = await refreshAccessToken(props, env);
      props.accessToken = refreshed.access_token;
      res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${props.accessToken}`,
          Accept: JD_ACCEPT,
          "Accept-UOM-System": "METRIC",
        },
      });
      console.log(`[jdFetch] retry status: ${res.status} ${res.statusText}`);
    } catch {
      throw new Error("Session expired. Please re-authenticate.");
    }
  }

  if (!res.ok) {
    const text = await res.text();
    console.error(`[jdFetch] ERROR ${res.status}: ${text}`);
    throw new Error(`John Deere API error (${res.status}): ${text}`);
  }

  const rawText = await res.text();
  console.log(`[jdFetch] raw response body (first 2000 chars): ${rawText.slice(0, 2000)}`);

  const data = JSON.parse(rawText);
  console.log(`[jdFetch] parsed keys: ${Object.keys(data as Record<string, unknown>).join(", ")}`);
  if ((data as Record<string, unknown>).values) {
    console.log(`[jdFetch] values count: ${(((data as Record<string, unknown>).values) as unknown[]).length}`);
  }
  if ((data as Record<string, unknown>).total) {
    console.log(`[jdFetch] total: ${(data as Record<string, unknown>).total}`);
  }

  // Store in cache if cacheable
  if (shouldUseCache) {
    setCache(sql, url, data, options.ttlMs);
  }

  return data;
}

/**
 * Make an authenticated mutating request to the John Deere API.
 * Automatically retries with a refreshed token on 401.
 */
export async function jdRequest<T = unknown>(
  path: string,
  props: JDProps,
  env: Env,
  options: RequestOptions
): Promise<JDRequestResult<T>> {
  const url = path.startsWith("http") ? path : `${JD_API_BASE}${path}`;
  console.log(`[jdRequest] ${options.method} ${url}`);

  const makeRequest = () =>
    fetch(url, {
      method: options.method,
      headers: {
        Authorization: `Bearer ${props.accessToken}`,
        Accept: JD_ACCEPT,
        "Accept-UOM-System": "METRIC",
        ...(options.body === undefined ? {} : { "Content-Type": JD_ACCEPT }),
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    });

  let res = await makeRequest();
  console.log(`[jdRequest] response status: ${res.status} ${res.statusText}`);

  if (res.status === 401 && props.refreshToken) {
    console.log("[jdRequest] 401 received, attempting token refresh...");
    try {
      const refreshed = await refreshAccessToken(props, env);
      props.accessToken = refreshed.access_token;
      res = await makeRequest();
      console.log(`[jdRequest] retry status: ${res.status} ${res.statusText}`);
    } catch {
      throw new Error("Session expired. Please re-authenticate.");
    }
  }

  const location = res.headers.get("Location");

  if (!res.ok) {
    const text = await res.text();
    console.error(`[jdRequest] ERROR ${res.status}: ${text}`);
    throw new Error(`John Deere API error (${res.status}): ${text}`);
  }

  if (res.status === 204) {
    return { status: res.status, location, data: null };
  }

  const rawText = await res.text();
  if (!rawText) {
    return { status: res.status, location, data: null };
  }

  return { status: res.status, location, data: JSON.parse(rawText) as T };
}

/**
 * Auto-paginating fetch for John Deere list endpoints.
 * Follows HATEOAS `nextPage` links and merges all `values` arrays.
 */
export async function jdFetchAll<T>(
  path: string,
  props: JDProps,
  env: Env,
  sql: SqlTagFn,
  options: FetchOptions = {}
): Promise<T[]> {
  const baseUrl = path.startsWith("http") ? path : `${JD_API_BASE}${path}`;
  const shouldUseCache = options.cache !== false && isCacheable(baseUrl);
  const aggregateCacheKey = `fetchAll:${baseUrl}`;

  if (shouldUseCache) {
    const cached = getCached(sql, aggregateCacheKey);
    if (cached) {
      console.log(`[jdFetchAll] aggregate cache HIT for ${baseUrl}`);
      return cached as T[];
    }
  }

  let url = baseUrl;
  const allValues: T[] = [];
  let page = 0;

  console.log(`[jdFetchAll] starting pagination for: ${path}`);

  while (url) {
    page++;
    console.log(`[jdFetchAll] page ${page}: ${url}`);

    const data = (await jdFetch(url, props, env, sql, options)) as {
      values?: T[];
      total?: number;
      links?: Array<{ rel: string; uri: string }>;
      [key: string]: unknown;
    };

    console.log(`[jdFetchAll] page ${page} top-level keys: ${Object.keys(data).join(", ")}`);
    console.log(`[jdFetchAll] page ${page} values?: ${data.values ? data.values.length : "undefined"}`);
    console.log(`[jdFetchAll] page ${page} total?: ${data.total ?? "undefined"}`);
    console.log(`[jdFetchAll] page ${page} links: ${JSON.stringify(data.links?.map(l => l.rel))}`);

    if (data.values) {
      allValues.push(...data.values);
    } else {
      // Log the full response if values is missing — maybe data is in a different shape
      console.warn(`[jdFetchAll] page ${page} NO values key! Full response: ${JSON.stringify(data).slice(0, 2000)}`);
    }

    const nextLink = data.links?.find((l) => l.rel === "nextPage");
    url = nextLink?.uri ?? "";
  }

  console.log(`[jdFetchAll] done. Total items collected: ${allValues.length}`);

  if (shouldUseCache) {
    setCache(sql, aggregateCacheKey, allValues, options.ttlMs);
  }

  return allValues;
}
