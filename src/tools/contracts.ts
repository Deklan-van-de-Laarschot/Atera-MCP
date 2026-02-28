import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AteraClient, formatResponse, formatError } from "../client.js";
import type { Contract } from "../types.js";

export function registerContractTools(server: McpServer, client: AteraClient) {
  server.tool(
    "list_contracts",
    "List all contracts in Atera.",
    {
      page: z.number().optional().describe("Page number (default 1)"),
      itemsInPage: z.number().optional().describe("Items per page (default 20, max 50)"),
    },
    async (args) => {
      try {
        const result = await client.getList<Contract>("/api/v3/contracts", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "get_contract",
    "Get a specific contract by ID with full details.",
    {
      contractId: z.number().describe("The contract ID"),
    },
    async ({ contractId }) => {
      try {
        const result = await client.get<Contract>(`/api/v3/contracts/${contractId}`);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "list_contracts_by_customer",
    "List contracts for a specific customer.",
    {
      customerId: z.number().describe("The customer ID"),
      page: z.number().optional().describe("Page number (default 1)"),
      itemsInPage: z.number().optional().describe("Items per page (default 20, max 50)"),
    },
    async ({ customerId, ...params }) => {
      try {
        const result = await client.getList<Contract>(
          `/api/v3/contracts/customer/${customerId}`,
          params,
        );
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "create_contract",
    "Create a new contract for a customer.",
    {
      ContractName: z.string().describe("Contract name"),
      CustomerID: z.number().describe("Customer ID"),
      ContractType: z.string().describe("Contract type"),
      Active: z.boolean().optional().describe("Is active"),
      Taxable: z.boolean().optional().describe("Is taxable"),
      StartDate: z.string().optional().describe("Start date (ISO format)"),
      EndDate: z.string().optional().describe("End date (ISO format)"),
    },
    async (args) => {
      try {
        const result = await client.post("/api/v3/contracts", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "update_contract",
    "Update an existing contract. Only provide fields you want to change.",
    {
      contractId: z.number().describe("The contract ID to update"),
      ContractName: z.string().optional().describe("Contract name"),
      Active: z.boolean().optional().describe("Is active"),
      Taxable: z.boolean().optional().describe("Is taxable"),
      StartDate: z.string().optional().describe("Start date (ISO format)"),
      EndDate: z.string().optional().describe("End date (ISO format)"),
    },
    async ({ contractId, ...body }) => {
      try {
        const result = await client.put(`/api/v3/contracts/${contractId}`, body);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );
}
