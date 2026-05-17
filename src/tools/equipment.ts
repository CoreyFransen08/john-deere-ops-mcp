import { z } from "zod";
import { jdFetch, jdFetchAll } from "../jd-api";
import type { ToolRegistrationContext } from "./types";

const EQUIPMENT_CACHE_TTL_MS = 5 * 60 * 1000;
const MACHINE_HEALTH_CACHE_TTL_MS = 60 * 1000;

const EQUIPMENT_CATEGORIES = ["Machine", "Implement"] as const;
const CAPABILITIES = ["Connectivity", "!Connectivity"] as const;
const ORGANIZATION_ROLE_TYPES = ["Controlling", "NonControlling"] as const;
const EQUIPMENT_EMBEDS = ["devices", "equipment", "icon", "pairingDetails"] as const;
const EQUIPMENT_DETAIL_EMBEDS = [
  "devices",
  "equipment",
  "pairingDetails",
  "icon",
  "offsets",
  "capabilities",
] as const;

function setArrayParam(params: URLSearchParams, key: string, values?: string[]) {
  if (values?.length) params.set(key, values.join(","));
}

function setOptionalParam(params: URLSearchParams, key: string, value?: string | boolean | number) {
  if (value !== undefined) params.set(key, String(value));
}

function machineEndpoint(principalId: string, resource: string, params: URLSearchParams) {
  const qs = params.toString();
  return `/machines/${principalId}/${resource}${qs ? `?${qs}` : ""}`;
}

function summarizeEquipment(item: {
  id?: string | number;
  principalId?: string | number;
  name?: string;
  category?: string;
  equipmentCategory?: string;
  type?: { name?: string } | string;
  archived?: boolean;
  links?: Array<{ rel: string; uri: string }>;
}) {
  const id = item.id === undefined ? undefined : String(item.id);
  return {
    id,
    principalId: item.principalId === undefined ? undefined : String(item.principalId),
    name: item.name,
    category: item.category || item.equipmentCategory,
    type: typeof item.type === "string" ? item.type : item.type?.name,
    archived: item.archived,
    uri:
      item.links?.find((l) => l.rel === "self")?.uri ||
      (id ? `https://equipmentapi.deere.com/isg/equipment/${id}` : undefined),
  };
}

