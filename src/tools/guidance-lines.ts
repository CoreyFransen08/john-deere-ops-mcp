import { z } from "zod";
import { jdFetch, jdFetchAll } from "../jd-api";
import type { ToolRegistrationContext } from "./types";

const GUIDANCE_STATUS = ["available", "archived", "all"] as const;
const GUIDANCE_RECORD_FILTERS = ["active", "archived", "all"] as const;

export function registerGuidanceLineTools({ server, props, env, sql }: ToolRegistrationContext) {
  server.registerTool(
    "jd_list_guidance_lines",
    {
      description: "List guidance lines for a field.",
      inputSchema: {
        org_id: z.string().describe("The organization ID."),
        field_id: z.string().describe("The field ID."),
        status: z.enum(GUIDANCE_STATUS).optional().describe("Filter archived guidance lines."),
        record_filter: z
          .enum(GUIDANCE_RECORD_FILTERS)
          .optional()
          .describe("Filter guidance lines by active, archived, or all."),
        embed: z.literal("shapes").optional().describe("Include track geometry for supported line types."),
      },
    },
    async ({ org_id, field_id, status, record_filter, embed }) => {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      if (record_filter) params.set("recordFilter", record_filter);
      if (embed) params.set("embed", embed);

      const qs = params.toString();
      const endpoint = `/organizations/${org_id}/fields/${field_id}/guidanceLines${qs ? `?${qs}` : ""}`;
      const values = await jdFetchAll<{
        "@type"?: string;
        erid?: string;
        id?: string;
        name?: string;
        archived?: boolean;
        fieldUri?: string;
        links?: Array<{ rel: string; uri: string }>;
        [key: string]: unknown;
      }>(endpoint, props, env, sql, { cache: false });

      const lines = values.map((line) => ({
        id: line.id || line.erid,
        erid: line.erid,
        name: line.name,
        type: line["@type"],
        archived: line.archived,
        fieldUri: line.fieldUri || line.links?.find((l) => l.rel === "field")?.uri,
        uri: line.links?.find((l) => l.rel === "self")?.uri,
        ...(embed === "shapes" ? { raw: line } : {}),
      }));

      return {
        content: [
          {
            type: "text" as const,
            text:
              lines.length === 0
                ? "No guidance lines found for this field."
                : JSON.stringify(lines, null, 2),
          },
        ],
      };
    }
  );

  server.registerTool(
    "jd_get_guidance_line",
    {
      description: "Get a specific guidance line for a field.",
      inputSchema: {
        org_id: z.string().describe("The organization ID."),
        field_id: z.string().describe("The field ID."),
        guidance_line_id: z.string().describe("The guidance line ID."),
        embed: z.literal("shapes").optional().describe("Include track geometry for supported line types."),
      },
    },
    async ({ org_id, field_id, guidance_line_id, embed }) => {
      const qs = embed ? `?${new URLSearchParams({ embed }).toString()}` : "";
      const line = await jdFetch(
        `/organizations/${org_id}/fields/${field_id}/guidanceLines/${guidance_line_id}${qs}`,
        props,
        env,
        sql,
        { cache: false }
      );

      return {
        content: [{ type: "text" as const, text: JSON.stringify(line, null, 2) }],
      };
    }
  );
}
