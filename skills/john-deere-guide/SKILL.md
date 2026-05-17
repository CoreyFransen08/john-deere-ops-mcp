---
name: john-deere-guide
description: >
  Guide for working with John Deere Operations Center data. Use when the user
  asks about "John Deere fields", "my farm data", "Operations Center",
  "field operations", "work plans", "equipment", "machine health",
  "guidance lines", "crop data", "planting records", "harvest data",
  or wants to browse their agricultural organization, field, or equipment data.
version: 2.0.0
---

# John Deere Operations Center Guide

## Overview

This plugin connects to John Deere Operations Center via a remote MCP server
hosted on Cloudflare Workers. Authentication is handled automatically via OAuth
at the transport layer. No manual `jd_authenticate` tool call is needed.

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

### 5. Work Plans

Work plans are organization-level planned work, not recorded field operations.
Use `jd_list_work_plans` with filters such as `year`, `work_type`,
`work_status`, and `field_ids`.

Use `jd_get_work_plan` for full details. Use `jd_create_work_plan` only after
confirming field, year, work type, operation inputs, rates, assignments, and
optional guidance. Work plan creation requires Deere `work2` scope and org
Work access level 2; a 403 usually means the Deere app or user lacks create
permission for that organization.

### 6. Guidance Lines

Use `jd_list_guidance_lines` with `org_id` and `field_id` to discover guidance
lines that can be referenced in work plan `guidanceSettings`.

Use `jd_get_guidance_line` for details. Request `embed: "shapes"` only when
geometry is needed.

### 7. Products

Use `jd_list_products` to discover valid product IDs and URIs for work plan
operation inputs. Supported product types are:
- `CHEMICAL`
- `FERTILIZER`
- `VARIETY`
- `TANK_MIX`
- `DRY_BLEND`

Crop inputs can use Deere crop type names such as `ALFALFA`.

### 8. Equipment

Use `jd_list_equipment` to browse equipment for an organization. Equipment
records include both equipment IDs and principal IDs when available.

Use `jd_get_equipment` for details. Work plan assignments use equipment IDs or
equipment URIs. Machine health tools generally require the principal ID.

### 9. Machine Health & Maintenance Context

Use machine health tools for read-only equipment status and maintenance context:
- `jd_get_machine_alerts` for machine, diagnostic, geofence, and maintenance alerts
- `jd_get_machine_engine_hours` for engine hour readings
- `jd_get_machine_hours_of_operation` for engine state and operation durations
- `jd_get_machine_location_history` for location history or last known location
- `jd_get_machine_device_state_reports` for terminal and connectivity diagnostics

Do not use breadcrumbs; this plugin intentionally omits a breadcrumb command
because it has no strong workflow value here.

## Required OAuth Scopes

The server requests these scopes during authentication:
- `ag1`, `ag2`, `ag3` — agricultural data access
- `eq1`, `eq2` — equipment data
- `org1`, `org2` — organization access
- `work1`, `work2` — work plan read/create access
- `files` — file access
- `offline_access` — refresh token support

## Caching

The server uses Durable Object SQLite caching for selected GET requests.
Work plans, field operations, guidance lines, product lookups, operators, and
work-plan creation helpers are not cached unless explicitly changed.

Equipment reads use short TTL caching:
- 5 minutes for equipment inventory and details
- 1 minute for machine alerts, engine hours, operation hours, location history,
  and device state reports

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
| No work plans | Work plans may require `work1`, year/work type filters, or org Work access |
| Cannot create work plan | Create requires `work2` and Work access level 2 in Deere |
| Machine health 403 | Equipment may lack admin/controlling rights or telemetry access |
