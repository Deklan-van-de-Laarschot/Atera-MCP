import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { AteraClient, formatResponse, formatError } from "../client.js";
import type { CustomField, CustomValue } from "../types.js";

export function registerCustomValueTools(server: McpServer, client: AteraClient) {
  server.tool(
    "get_custom_fields",
    "Get the list of all custom field definitions and their value options.",
    {},
    async () => {
      try {
        const result = await client.get<CustomField[]>("/api/v3/customvalues/customfields");
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  // Ticket custom fields
  server.tool(
    "get_ticket_custom_field",
    "Get a custom field value for a specific ticket.",
    {
      ticketId: z.number().describe("The ticket ID"),
      fieldName: z.string().describe("Custom field name"),
    },
    async ({ ticketId, fieldName }) => {
      try {
        const result = await client.get<CustomValue[]>(
          `/api/v3/customvalues/ticketfield/${ticketId}/${encodeURIComponent(fieldName)}`,
        );
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "set_ticket_custom_field",
    "Set a custom field value for a specific ticket.",
    {
      ticketId: z.number().describe("The ticket ID"),
      fieldName: z.string().describe("Custom field name"),
      value: z.string().describe("Value to set"),
    },
    async ({ ticketId, fieldName, value }) => {
      try {
        await client.put(
          `/api/v3/customvalues/ticketfield/${ticketId}/${encodeURIComponent(fieldName)}`,
          { Value: value },
        );
        return formatResponse({ success: true, message: `Custom field '${fieldName}' set on ticket ${ticketId}` });
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "get_all_ticket_custom_fields",
    "Get all custom field values for a specific ticket.",
    {
      ticketId: z.number().describe("The ticket ID"),
    },
    async ({ ticketId }) => {
      try {
        const result = await client.get<CustomValue[]>(
          `/api/v3/customvalues/ticketfields/${ticketId}`,
        );
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  // Customer custom fields
  server.tool(
    "get_customer_custom_field",
    "Get a custom field value for a specific customer.",
    {
      customerId: z.number().describe("The customer ID"),
      fieldName: z.string().describe("Custom field name"),
    },
    async ({ customerId, fieldName }) => {
      try {
        const result = await client.get<CustomValue[]>(
          `/api/v3/customvalues/customerfield/${customerId}/${encodeURIComponent(fieldName)}`,
        );
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "set_customer_custom_field",
    "Set a custom field value for a specific customer.",
    {
      customerId: z.number().describe("The customer ID"),
      fieldName: z.string().describe("Custom field name"),
      value: z.string().describe("Value to set"),
    },
    async ({ customerId, fieldName, value }) => {
      try {
        await client.put(
          `/api/v3/customvalues/customerfield/${customerId}/${encodeURIComponent(fieldName)}`,
          { Value: value },
        );
        return formatResponse({ success: true, message: `Custom field '${fieldName}' set on customer ${customerId}` });
      } catch (error) {
        return formatError(error);
      }
    },
  );

  // Contact custom fields
  server.tool(
    "get_contact_custom_field",
    "Get a custom field value for a specific contact.",
    {
      contactId: z.number().describe("The contact ID"),
      fieldName: z.string().describe("Custom field name"),
    },
    async ({ contactId, fieldName }) => {
      try {
        const result = await client.get<CustomValue[]>(
          `/api/v3/customvalues/contactfield/${contactId}/${encodeURIComponent(fieldName)}`,
        );
        return formatResponse(result);
      } catch (error) {
        return formatError(error);
      }
    },
  );

  server.tool(
    "set_contact_custom_field",
    "Set a custom field value for a specific contact.",
    {
      contactId: z.number().describe("The contact ID"),
      fieldName: z.string().describe("Custom field name"),
      value: z.string().describe("Value to set"),
    },
    async ({ contactId, fieldName, value }) => {
      try {
        await client.put(
          `/api/v3/customvalues/contactfield/${contactId}/${encodeURIComponent(fieldName)}`,
          { Value: value },
        );
        return formatResponse({ success: true, message: `Custom field '${fieldName}' set on contact ${contactId}` });
      } catch (error) {
        return formatError(error);
      }
    },
  );
}
