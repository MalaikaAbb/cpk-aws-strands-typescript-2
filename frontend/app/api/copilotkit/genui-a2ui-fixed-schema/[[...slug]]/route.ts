// Quickstart runtime + docs: fixed-schema -> "Turn off tool injection on the runtime"
// (app/api/copilotkit/route.ts):
//   a2ui: { injectA2UITool: false, agents: ["a2ui-fixed-schema"] },
// Adaptations: agent key "a2ui-fixed-schema" -> "genui-a2ui-fixed-schema" (also in a2ui.agents);
// HttpAgent URL -> /genui-a2ui-fixed-schema; basePath -> /api/copilotkit/genui-a2ui-fixed-schema.
// `intelligence` + `identifyUser` dropped.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const agent = new HttpAgent({ url: "http://localhost:8000/genui-a2ui-fixed-schema" });

const runtime = new CopilotRuntime({
  agents: { "genui-a2ui-fixed-schema": agent },
  a2ui: { injectA2UITool: false, agents: ["genui-a2ui-fixed-schema"] },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-a2ui-fixed-schema",
});

export const GET = handler;
export const POST = handler;
