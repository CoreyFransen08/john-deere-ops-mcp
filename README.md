# John Deere Operations Center MCP Server

A remote MCP server hosted on Cloudflare Workers that connects to John Deere Operations Center. Browse organizations, fields, and field operations data via any MCP-compatible client (Claude Desktop, Cursor, etc.).

## Architecture

The server runs as a Cloudflare Worker with a Durable Object (`McpAgent`) providing stateful MCP sessions. Authentication uses a **double OAuth proxy** pattern:

- **Downstream:** The Worker is an OAuth server to MCP clients
- **Upstream:** The Worker is an OAuth client to John Deere

This means authentication happens at the transport layer — no manual auth tool call is needed.

## Setup

### 1. Cloudflare Account & Wrangler CLI

1. **Create a Cloudflare account** (if you don’t have one):
   - Go to [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up) and sign up.
   - Verify your email and complete account setup.

2. **Install the Wrangler CLI** (Cloudflare’s Workers CLI):
   ```bash
   npm install -g wrangler
   ```
   Or use it via `npx` (no global install):
   ```bash
   npx wrangler --version
   ```

3. **Log in to Cloudflare** from the terminal:
   ```bash
   npx wrangler login
   ```
   This opens a browser to authenticate Wrangler with your Cloudflare account.

### 2. Register a John Deere Developer Application

1. Go to [developer.deere.com](https://developer.deere.com) and sign in.
2. Create a new application under **My Applications**.
3. Add your Worker's callback URL as a **Redirect URI**:
   ```
   https://john-deere-mcp.<your-subdomain>.workers.dev/callback
   ```
4. Copy your **Application ID** (Client ID) and **Secret** (Client Secret).

### 3. Create the KV Namespace

```bash
npx wrangler kv namespace create OAUTH_KV
```

Copy the output `id` into `wrangler.jsonc` under `kv_namespaces`.

### 4. Set Secrets

```bash
npx wrangler secret put JD_CLIENT_ID
npx wrangler secret put JD_CLIENT_SECRET
npx wrangler secret put COOKIE_ENCRYPTION_KEY
```

For local development, copy `.dev.vars.example` to `.dev.vars` and fill in the values.

### 5. Install & Deploy

```bash
npm install
npm run deploy
```

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
