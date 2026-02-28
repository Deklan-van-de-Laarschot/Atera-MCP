import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AteraClient, formatResponse, formatError } from "../client.js";
import type { Agent } from "../types.js";

export function registerAgentTools(server: McpServer, client: AteraClient) {
  server.tool(
    "list_agents",
    "List all agents (devices with Atera agent installed).",
    {
      page: z.number().optional().describe("Page number (default 1)"),
      itemsInPage: z.number().optional().describe("Items per page (default 20, max 50)"),
    },
    async (args) => {
      try {
        const result = await client.getList<Agent>("/api/v3/agents", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "get_agent",
    "Get a specific agent by ID with full details.",
    {
      agentId: z.number().describe("The agent ID"),
    },
    async ({ agentId }) => {
      try {
        const result = await client.get<Agent>(`/api/v3/agents/${agentId}`);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "get_agents_by_customer",
    "List agents for a specific customer.",
    {
      customerId: z.number().describe("The customer ID"),
      page: z.number().optional().describe("Page number (default 1)"),
      itemsInPage: z.number().optional().describe("Items per page (default 20, max 50)"),
    },
    async ({ customerId, ...params }) => {
      try {
        const result = await client.getList<Agent>(
          `/api/v3/agents/customer/${customerId}`,
          params,
        );
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "delete_agent",
    "Delete an agent by ID.",
    {
      agentId: z.number().describe("The agent ID to delete"),
    },
    async ({ agentId }) => {
      try {
        await client.del(`/api/v3/agents/${agentId}`);
        return formatResponse({ success: true, message: `Agent ${agentId} deleted` });
      } catch (error) {
        return formatError(error);
      }
    },
  );
}
