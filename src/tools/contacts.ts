import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AteraClient, formatResponse, formatError } from "../client.js";
import type { Contact } from "../types.js";

export function registerContactTools(server: McpServer, client: AteraClient) {
  server.tool(
    "list_contacts",
    "List contacts in Atera. Supports searching by email or phone.",
    {
      page: z.number().optional().describe("Page number (default 1)"),
      itemsInPage: z.number().optional().describe("Items per page (default 20, max 50)"),
      "searchOptions.email": z.string().optional().describe("Filter by email (partial match)"),
      "searchOptions.phone": z.string().optional().describe("Filter by phone (partial match)"),
    },
    async (args) => {
      try {
        const result = await client.getList<Contact>("/api/v3/contacts", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "get_contact",
    "Get a specific contact by ID with full details.",
    {
      contactId: z.number().describe("The contact ID"),
    },
    async ({ contactId }) => {
      try {
        const result = await client.get<Contact>(`/api/v3/contacts/${contactId}`);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "create_contact",
    "Create a new contact for an existing customer.",
    {
      CustomerID: z.number().describe("Customer ID this contact belongs to"),
      Email: z.string().describe("Contact email address"),
      Firstname: z.string().optional().describe("First name"),
      Lastname: z.string().optional().describe("Last name"),
      JobTitle: z.string().optional().describe("Job title"),
      Phone: z.string().optional().describe("Phone number"),
      MobilePhone: z.string().optional().describe("Mobile phone number"),
      IsContactPerson: z.boolean().optional().describe("Is this a contact person"),
    },
    async (args) => {
      try {
        const result = await client.post("/api/v3/contacts", args);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "update_contact",
    "Update an existing contact. Only provide fields you want to change.",
    {
      contactId: z.number().describe("The contact ID to update"),
      Firstname: z.string().optional().describe("First name"),
      Lastname: z.string().optional().describe("Last name"),
      JobTitle: z.string().optional().describe("Job title"),
      Phone: z.string().optional().describe("Phone number"),
      MobilePhone: z.string().optional().describe("Mobile phone number"),
      IsContactPerson: z.boolean().optional().describe("Is this a contact person"),
      InIgnoreMode: z.boolean().optional().describe("Ignore mode flag"),
    },
    async ({ contactId, ...body }) => {
      try {
        const result = await client.put(`/api/v3/contacts/${contactId}`, body);
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "delete_contact",
    "Delete a contact by ID.",
    {
      contactId: z.number().describe("The contact ID to delete"),
    },
    async ({ contactId }) => {
      try {
        await client.del(`/api/v3/contacts/${contactId}`);
        return formatResponse({ success: true, message: `Contact ${contactId} deleted` });
      } catch (error) {
        return formatError(error);
      }
    },
  );
}
