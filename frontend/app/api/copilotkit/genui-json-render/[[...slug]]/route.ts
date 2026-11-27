// The json-render page doesn't change the runtime: quickstart runtime route.
// Adaptations: agent key -> "genui-json-render"; HttpAgent URL -> /genui-json-render;
// basePath -> /api/copilotkit/genui-json-render. `intelligence` + `identifyUser` dropped.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-json-render": new HttpAgent({ url: "http://localhost:8000/genui-json-render" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-json-render",
});

export const GET = handler;
export const POST = handler;
