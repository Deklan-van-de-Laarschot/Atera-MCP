import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AteraClient, formatResponse, formatError } from "../client.js";
import type { Rate } from "../types.js";

export function registerExpenseTools(server: McpServer, client: AteraClient) {
  server.tool(
    "list_expenses",
    "List all expenses in Atera.",
    {
      page: z.number().optional().describe("Page number (default 1)"),
      itemsInPage: z.number().optional().describe("Items per page (default 20, max 50)"),
    },
    async (args) => {
      try {
        const result = await client.getList<Rate>("/api/v3/rates/expenses", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "get_expense",
    "Get a specific expense by ID.",
    {
      expenseId: z.number().describe("The expense ID"),
    },
    async ({ expenseId }) => {
      try {
        const result = await client.get<Rate>(`/api/v3/rates/expenses/${expenseId}`);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "create_expense",
    "Create a new expense.",
    {
      Description: z.string().describe("Expense description"),
      Amount: z.number().describe("Expense amount"),
      SKU: z.string().optional().describe("Expense SKU"),
      Category: z.string().optional().describe("Expense category"),
    },
    async (args) => {
      try {
        const result = await client.post("/api/v3/rates/expenses", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "update_expense",
    "Update an existing expense. Only provide fields you want to change.",
    {
      expenseId: z.number().describe("The expense ID to update"),
      Description: z.string().optional().describe("Expense description"),
      Amount: z.number().optional().describe("Expense amount"),
      SKU: z.string().optional().describe("Expense SKU"),
      Category: z.string().optional().describe("Expense category"),
      Archived: z.boolean().optional().describe("Archive the expense"),
    },
    async ({ expenseId, ...body }) => {
      try {
        const result = await client.put(`/api/v3/rates/expenses/${expenseId}`, body);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "delete_expense",
    "Delete an expense by ID.",
    {
      expenseId: z.number().describe("The expense ID to delete"),
    },
    async ({ expenseId }) => {
      try {
        await client.del(`/api/v3/rates/expenses/${expenseId}`);
        return formatResponse({ success: true, message: `Expense ${expenseId} deleted` });
      } catch (error) {
        return formatError(error);
      }
    },
  );
}
