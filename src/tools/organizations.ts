import { jdFetchAll } from "../jd-api";
import type { ToolRegistrationContext } from "./types";

export function registerOrganizationTools({ server, props, env, sql }: ToolRegistrationContext) {
  server.tool(
    "jd_list_organizations",
    "List all organizations the authenticated user has access to in John Deere Operations Center.",
    {},
    async () => {
      const values = await jdFetchAll<{
        id: string;
        name: string;
        type: string;
        member: boolean;
        links?: Array<{ rel: string }>;
      }>("/organizations", props, env, sql);
      const orgs = values.map((o) => ({
        id: o.id,
        name: o.name,
        type: o.type,
        member: o.member,
        links: (o.links || []).map((l) => l.rel),
      }));
      return {
        content: [
          {
            type: "text" as const,
            text:
              orgs.length === 0
                ? "No organizations found. The user may need to connect their Operations Center account."
                : JSON.stringify(orgs, null, 2),
          },
        ],
      };
    }
  );
}
