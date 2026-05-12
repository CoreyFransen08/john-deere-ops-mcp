import { z } from "zod";
import { jdFetch, jdFetchAll } from "../jd-api";
import type { ToolRegistrationContext } from "./types";

export function registerFieldTools({ server, props, env, sql }: ToolRegistrationContext) {
  server.tool(
    "jd_list_fields",
    "List all fields for a given organization.",
    { org_id: z.string().describe("The organization ID to list fields for.") },
    async ({ org_id }) => {
      const values = await jdFetchAll<{ id: string; name: string; archived: boolean }>(
        `/organizations/${org_id}/fields`,
        props,
        env,
        sql
      );
      const fields = values.map((f) => ({
        id: f.id,
        name: f.name,
        archived: f.archived,
      }));
      return {
        content: [
          {
            type: "text" as const,
            text:
              fields.length === 0
                ? "No fields found for this organization."
                : JSON.stringify(fields, null, 2),
          },
        ],
      };
    }
  );

  server.tool(
    "jd_get_field",
    "Get detailed information about a specific field, including boundaries if available.",
    {
      org_id: z.string().describe("The organization ID."),
      field_id: z.string().describe("The field ID."),
    },
    async ({ org_id, field_id }) => {
      const field = (await jdFetch(
        `/organizations/${org_id}/fields/${field_id}`,
        props,
        env,
        sql
      )) as { links?: Array<{ rel: string; uri: string }>; [key: string]: unknown };

      let boundaries: unknown = null;
      const boundaryLink = (field.links || []).find(
        (l) => l.rel === "boundaries" || l.rel === "fieldBoundaries"
      );
      if (boundaryLink) {
        try {
          boundaries = await jdFetch(boundaryLink.uri, props, env, sql);
        } catch {
          boundaries = { note: "Boundaries link found but could not be fetched." };
        }
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ ...field, boundaries }, null, 2),
          },
        ],
      };
    }
  );
}
