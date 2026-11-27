// Docs: mcp-apps -> "Wire the runtime to your MCP server(s)" (src/app/api/copilotkit-mcp-apps/route.ts),
// with the quickstart route's imports, HttpAgent and handler around it.
// The docs snippet uses `agents` without defining it; it is defined below like the quickstart's agents
// (the demo route defines it the same way: an object of HttpAgents).
// Adaptations: agent key -> "genui-mcp-apps"; HttpAgent URL -> /genui-mcp-apps;
// basePath -> /api/copilotkit/genui-mcp-apps. `intelligence` + `identifyUser` dropped.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const agents = {
  "genui-mcp-apps": new HttpAgent({ url: "http://localhost:8000/genui-mcp-apps" }),
};

// The `mcpApps.servers` config is all you need server-side. The runtime
// auto-applies the MCP Apps middleware to every registered agent: on each
// MCP tool call it fetches the associated UI resource and emits an
// `activity` event that the built-in `MCPAppsActivityRenderer` renders
// inline in the chat.
const runtime = new CopilotRuntime({
  // @ts-ignore -- see main route.ts; published CopilotRuntime's `agents`
  // type wraps Record in MaybePromise<NonEmptyRecord<...>> which rejects
  // plain Records. Fixed in source, pending release.
  agents,
  mcpApps: {
    servers: [
      {
        type: "http",
        url: process.env.MCP_SERVER_URL || "https://mcp.excalidraw.com",
        // Always pin a stable `serverId`. Without it CopilotKit hashes the
        // URL, and a URL change silently breaks restoration of persisted
        // MCP Apps in prior conversation threads.
        serverId: "excalidraw",
      },
    ],
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-mcp-apps",
});

export const GET = handler;
export const POST = handler;
