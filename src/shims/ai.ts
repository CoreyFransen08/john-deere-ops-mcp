/**
 * Stub for the `ai` package.
 *
 * The `agents` SDK references `ai` from its MCP *client* code path
 * (`MCPClientManager.ensureJsonSchema` / `getAITools`). This Worker only
 * uses the MCP *server* side via `McpAgent`, so that branch is never
 * executed at runtime — but esbuild still has to resolve the dynamic
 * `await import("ai")` at bundle time.
 *
 * Aliased via the `alias` block in `wrangler.jsonc`.
 */

export function jsonSchema(): never {
  throw new Error(
    "[ai-shim] The `ai` package was stubbed out at build time because this Worker " +
      "does not use the agents SDK MCP client. If you start consuming external MCP " +
      "servers via `getAITools()`, install the real `ai` package and remove this alias."
  );
}
