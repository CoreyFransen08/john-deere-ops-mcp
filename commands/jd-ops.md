---
description: List field operations from John Deere
allowed-tools: ["mcp__john-deere__jd_list_organizations", "mcp__john-deere__jd_list_fields", "mcp__john-deere__jd_list_field_operations"]
argument-hint: [field-name-or-id]
---

List field operations (planting, harvesting, applications) from John Deere Operations Center.

1. Call `jd_list_organizations` to find available orgs.
2. If there are multiple orgs, ask the user which one to use.
3. Call `jd_list_fields` for the selected org.
4. If the user provided an argument ($ARGUMENTS), match it against field names or IDs.
   If no argument was given, show the fields and ask which one to check.
5. Call `jd_list_field_operations` with the org_id and field_id.
6. Present operations grouped by type (planting, harvesting, application) with dates and details.
