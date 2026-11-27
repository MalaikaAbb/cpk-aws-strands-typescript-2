// Docs: generative-ui/mcp-apps gives no backend code -> quickstart agent. (The runtime's MCP Apps
// middleware adds the MCP server's tools to each run; the agent needs no tools of its own.)
import { createQuickstartApp } from "../quickstart-agent.ts";
export default await createQuickstartApp("genui-mcp-apps");
