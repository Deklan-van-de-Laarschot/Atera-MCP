import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AteraClient, formatResponse, formatError } from "../client.js";
import type { Rate } from "../types.js";

export function registerProductTools(server: McpServer, client: AteraClient) {
  server.tool(
    "list_products",
    "List all products in Atera.",
    {
      page: z.number().optional().describe("Page number (default 1)"),
      itemsInPage: z.number().optional().describe("Items per page (default 20, max 50)"),
    },
    async (args) => {
      try {
        const result = await client.getList<Rate>("/api/v3/rates/products", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "get_product",
    "Get a specific product by ID.",
    {
      productId: z.number().describe("The product ID"),
    },
    async ({ productId }) => {
      try {
        const result = await client.get<Rate>(`/api/v3/rates/products/${productId}`);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "create_product",
    "Create a new product.",
    {
      Description: z.string().describe("Product description"),
      Amount: z.number().describe("Product amount/price"),
      SKU: z.string().optional().describe("Product SKU"),
      Category: z.string().optional().describe("Product category"),
    },
    async (args) => {
      try {
        const result = await client.post("/api/v3/rates/products", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "update_product",
    "Update an existing product. Only provide fields you want to change.",
    {
      productId: z.number().describe("The product ID to update"),
      Description: z.string().optional().describe("Product description"),
      Amount: z.number().optional().describe("Product amount/price"),
      SKU: z.string().optional().describe("Product SKU"),
      Category: z.string().optional().describe("Product category"),
      Archived: z.boolean().optional().describe("Archive the product"),
    },
    async ({ productId, ...body }) => {
      try {
        const result = await client.put(`/api/v3/rates/products/${productId}`, body);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "delete_product",
    "Delete a product by ID.",
    {
      productId: z.number().describe("The product ID to delete"),
    },
    async ({ productId }) => {
      try {
        await client.del(`/api/v3/rates/products/${productId}`);
        return formatResponse({ success: true, message: `Product ${productId} deleted` });
      } catch (error) {
        return formatError(error);
      }
    },
  );
}
