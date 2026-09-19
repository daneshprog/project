
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";

function createServer() {
  const server = new McpServer({
    name: "Tekanino MCP",
    version: "1.0.0",
  });

  server.registerTool(
    "ping",
    {
      description: "Check if Tekanino MCP is online",
      inputSchema: {
        message: z.string().optional(),
      },
    },
    async ({ message }) => ({
      content: [
        {
          type: "text",
          text: message
            ? `Tekanino MCP online: ${message}`
            : "Tekanino MCP online",
        },
      ],
    }),
  );

  return server;
}

export default {
  fetch(request, env, ctx) {
    return createMcpHandler(createServer)(request, env, ctx);
  },
};
