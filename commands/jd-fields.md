---
description: List John Deere fields for an organization
allowed-tools: ["mcp__john-deere__jd_list_organizations", "mcp__john-deere__jd_list_fields", "mcp__john-deere__jd_get_field"]
argument-hint: [org-name-or-id]
---

List fields from John Deere Operations Center.

1. Call `jd_list_organizations` to find available orgs.
2. If the user provided an argument ($ARGUMENTS), match it against org names or IDs.
   If no argument was given, show the list of orgs and ask which one to use.
3. Call `jd_list_fields` with the chosen org_id.
4. Present the fields in a clean table format: Name, ID, Archived status.
5. Ask if the user wants details on any specific field. If yes, call `jd_get_field`.
