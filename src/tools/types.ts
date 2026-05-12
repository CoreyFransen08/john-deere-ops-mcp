import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Env, JDProps, SqlTagFn } from "../types";

export interface ToolRegistrationContext {
  server: McpServer;
  props: JDProps;
  env: Env;
  sql: SqlTagFn;
}