export function registerEquipmentTools({ server, props, env, sql }: ToolRegistrationContext) {
  server.registerTool(
    "jd_list_equipment",
    {
      description: "List equipment visible to the authenticated user.",
      inputSchema: {
        org_id: z.string().describe("The organization ID."),
        category: z.enum(EQUIPMENT_CATEGORIES).optional().describe("Filter by Machine or Implement."),
        archived: z.boolean().optional().describe("Filter archived equipment."),
        ids: z.array(z.string()).optional().describe("Filter by organization equipment IDs."),
        serial_numbers: z.array(z.string()).optional().describe("Filter by serial numbers."),
        principal_ids: z.array(z.string()).optional().describe("Filter by principal IDs."),
        capable_of: z.enum(CAPABILITIES).optional().describe("Filter by Connectivity or !Connectivity."),
        organization_role_type: z
          .enum(ORGANIZATION_ROLE_TYPES)
          .optional()
          .describe("Filter by Controlling or NonControlling organization role."),
        embed: z.enum(EQUIPMENT_EMBEDS).optional().describe("Optional equipment embed."),
        item_limit: z.number().int().positive().max(5000).optional().describe("Maximum page size."),
      },
    },
    async ({
      org_id,
      category,
      archived,
      ids,
      serial_numbers,
      principal_ids,
      capable_of,
      organization_role_type,
      embed,
      item_limit,
    }) => {
      const params = new URLSearchParams();
      params.set("organizationIds", org_id);
      setArrayParam(params, "ids", ids);
      setArrayParam(params, "serialNumbers", serial_numbers);
      setArrayParam(params, "principalIds", principal_ids);
      if (category) params.set("categories", category);
      setOptionalParam(params, "capableOf", capable_of);
      setOptionalParam(params, "organizationRole.type", organization_role_type);
      setOptionalParam(params, "archived", archived);
      setOptionalParam(params, "embed", embed);
      setOptionalParam(params, "itemLimit", item_limit);

      const values = await jdFetchAll<Parameters<typeof summarizeEquipment>[0]>(
        `https://equipmentapi.deere.com/isg/equipment?${params.toString()}`,
        props,
        env,
        sql,
        { ttlMs: EQUIPMENT_CACHE_TTL_MS }
      );

      const equipment = values.map(summarizeEquipment);

      return {
        content: [
          {
            type: "text" as const,
            text:
              equipment.length === 0
                ? "No equipment found for this organization."
                : JSON.stringify(equipment, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "jd_get_equipment",
    {
      description: "Get equipment details by equipment ID.",
      inputSchema: {
        equipment_id: z.string().describe("The equipment ID."),
        embed: z.enum(EQUIPMENT_DETAIL_EMBEDS).optional().describe("Optional equipment detail embed."),
      },
    },
    async ({ equipment_id, embed }) => {
      const params = new URLSearchParams();
      setOptionalParam(params, "embed", embed);
      const qs = params.toString();
      const equipment = await jdFetch(
        `https://equipmentapi.deere.com/isg/equipment/${equipment_id}${qs ? `?${qs}` : ""}`,
        props,
        env,
        sql,
        { ttlMs: EQUIPMENT_CACHE_TTL_MS }
      );

      return {
        content: [{ type: "text" as const, text: JSON.stringify(equipment, null, 2) }],
      };
    }
  );

  server.registerTool(
    "jd_get_machine_alerts",
    {
      description: "Get machine alerts, including diagnostic and maintenance alert types. Date windows should be at most seven days.",
      inputSchema: {
        principal_id: z.string().describe("Machine principal ID."),
        start_date: z.string().optional().describe("Start date/time in UTC ISO format."),
        end_date: z.string().optional().describe("End date/time in UTC ISO format."),
        exclude_acknowledged: z.boolean().optional().describe("Exclude acknowledged alerts."),
      },
    },
    async ({ principal_id, start_date, end_date, exclude_acknowledged }) => {
      const params = new URLSearchParams();
      setOptionalParam(params, "startDate", start_date);
      setOptionalParam(params, "endDate", end_date);
      setOptionalParam(params, "excludeAcknowledged", exclude_acknowledged);

      const alerts = await jdFetchAll(
        machineEndpoint(principal_id, "alerts", params),
        props,
        env,
        sql,
        { ttlMs: MACHINE_HEALTH_CACHE_TTL_MS }
      );

      return {
        content: [
          {
            type: "text" as const,
            text: alerts.length === 0 ? "No alerts found for this machine." : JSON.stringify(alerts, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "jd_get_machine_engine_hours",
    {
      description: "Get machine engine hour readings.",
      inputSchema: {
        principal_id: z.string().describe("Machine principal ID."),
        start_date: z.string().optional().describe("Start date/time in UTC ISO format."),
        end_date: z.string().optional().describe("End date/time in UTC ISO format."),
        last_known: z.boolean().optional().describe("Return only the last known engine hour reading."),
      },
    },
    async ({ principal_id, start_date, end_date, last_known }) => {
      const params = new URLSearchParams();
      setOptionalParam(params, "startDate", start_date);
      setOptionalParam(params, "endDate", end_date);
      setOptionalParam(params, "lastKnown", last_known);

      const engineHours = await jdFetchAll(
        machineEndpoint(principal_id, "engineHours", params),
        props,
        env,
        sql,
        { ttlMs: MACHINE_HEALTH_CACHE_TTL_MS }
      );

      return {
        content: [
          {
            type: "text" as const,
            text:
              engineHours.length === 0
                ? "No engine hour readings found for this machine."
                : JSON.stringify(engineHours, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "jd_get_machine_hours_of_operation",
    {
      description: "Get machine hours of operation and engine state history.",
      inputSchema: {
        principal_id: z.string().describe("Machine principal ID."),
        org_id: z.string().optional().describe("Organization ID for the machine."),
        start_date: z.string().optional().describe("Start date/time in UTC ISO format."),
        end_date: z.string().optional().describe("End date/time in UTC ISO format."),
        detailed_state: z.string().optional().describe("Optional Deere detailed state filter."),
        summarize_duration: z.string().optional().describe("Optional duration merge threshold."),
      },
    },
    async ({ principal_id, org_id, start_date, end_date, detailed_state, summarize_duration }) => {
      const params = new URLSearchParams();
      setOptionalParam(params, "organizationId", org_id);
      setOptionalParam(params, "startDate", start_date);
      setOptionalParam(params, "endDate", end_date);
      setOptionalParam(params, "detailedState", detailed_state);
      setOptionalParam(params, "summarizeDuration", summarize_duration);

      const hours = await jdFetchAll(
        machineEndpoint(principal_id, "hoursOfOperation", params),
        props,
        env,
        sql,
        { ttlMs: MACHINE_HEALTH_CACHE_TTL_MS }
      );

      return {
        content: [
          {
            type: "text" as const,
            text:
              hours.length === 0
                ? "No hours of operation found for this machine."
                : JSON.stringify(hours, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "jd_get_machine_location_history",
    {
      description: "Get machine location history. Date ranges should be at most one month.",
      inputSchema: {
        principal_id: z.string().describe("Machine principal ID."),
        start_date: z.string().optional().describe("Start date/time in UTC ISO format."),
        end_date: z.string().optional().describe("End date/time in UTC ISO format."),
        last_known: z.boolean().optional().describe("Return last known location."),
      },
    },
    async ({ principal_id, start_date, end_date, last_known }) => {
      const params = new URLSearchParams();
      setOptionalParam(params, "startDate", start_date);
      setOptionalParam(params, "endDate", end_date);
      setOptionalParam(params, "lastKnown", last_known);

      const locations = await jdFetchAll(
        machineEndpoint(principal_id, "locationHistory", params),
        props,
        env,
        sql,
        { ttlMs: MACHINE_HEALTH_CACHE_TTL_MS }
      );

      return {
        content: [
          {
            type: "text" as const,
            text:
              locations.length === 0
                ? "No location history found for this machine."
                : JSON.stringify(locations, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "jd_get_machine_device_state_reports",
    {
      description: "Get machine terminal device state reports.",
      inputSchema: {
        principal_id: z.string().describe("Machine principal ID."),
        start_date: z.string().optional().describe("Start date/time in UTC ISO format."),
        end_date: z.string().optional().describe("End date/time in UTC ISO format."),
        last_known: z.boolean().optional().describe("Return last known device state report."),
      },
    },
    async ({ principal_id, start_date, end_date, last_known }) => {
      const params = new URLSearchParams();
      setOptionalParam(params, "startDate1", start_date);
      setOptionalParam(params, "endDate1", end_date);
      setOptionalParam(params, "lastKnown", last_known);

      const reports = await jdFetchAll(
        machineEndpoint(principal_id, "deviceStateReports", params),
        props,
        env,
        sql,
        { ttlMs: MACHINE_HEALTH_CACHE_TTL_MS }
      );

      return {
        content: [
          {
            type: "text" as const,
            text:
              reports.length === 0
                ? "No device state reports found for this machine."
                : JSON.stringify(reports, null, 2),
          },
        ],
      };
    }
  );
}
