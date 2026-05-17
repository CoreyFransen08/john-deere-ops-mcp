# John Deere Operations Center MCP Server

A remote MCP server hosted on Cloudflare Workers that connects to John Deere Operations Center. Browse organizations, fields, and field operations data via any MCP-compatible client (Claude Desktop, Cursor, etc.).

## Architecture

The server runs as a Cloudflare Worker with a Durable Object (`McpAgent`) providing stateful MCP sessions. Authentication uses a **double OAuth proxy** pattern:

- **Downstream:** The Worker is an OAuth server to MCP clients
- **Upstream:** The Worker is an OAuth client to John Deere

This means authentication happens at the transport layer — no manual auth tool call is needed.

## Setup

### Quick setup (recommended)

Prerequisites: a Cloudflare account, a John Deere developer account, and Node.js installed locally.

1. Clone the repo and `cd` into it.
2. Run:
   ```bash
   npm run setup
   ```

The setup script will:

- install dependencies (which provides the Wrangler CLI),
- run `wrangler login` to authenticate you with Cloudflare,
- create the `OAUTH_KV` namespace and patch its id into `wrangler.jsonc`,
- prompt you for your John Deere **Client ID** and **Client Secret** and push them to Cloudflare as secrets (along with an auto-generated `COOKIE_ENCRYPTION_KEY`),
- run `wrangler deploy`,
- print the MCP endpoint URL (`https://…/mcp`) and the redirect URI you must register at developer.deere.com (`https://…/callback`).

Before the deployed Worker can complete an OAuth flow, register the printed `/callback` URL at [developer.deere.com](https://developer.deere.com) under **My Applications → your app → Redirect URIs**.

### Manual setup

If you'd rather run each step yourself, the equivalent commands are:

```bash
npm install
npx wrangler login
npx wrangler kv namespace create OAUTH_KV   # paste the id into wrangler.jsonc
npx wrangler secret put JD_CLIENT_ID
npx wrangler secret put JD_CLIENT_SECRET
npx wrangler secret put COOKIE_ENCRYPTION_KEY
npm run deploy
```

Register a John Deere application at [developer.deere.com](https://developer.deere.com), copy the Application ID/Secret into the `wrangler secret put` prompts, and add `https://john-deere-mcp.<your-subdomain>.workers.dev/callback` as a redirect URI on the app.

For local development, copy `.dev.vars.example` to `.dev.vars` and fill in the values.

### 6. Connect an MCP Client

Add to your client's MCP config (e.g. Claude Desktop `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "john-deere": {
      "command": "npx",
      "args": ["mcp-remote", "https://john-deere-mcp.<your-subdomain>.workers.dev/mcp"]
    }
  }
}
```

## Tools

| Tool | Description |
|------|-------------|
| `jd_list_organizations` | Lists all accessible organizations |
| `jd_list_fields` | Lists fields for an organization |
| `jd_get_field` | Gets field details including boundaries |
| `jd_list_field_operations` | Lists planting/harvest/application operations |

## Commands

| Command | Description |
|---------|-------------|
| `/jd-fields [org]` | Browse fields in an organization |
| `/jd-ops [field]` | View field operations data |

## Local Development

```bash
cp .dev.vars.example .dev.vars
# Fill in JD_CLIENT_ID, JD_CLIENT_SECRET, COOKIE_ENCRYPTION_KEY
npm run dev
```

Test with the MCP Inspector:
```bash
npx @modelcontextprotocol/inspector@latest
```
Connect to `http://localhost:8787/mcp`.

Transport Type: Streamable HTTP
Connection Type: Direct

## Environment

This targets the **John Deere Sandbox** (`sandboxapi.deere.com`). Sandbox limits:

- Max 5 connected organizations
- Max 150,000 API calls/month
- 18-month maximum sandbox duration

For production access, apply through the John Deere developer portal.

## Required OAuth Scopes

`ag1 ag2 ag3 eq1 eq2 org1 org2 files offline_access`

These are requested automatically during the OAuth flow.
