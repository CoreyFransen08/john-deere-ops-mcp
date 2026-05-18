# John Deere Operations Center MCP Server

A remote MCP server hosted on Cloudflare Workers that connects to John Deere Operations Center. Browse organizations, fields, field operations, equipment, work plans, and more via any MCP-compatible client (Claude Desktop, Cursor, etc.).

## Architecture

The server runs as a Cloudflare Worker with a Durable Object (`McpAgent`) providing stateful MCP sessions. Authentication uses a **double OAuth proxy** pattern:

- **Downstream:** The Worker is an OAuth server to MCP clients
- **Upstream:** The Worker is an OAuth client to John Deere

This means authentication happens at the transport layer — no manual auth tool call is needed.

## Setup

### Prerequisites

- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier works)
- A John Deere developer account with an application registered at [developer.deere.com](https://developer.deere.com)
- Node.js 18+

### Quick setup (recommended)

```bash
git clone <repo-url>
cd john-deere-ops-center
npm run setup
```

The interactive setup script (`scripts/setup.mjs`) will walk you through every step:

1. **Install dependencies** — runs `npm install`
2. **Cloudflare login** — runs `wrangler login` in your browser
3. **Create KV namespace** — creates the `OAUTH_KV` namespace and patches its ID into `wrangler.jsonc` automatically
4. **Enter credentials** — prompts for your John Deere **Application ID** (`JD_CLIENT_ID`) and **Secret** (`JD_CLIENT_SECRET`), then pushes them as Cloudflare secrets along with an auto-generated `COOKIE_ENCRYPTION_KEY`
5. **Deploy** — runs `wrangler deploy` and prints your Worker URL

At the end of setup, the script prints:

```
MCP endpoint:   https://<worker>.<subdomain>.workers.dev/mcp
Redirect URI:   https://<worker>.<subdomain>.workers.dev/callback
```

**Register the redirect URI** at [developer.deere.com](https://developer.deere.com) under **My Applications → your app → Redirect URIs** before attempting to authenticate.

> **First login:** After signing in with John Deere, you will be prompted to connect your Operations Center organization to the application. This is a required one-time step — the server detects it automatically and redirects you to `connections.deere.com` to complete the selection. See [`docs/oauth2-flow.md`](docs/oauth2-flow.md) for details.

### Manual setup

If you prefer to run each step yourself:

```bash
npm install
npx wrangler login
npx wrangler kv namespace create OAUTH_KV   # paste the id into wrangler.jsonc
npx wrangler secret put JD_CLIENT_ID
npx wrangler secret put JD_CLIENT_SECRET
npx wrangler secret put COOKIE_ENCRYPTION_KEY
npm run deploy
```

Register your application at [developer.deere.com](https://developer.deere.com) and add `https://<worker>.<subdomain>.workers.dev/callback` as a redirect URI.

For local development, copy `.dev.vars.example` to `.dev.vars` and fill in the values.

### Connect an MCP Client

Add to your MCP client config (e.g. Claude Desktop `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "john-deere": {
      "command": "npx",
      "args": ["mcp-remote", "https://<worker>.<subdomain>.workers.dev/mcp"]
    }
  }
}
```

## Tools

### Organizations & Fields

| Tool | Description |
|------|-------------|
| `jd_list_organizations` | List all accessible organizations |
| `jd_list_fields` | List all fields for an organization |
| `jd_get_field` | Get field details including boundaries |
| `jd_list_field_operations` | List planting, harvest, and application operations for a field |

### Work Plans

| Tool | Description |
|------|-------------|
| `jd_list_work_plans` | List work plans for an organization |
| `jd_get_work_plan` | Get a single work plan by ERID |
| `jd_create_work_plan` | Create a planned work plan |

### Equipment & Machine Health

| Tool | Description |
|------|-------------|
| `jd_list_equipment` | List equipment for an organization |
| `jd_get_equipment` | Get equipment details by ID |
| `jd_get_machine_alerts` | Get machine diagnostic and maintenance alerts |
| `jd_get_machine_engine_hours` | Get engine hour readings |
| `jd_get_machine_hours_of_operation` | Get engine state and operation history |
| `jd_get_machine_location_history` | Get location history or last known position |
| `jd_get_machine_device_state_reports` | Get terminal and connectivity diagnostics |

### Reference Data

| Tool | Description |
|------|-------------|
| `jd_list_products` | List products (chemicals, fertilizers, varieties, etc.) for use in work plans |
| `jd_list_operators` | List operators available for work plan assignment |
| `jd_list_guidance_lines` | List guidance lines for a field |
| `jd_get_guidance_line` | Get a specific guidance line |

### Files & Transfers

| Tool | Description |
|------|-------------|
| `jd_list_org_files` | List files in an organization (setup, prescription, boundary zips, etc.) |
| `jd_get_file` | Get metadata for a single file, including links to machines it can be sent to |
| `jd_create_file` | Create a file ID in an organization. Returns the new fileId for upload |
| `jd_upload_file_bytes` | Upload binary content (base64) to a file ID |
| `jd_transfer_file_to_machine` | Send a file to a piece of equipment over the air |
| `jd_get_file_transfer` | Poll the status of a file-to-machine transfer |

In addition, a browser utility page lives at `https://<worker>.<subdomain>.workers.dev/file-tool` — drop a zip in, let Ops Center round-trip it, then download or push to a machine. Useful for older controllers (e.g. JD 2630) that are picky about USB-formatted RX/boundary zips.

## Commands

| Command | Description |
|---------|-------------|
| `/jd-fields [org]` | Browse fields in an organization |
| `/jd-ops [field]` | View field operations data |
| `/jd-equipment [org]` | Browse equipment and machine health |
| `/jd-work-plans [org]` | View and manage work plans |
| `/jd-machine-health [machine]` | Check machine alerts and hours |
| `/jd-guidance-lines [field]` | View guidance lines for a field |

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

The following scopes are requested automatically during the OAuth flow:

| Scope | Purpose |
|-------|---------|
| `ag1` | View fields, farms, and clients |
| `ag2` | Analyze production data |
| `ag3` | Manage locations and production data |
| `eq1` | View equipment |
| `eq2` | View detailed machine measurements |
| `org1` | View staff, operators, and partners |
| `org2` | Modify staff, operators, and partners |
| `work1` | View work and crop plans |
| `work2` | Create and manage work and crop plans |
| `files` | Files API access |
| `offline_access` | Refresh token (prevents re-authentication every 12 hours) |
