// Docs: transports -> "Tool transport" (app/api/copilotkit/route.ts): the runtime option
// `generativeUI: true` ("for every run"). The rest is the quickstart runtime route.
// Adaptations: agent key "default" -> "genui-components-transports", `agent` -> the quickstart HttpAgent at
// /genui-components-transports; basePath -> /api/copilotkit/genui-components-transports.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-components-transports": new HttpAgent({ url: "http://localhost:8000/genui-components-transports" }),
  },
  generativeUI: true,
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-components-transports",
});

export const GET = handler;
export const POST = handler;
