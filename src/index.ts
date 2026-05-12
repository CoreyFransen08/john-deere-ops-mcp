/**
 * John Deere Operations Center — Remote MCP Server on Cloudflare Workers
 *
 * Exports:
 *   - JohnDeereMCP (named): McpAgent Durable Object with 4 JD tools
 *   - default: OAuthProvider that protects /mcp with double-OAuth proxy
 */

import OAuthProvider from "@cloudflare/workers-oauth-provider";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import type { Env, JDProps } from "./types";
import { initCacheTable } from "./jd-api";
import { JDAuthHandler } from "./jd-auth-handler";
import { registerJohnDeereTools } from "./tools";

// ---------------------------------------------------------------------------
// McpAgent Durable Object
// ---------------------------------------------------------------------------

export class JohnDeereMCP extends McpAgent<Env, Record<string, never>, JDProps> {
  server = new McpServer({
    name: "john-deere-ops-center",
    version: "1.0.0",
  });

  async init() {
    // Initialize the API response cache table
    initCacheTable(this.ctx);

    registerJohnDeereTools({
      server: this.server,
      props: this.props,
      env: this.env,
      sql: this.sql.bind(this),
    });
  }
}

// ---------------------------------------------------------------------------
// Worker default export — OAuthProvider wrapping the McpAgent
// ---------------------------------------------------------------------------

export default new OAuthProvider({
  apiRoute: "/mcp",
  apiHandler: JohnDeereMCP.serve("/mcp"),
  defaultHandler: JDAuthHandler as unknown as ExportedHandler,
  authorizeEndpoint: "/authorize",
  tokenEndpoint: "/token",
  clientRegistrationEndpoint: "/register",
  accessTokenTTL: 3600,
});
