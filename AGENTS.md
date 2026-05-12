# Repository Guidelines

## Project Structure & Module Organization

This repository is a TypeScript Cloudflare Worker MCP server for John Deere Operations Center. Runtime code lives in `src/`: `index.ts` defines the Worker, Durable Object MCP agent, and tools; `jd-api.ts` wraps John Deere API access and caching; `jd-auth-handler.ts` handles OAuth; `types.ts` contains shared types. Cloudflare configuration is in `wrangler.jsonc`, TypeScript configuration is in `tsconfig.json`, and local secrets are loaded from `.dev.vars` based on `.dev.vars.example`. Contributor-facing command docs live in `commands/`, and the John Deere skill guide lives in `skills/john-deere-guide/`.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: run `wrangler dev` for local Worker development.
- `npm run typecheck`: run `tsc --noEmit` with strict TypeScript checks.
- `npm run deploy`: deploy the Worker with Wrangler.
- `npx @modelcontextprotocol/inspector@latest`: test the MCP endpoint locally at `http://localhost:8787/mcp`.

## Coding Style & Naming Conventions

Use strict TypeScript and ES modules. Keep imports explicit and prefer shared types from `src/types.ts`. Follow the existing two-space indentation in TypeScript files and keep Cloudflare JSONC formatting consistent with `wrangler.jsonc`. Use descriptive MCP tool names with the `jd_` prefix, such as `jd_list_fields`. Keep endpoint helpers in `jd-api.ts` and OAuth/session logic outside tool handlers when possible.

## Testing Guidelines

There is no dedicated test runner configured yet. At minimum, run `npm run typecheck` before submitting changes. For behavior changes, validate locally with `npm run dev` and the MCP Inspector. Name future tests after the unit or behavior under test, for example `jd-api.cache.test.ts` or `jd-auth-handler.oauth.test.ts`.

## Commit & Pull Request Guidelines

Git history currently contains only `Initial commit`, so use short imperative commit messages such as `Add field operation filters` or `Fix OAuth refresh handling`. Pull requests should include a concise summary, validation steps, affected MCP tools or endpoints, configuration changes, and screenshots or logs when they clarify behavior.

## Security, Configuration & Agent Notes

Never commit `.dev.vars` or real OAuth secrets. Keep required bindings and migrations in `wrangler.jsonc` aligned with code changes. Always ask about caching strategy before changing data-fetching behavior. Existing API caching uses Durable Object SQLite with a five-minute TTL and excludes field operations. If new tables are added, use `uuidv7` for `id` columns, not `uuidv4`.
