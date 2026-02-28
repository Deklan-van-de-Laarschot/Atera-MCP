import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AteraClient, formatResponse, formatError } from "../client.js";
import type { Customer } from "../types.js";

export function registerCustomerTools(server: McpServer, client: AteraClient) {
  server.tool(
    "list_customers",
    "List all customers in Atera.",
    {
      page: z.number().optional().describe("Page number (default 1)"),
      itemsInPage: z.number().optional().describe("Items per page (default 20, max 50)"),
    },
    async (args) => {
      try {
        const result = await client.getList<Customer>("/api/v3/customers", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "get_customer",
    "Get a specific customer by ID with full details.",
    {
      customerId: z.number().describe("The customer ID"),
    },
    async ({ customerId }) => {
      try {
        const result = await client.get<Customer>(`/api/v3/customers/${customerId}`);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "create_customer",
    "Create a new customer. Only CustomerName is required.",
    {
      CustomerName: z.string().describe("Customer/company name"),
      BusinessNumber: z.string().optional().describe("Business number"),
      Domain: z.string().optional().describe("Domain name"),
      Address: z.string().optional().describe("Street address"),
      City: z.string().optional().describe("City"),
      State: z.string().optional().describe("State/province"),
      Country: z.string().optional().describe("Country"),
      Phone: z.string().optional().describe("Phone number"),
      Fax: z.string().optional().describe("Fax number"),
      Notes: z.string().optional().describe("Notes"),
      Links: z.string().optional().describe("Links"),
      ZipCodeStr: z.string().optional().describe("Zip/postal code"),
    },
    async (args) => {
      try {
        const result = await client.post("/api/v3/customers", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "update_customer",
    "Update an existing customer. Only provide fields you want to change.",
    {
      customerId: z.number().describe("The customer ID to update"),
      CustomerName: z.string().optional().describe("Customer/company name"),
      BusinessNumber: z.string().optional().describe("Business number"),
      Domain: z.string().optional().describe("Domain name"),
      Address: z.string().optional().describe("Street address"),
      City: z.string().optional().describe("City"),
      State: z.string().optional().describe("State/province"),
      Country: z.string().optional().describe("Country"),
      Phone: z.string().optional().describe("Phone number"),
      Fax: z.string().optional().describe("Fax number"),
      Notes: z.string().optional().describe("Notes"),
      Links: z.string().optional().describe("Links"),
      ZipCodeStr: z.string().optional().describe("Zip/postal code"),
    },
    async ({ customerId, ...body }) => {
      try {
        const result = await client.put(`/api/v3/customers/${customerId}`, body);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "delete_customer",
    "Delete a customer by ID.",
    {
      customerId: z.number().describe("The customer ID to delete"),
    },
    async ({ customerId }) => {
      try {
        await client.del(`/api/v3/customers/${customerId}`);
        return formatResponse({ success: true, message: `Customer ${customerId} deleted` });
      } catch (error) {
        return formatError(error);
      }
    },
  );
}
