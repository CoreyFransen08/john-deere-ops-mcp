---
description: Browse and create John Deere work plans
allowed-tools: ["mcp__john-deere__jd_list_organizations", "mcp__john-deere__jd_list_fields", "mcp__john-deere__jd_list_work_plans", "mcp__john-deere__jd_get_work_plan", "mcp__john-deere__jd_create_work_plan", "mcp__john-deere__jd_list_products", "mcp__john-deere__jd_list_equipment", "mcp__john-deere__jd_list_guidance_lines"]
argument-hint: [year-or-field-name]
---

Browse or create John Deere Operations Center work plans.

1. Call `jd_list_organizations` and select the organization.
2. Call `jd_list_fields` and match `$ARGUMENTS` against field names, field IDs, or year values.
3. For browsing, call `jd_list_work_plans` with relevant filters such as `year`, `work_type`, `work_status`, or `field_ids`.
4. If the user wants details, call `jd_get_work_plan` with the work plan ERID.
5. For creation, gather field, year, work type, operation inputs, rates, assignments, and optional guidance lines.
6. Use `jd_list_products`, `jd_list_equipment`, and `jd_list_guidance_lines` to discover valid IDs and URIs.
7. Confirm the intended work plan summary before calling `jd_create_work_plan`.
8. After creation, present the returned location, ERID if available, and a short summary of submitted inputs.
