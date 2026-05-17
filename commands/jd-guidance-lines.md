---
description: Browse John Deere guidance lines for fields
allowed-tools: ["mcp__john-deere__jd_list_organizations", "mcp__john-deere__jd_list_fields", "mcp__john-deere__jd_list_guidance_lines", "mcp__john-deere__jd_get_guidance_line"]
argument-hint: [field-name-or-id]
---

Browse guidance lines for a John Deere field.

1. Call `jd_list_organizations` and select the organization.
2. Call `jd_list_fields` for the selected org.
3. Match `$ARGUMENTS` against field names or field IDs when provided.
4. Call `jd_list_guidance_lines` with the chosen org_id and field_id.
5. Present guidance lines in a table: Name, ID, Type, Archived status, URI.
6. If the user asks for geometry or detail, call `jd_get_guidance_line`; use `embed: "shapes"` only when geometry is needed.
