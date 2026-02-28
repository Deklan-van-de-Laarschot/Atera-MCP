#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { AteraClient } from "./client.js";
import { registerTicketTools } from "./tools/tickets.js";
import { registerCustomerTools } from "./tools/customers.js";
import { registerContactTools } from "./tools/contacts.js";
import { registerAgentTools } from "./tools/agents.js";
import { registerAlertTools } from "./tools/alerts.js";
import { registerContractTools } from "./tools/contracts.js";
import { registerBillingTools } from "./tools/billing.js";
import { registerKnowledgeBaseTools } from "./tools/knowledgebase.js";
import { registerDepartmentTools } from "./tools/departments.js";
import { registerProductTools } from "./tools/products.js";
import { registerExpenseTools } from "./tools/expenses.js";
import { registerCustomValueTools } from "./tools/custom-values.js";

const server = new McpServer({
  name: "atera",
  version: "1.0.0",
});

const client = new AteraClient();

registerTicketTools(server, client);
registerCustomerTools(server, client);
registerContactTools(server, client);
registerAgentTools(server, client);
registerAlertTools(server, client);
registerContractTools(server, client);
registerBillingTools(server, client);
registerKnowledgeBaseTools(server, client);
registerDepartmentTools(server, client);
registerProductTools(server, client);
registerExpenseTools(server, client);
registerCustomValueTools(server, client);

const transport = new StdioServerTransport();
await server.connect(transport);
