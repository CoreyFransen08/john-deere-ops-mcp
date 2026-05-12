import { z } from "zod";
import { jdFetchAll } from "../jd-api";
import type { ToolRegistrationContext } from "./types";

const PRODUCT_TYPES = ["CHEMICAL", "FERTILIZER", "VARIETY", "TANK_MIX", "DRY_BLEND"] as const;
const PRODUCT_STATUSES = ["AVAILABLE", "ARCHIVED", "ALL"] as const;

const PRODUCT_ENDPOINTS: Record<(typeof PRODUCT_TYPES)[number], string> = {
  CHEMICAL: "chemicals",
  FERTILIZER: "fertilizers",
  VARIETY: "varieties",
  TANK_MIX: "tankMixes",
  DRY_BLEND: "dryBlends",
};

export function registerProductTools({ server, props, env, sql }: ToolRegistrationContext) {
  server.tool(
    "jd_list_products",
    "List organization products that can be referenced by work plan inputs.",
    {
      org_id: z.string().describe("The organization ID."),
      product_type: z
        .enum(PRODUCT_TYPES)
        .describe("Product type: CHEMICAL, FERTILIZER, VARIETY, TANK_MIX, or DRY_BLEND."),
      status: z.enum(PRODUCT_STATUSES).optional().describe("Filter products by archive status."),
    },
    async ({ org_id, product_type, status }) => {
      const params = new URLSearchParams();
      if (status) params.set("status", status);

      const qs = params.toString();
      const endpoint = `/organizations/${org_id}/${PRODUCT_ENDPOINTS[product_type]}${qs ? `?${qs}` : ""}`;
      const values = await jdFetchAll<{
        id?: string;
        erid?: string;
        name?: string;
        category?: string;
        type?: string;
        cropName?: string;
        companyName?: string;
        archived?: boolean;
        links?: Array<{ rel: string; uri: string }>;
      }>(endpoint, props, env, sql, { cache: false });

      const products = values.map((product) => ({
        id: product.id || product.erid,
        name: product.name,
        category: product.category,
        type: product.type,
        cropName: product.cropName,
        companyName: product.companyName,
        archived: product.archived,
        uri: product.links?.find((l) => l.rel === "self")?.uri,
      }));

      return {
        content: [
          {
            type: "text" as const,
            text:
              products.length === 0
                ? "No products found for this organization."
                : JSON.stringify(products, null, 2),
          },
        ],
      };
    }
  );
}

export { PRODUCT_ENDPOINTS, PRODUCT_TYPES };
