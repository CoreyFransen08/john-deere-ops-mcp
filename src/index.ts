/**
 * John Deere Operations Center — Remote MCP Server on Cloudflare Workers
 *
 * Exports:
 *   - JohnDeereMCP (named): McpAgent Durable Object with 4 JD tools
 *   - default: OAuthProvider that protects /mcp with double-OAuth proxy
 */

import OAuthProvider from "@cloudflare/workers-oauth-provider";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { z } from "zod";
import type { Env, JDProps } from "./types";
import { jdFetch, jdFetchAll, initCacheTable } from "./jd-api";
import { JDAuthHandler } from "./jd-auth-handler";

// ---------------------------------------------------------------------------
// McpAgent Durable Object
// ---------------------------------------------------------------------------

export class JohnDeereMCP extends McpAgent<Env, Record<string, never>, JDProps> {
  server = new McpServer({
    name: "john-deere-ops-center",
    version: "1.0.0",
  });

  async init() {
    // Initialize the API response cache table
    initCacheTable(this.ctx);

    const sqlFn = this.sql.bind(this);

    // --- jd_list_organizations -----------------------------------------------
    this.server.tool(
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
        }>("/organizations", this.props, this.env, sqlFn);
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

    // --- jd_list_fields ------------------------------------------------------
    this.server.tool(
      "jd_list_fields",
      "List all fields for a given organization.",
      { org_id: z.string().describe("The organization ID to list fields for.") },
      async ({ org_id }) => {
        const values = await jdFetchAll<{ id: string; name: string; archived: boolean }>(
          `/organizations/${org_id}/fields`,
          this.props,
          this.env,
          sqlFn
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

    // --- jd_get_field --------------------------------------------------------
    this.server.tool(
      "jd_get_field",
      "Get detailed information about a specific field, including boundaries if available.",
      {
        org_id: z.string().describe("The organization ID."),
        field_id: z.string().describe("The field ID."),
      },
      async ({ org_id, field_id }) => {
        const field = (await jdFetch(
          `/organizations/${org_id}/fields/${field_id}`,
          this.props,
          this.env,
          sqlFn
        )) as { links?: Array<{ rel: string; uri: string }>; [key: string]: unknown };

        // Try to fetch boundaries if linked
        let boundaries: unknown = null;
        const boundaryLink = (field.links || []).find(
          (l) => l.rel === "boundaries" || l.rel === "fieldBoundaries"
        );
        if (boundaryLink) {
          try {
            boundaries = await jdFetch(boundaryLink.uri, this.props, this.env, sqlFn);
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

    // --- jd_list_field_operations ---------------------------------------------
    this.server.tool(
      "jd_list_field_operations",
      "List field operations (planting, harvesting, applications) for a specific field.",
      {
        org_id: z.string().describe("The organization ID."),
        field_id: z.string().describe("The field ID."),
        crop_season: z.string().optional().describe("Filter by crop season year (e.g. '2024')."),
        operation_type: z.string().optional().describe("Filter by operation type: APPLICATION, HARVEST, SEEDING, or TILLAGE."),
      },
      async ({ org_id, field_id, crop_season, operation_type }) => {
        const params = new URLSearchParams();
        if (crop_season) params.set("cropSeason", crop_season);
        if (operation_type) params.set("fieldOperationType", operation_type);
        const qs = params.toString();
        const endpoint = `/organizations/${org_id}/fields/${field_id}/fieldOperations${qs ? `?${qs}` : ""}`;
        console.log(`[field_operations] calling endpoint: ${endpoint}`);
        console.log(`[field_operations] org_id=${org_id}, field_id=${field_id}, cropSeason=${crop_season ?? "none"}, operationType=${operation_type ?? "none"}`);

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
        }>(endpoint, this.props, this.env, sqlFn);

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
}

// ---------------------------------------------------------------------------
// Worker default export — OAuthProvider wrapping the McpAgent
// ---------------------------------------------------------------------------

export default new OAuthProvider({
  apiRoute: "/mcp",
  apiHandler: JohnDeereMCP.serve("/mcp"),
  defaultHandler: JDAuthHandler as unknown as ExportedHandler,
  authorizeEndpoint: "/authorize",
  tokenEndpoint: "/token",
  clientRegistrationEndpoint: "/register",
  accessTokenTTL: 3600,
});
