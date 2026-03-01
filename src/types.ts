export interface Env {
  MCP_OBJECT: DurableObjectNamespace;
  OAUTH_KV: KVNamespace;
  JD_CLIENT_ID: string;
  JD_CLIENT_SECRET: string;
  COOKIE_ENCRYPTION_KEY: string;
}

export type JDProps = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  [key: string]: unknown;
};

/** Shape of the tagged-template `this.sql` function on McpAgent */
export type SqlTagFn = <T = Record<string, string | number | boolean | null>>(
  strings: TemplateStringsArray,
  ...values: (string | number | boolean | null)[]
) => T[];
