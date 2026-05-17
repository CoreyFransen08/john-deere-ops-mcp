---
description: View John Deere machine health, alerts, hours, and location
allowed-tools: ["mcp__john-deere__jd_list_organizations", "mcp__john-deere__jd_list_equipment", "mcp__john-deere__jd_get_machine_alerts", "mcp__john-deere__jd_get_machine_engine_hours", "mcp__john-deere__jd_get_machine_hours_of_operation", "mcp__john-deere__jd_get_machine_location_history", "mcp__john-deere__jd_get_machine_device_state_reports"]
argument-hint: [machine-name-or-principal-id]
---

View John Deere machine health and maintenance context.

1. Call `jd_list_organizations` and select the organization.
2. Call `jd_list_equipment` for the org and identify the target machine.
3. Match `$ARGUMENTS` against equipment name, equipment ID, or principal ID when provided.
4. Use the selected machine's principal ID for health calls.
5. For alerts, call `jd_get_machine_alerts`. Keep date windows to 7 days or less.
6. For maintenance context, call `jd_get_machine_engine_hours` and `jd_get_machine_hours_of_operation`.
7. For current position or history, call `jd_get_machine_location_history`. Keep date windows to 1 month or less.
8. For terminal/connectivity diagnostics, call `jd_get_machine_device_state_reports`.
9. Summarize results by severity, latest timestamps, engine hours, operation hours, and any Deere permission errors.
