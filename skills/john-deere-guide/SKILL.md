---
name: john-deere-guide
description: >
  Guide for working with John Deere Operations Center data. Use when the user
  asks about "John Deere fields", "my farm data", "Operations Center",
  "field operations", "crop data", "planting records", "harvest data",
  or wants to browse their agricultural organization and field information.
version: 1.0.0
---

# John Deere Operations Center Guide

## Overview

This plugin connects to John Deere Operations Center via a remote MCP server
hosted on Cloudflare Workers. Authentication is handled automatically via OAuth
at the transport layer — no manual authentication step is needed.

The server targets the **sandbox** API environment at `sandboxapi.deere.com`.

## Workflow

### 1. Authentication

Authentication is handled automatically when the MCP client connects to the
remote server. The OAuth flow redirects the user to John Deere's login page
and exchanges tokens transparently. No `jd_authenticate` tool call is needed.

If authentication fails, check:
- The Worker is deployed and running
- `JD_CLIENT_ID` and `JD_CLIENT_SECRET` secrets are set on the Worker
- The Worker's `/callback` URL is registered as a redirect URI at developer.deere.com
- The user has a valid John Deere account

### 2. Browse Organizations

Call `jd_list_organizations` to see all orgs the user can access. Each org has
an `id` needed for subsequent field queries.

If an org shows a "connections" link, the user may need to approve the
application's access in Operations Center first.

### 3. Browse Fields

Call `jd_list_fields` with the `org_id` to list all fields. Fields include:
- **id** — unique identifier
- **name** — field name
- **archived** — whether the field is archived

For full details including boundaries, use `jd_get_field` with both `org_id`
and `field_id`.

### 4. Field Operations

Call `jd_list_field_operations` with `org_id` and `field_id` to see
planting, harvesting, and application records. Operations include:
- Operation type (planting, harvesting, application)
- Start and end dates
- Area covered
- Products applied (for application operations)

## Required OAuth Scopes

The server requests these scopes during authentication:
- `ag1`, `ag2`, `ag3` — agricultural data access
- `eq1`, `eq2` — equipment data
- `org1`, `org2` — organization access
- `files` — file access
- `offline_access` — refresh token support

## Sandbox Limitations

- Maximum 5 connected organizations
- Maximum 150,000 API calls per month
- Apps cannot remain in sandbox longer than 18 months
- For production use, request approval from John Deere

## Troubleshooting

| Issue | Solution |
|-------|----------|
| OAuth redirect fails | Check Worker URL and JD redirect URI match |
| 401 after working | Token expired — the server auto-refreshes, but if it fails, reconnect |
| No organizations | User needs to connect their Operations Center account to the registered app |
| No fields | Check the org ID is correct; the org may have no fields configured |
| No operations | The field may not have recorded operations, or `ag1`/`ag2` scopes may be missing |
