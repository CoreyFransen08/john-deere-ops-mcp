import { z } from "zod";
import { jdFetchAll } from "../jd-api";
import type { ToolRegistrationContext } from "./types";

export function registerFieldOperationTools({ server, props, env, sql }: ToolRegistrationContext) {
  server.registerTool(
    "jd_list_field_operations",
    {
      description: "List field operations (planting, harvesting, applications) for a specific field.",
      inputSchema: {
        org_id: z.string().describe("The organization ID."),
        field_id: z.string().describe("The field ID."),
        crop_season: z.string().optional().describe("Filter by crop season year (e.g. '2024')."),
        operation_type: z
          .string()
          .optional()
          .describe("Filter by operation type: APPLICATION, HARVEST, SEEDING, or TILLAGE."),
      },
    },
    async ({ org_id, field_id, crop_season, operation_type }) => {
      const params = new URLSearchParams();
      if (crop_season) params.set("cropSeason", crop_season);
      if (operation_type) params.set("fieldOperationType", operation_type);
      const qs = params.toString();
      const endpoint = `/organizations/${org_id}/fields/${field_id}/fieldOperations${qs ? `?${qs}` : ""}`;
      console.log(`[field_operations] calling endpoint: ${endpoint}`);
      console.log(
        `[field_operations] org_id=${org_id}, field_id=${field_id}, cropSeason=${crop_season ?? "none"}, operationType=${operation_type ?? "none"}`
      );

      const values = await jdFetchAll<{
        id: string;
        type?: string;
        operationType?: string;
        startDate?: string;
        endDate?: string;
        area?: unknown;
        products?: unknown[];
        product?: unknown;
        links?: Array<{ rel: string }>;
      }>(endpoint, props, env, sql);

      console.log(`[field_operations] jdFetchAll returned ${values.length} items`);
      if (values.length > 0) {
        console.log(`[field_operations] first item keys: ${Object.keys(values[0]).join(", ")}`);
        console.log(`[field_operations] first item: ${JSON.stringify(values[0]).slice(0, 1000)}`);
      }

      const ops = values.map((op) => ({
        id: op.id,
        type: op.type || op.operationType,
        startDate: op.startDate,
        endDate: op.endDate,
        area: op.area,
        products: op.products || (op.product ? [op.product] : []),
        links: (op.links || []).map((l) => l.rel),
      }));

      return {
        content: [
          {
            type: "text" as const,
            text:
              ops.length === 0
                ? "No operations found for this field."
                : JSON.stringify(ops, null, 2),
          },
        ],
      };
    }
  );
}
