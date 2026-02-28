import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AteraClient, formatResponse, formatError } from "../client.js";
import type { Ticket } from "../types.js";

export function registerTicketTools(server: McpServer, client: AteraClient) {
  server.tool(
    "list_tickets",
    "List tickets from Atera helpdesk. Supports filtering by status and customer.",
    {
      page: z.number().optional().describe("Page number (default 1)"),
      itemsInPage: z.number().optional().describe("Items per page (default 20, max 50)"),
      customerId: z.number().optional().describe("Filter by customer ID"),
      ticketStatus: z.string().optional().describe("Filter by status: Open, Pending, Resolved, Closed"),
    },
    async (args) => {
      try {
        const result = await client.getList<Ticket>("/api/v3/tickets", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "get_ticket",
    "Get a specific ticket by ID with full details.",
    {
      ticketId: z.number().describe("The ticket ID"),
    },
    async ({ ticketId }) => {
      try {
        const result = await client.get<Ticket>(`/api/v3/tickets/${ticketId}`);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "create_ticket",
    "Create a new ticket. Requires title and description. Specify end user by ID or by email (with first/last name for new users).",
    {
      TicketTitle: z.string().describe("Ticket title/subject"),
      Description: z.string().describe("Ticket description/body in HTML"),
      EndUserID: z.number().optional().describe("Existing end user contact ID"),
      EndUserEmail: z.string().optional().describe("End user email (creates new user if not found)"),
      EndUserFirstName: z.string().optional().describe("End user first name (used with email for new users)"),
      EndUserLastName: z.string().optional().describe("End user last name (used with email for new users)"),
      TicketPriority: z.string().optional().describe("Priority: Low, Medium, High, Critical"),
      TicketImpact: z.string().optional().describe("Impact: NoImpact, Minor, Major, SiteDown, ServerIssue, Crisis"),
      TicketStatus: z.string().optional().describe("Status: Open, Pending, Resolved, Closed"),
      TicketType: z.string().optional().describe("Type: Problem, Bug, Request, Other, Incident, Change"),
      TechnicianContactID: z.number().optional().describe("Assigned technician contact ID"),
    },
    async (args) => {
      try {
        const result = await client.post("/api/v3/tickets", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "delete_ticket",
    "Delete a ticket by ID.",
    {
      ticketId: z.number().describe("The ticket ID to delete"),
    },
    async ({ ticketId }) => {
      try {
        await client.del(`/api/v3/tickets/${ticketId}`);
        return formatResponse({ success: true, message: `Ticket ${ticketId} deleted` });
      } catch (error) {
        return formatError(error);
      }
    },
  );
}
