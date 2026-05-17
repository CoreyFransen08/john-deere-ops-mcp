---
description: Browse John Deere equipment inventory
allowed-tools: ["mcp__john-deere__jd_list_organizations", "mcp__john-deere__jd_list_equipment", "mcp__john-deere__jd_get_equipment"]
argument-hint: [equipment-name-or-id]
---

Browse John Deere equipment visible to the authenticated user.

1. Call `jd_list_organizations` and select the organization.
2. Call `jd_list_equipment` with the chosen org_id.
3. If `$ARGUMENTS` was provided, match it against equipment name, equipment ID, principal ID, or serial number.
4. Present equipment in a clean table: Name, Equipment ID, Principal ID, Type, Archived status.
5. If the user wants details, call `jd_get_equipment` with the selected equipment ID.
6. Mention that telemetry and maintenance health tools usually require a machine principal ID.
