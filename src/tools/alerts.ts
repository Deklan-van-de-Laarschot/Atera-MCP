import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AteraClient, formatResponse, formatError } from "../client.js";
import type { Alert } from "../types.js";

export function registerAlertTools(server: McpServer, client: AteraClient) {
  server.tool(
    "list_alerts",
    "List alerts from Atera. Supports filtering by status.",
    {
      page: z.number().optional().describe("Page number (default 1)"),
      itemsInPage: z.number().optional().describe("Items per page (default 20, max 50)"),
      alertStatus: z.string().optional().describe("Filter by status: Open, Resolved, Snoozed"),
    },
    async (args) => {
      try {
        const result = await client.getList<Alert>("/api/v3/alerts", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "get_alert",
    "Get a specific alert by ID with full details.",
    {
      alertId: z.number().describe("The alert ID"),
    },
    async ({ alertId }) => {
      try {
        const result = await client.get<Alert>(`/api/v3/alerts/${alertId}`);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "create_alert",
    "Create a new alert. Requires a device GUID and title.",
    {
      DeviceGuid: z.string().describe("Device GUID to create alert for"),
      Title: z.string().describe("Alert title"),
      Severity: z.string().optional().describe("Severity: Information, Warning, Critical"),
      AlertCategoryID: z.string().optional().describe("Alert category ID: Hardware, Disk Space, Availability, Performance, Exchange, General"),
      Code: z.number().optional().describe("Alert code"),
      AdditionalInfo: z.string().optional().describe("Additional information"),
    },
    async (args) => {
      try {
        const result = await client.post("/api/v3/alerts", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "resolve_alert",
    "Resolve a specific alert by ID.",
    {
      alertId: z.number().describe("The alert ID to resolve"),
    },
    async ({ alertId }) => {
      try {
        await client.put(`/api/v3/alerts/${alertId}`);
        return formatResponse({ success: true, message: `Alert ${alertId} resolved` });
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "delete_alert",
    "Delete a specific alert by ID.",
    {
      alertId: z.number().describe("The alert ID to delete"),
    },
    async ({ alertId }) => {
      try {
        await client.del(`/api/v3/alerts/${alertId}`);
        return formatResponse({ success: true, message: `Alert ${alertId} deleted` });
      } catch (error) {
        return formatError(error);
      }
    },
  );
}
