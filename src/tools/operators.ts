import { z } from "zod";
import { jdFetchAll } from "../jd-api";
import type { ToolRegistrationContext } from "./types";

const OPERATOR_FILTERS = ["ACTIVE", "ALL", "ARCHIVED"] as const;

export function registerOperatorTools({ server, props, env, sql }: ToolRegistrationContext) {
  server.registerTool(
    "jd_list_operators",
    {
      description: "List operators that can be assigned to work plans.",
      inputSchema: {
        org_id: z.string().describe("The organization ID."),
        record_filter: z
          .enum(OPERATOR_FILTERS)
          .optional()
          .describe("Filter operators by ACTIVE, ALL, or ARCHIVED."),
      },
    },
    async ({ org_id, record_filter }) => {
      const params = new URLSearchParams();
      if (record_filter) params.set("recordFilter", record_filter);

      const qs = params.toString();
      const values = await jdFetchAll<{
        id: string;
        name?: string;
        archived?: boolean;
        dateModified?: string;
        links?: Array<{ rel: string; uri: string }>;
      }>(`/organizations/${org_id}/operators${qs ? `?${qs}` : ""}`, props, env, sql, {
        cache: false,
      });

      const operators = values.map((operator) => ({
        id: operator.id,
        name: operator.name,
        archived: operator.archived,
        dateModified: operator.dateModified,
        uri:
          operator.links?.find((l) => l.rel === "self")?.uri ||
          `https://sandboxapi.deere.com/platform/organizations/${org_id}/operators/${operator.id}`,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text:
              operators.length === 0
                ? "No operators found for this organization."
                : JSON.stringify(operators, null, 2),
          },
        ],
      };
    }
  );
}
