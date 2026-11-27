// The markdown-mode page doesn't change the runtime ("The runtime adds no render_ui tool
// to these runs"), so this is the quickstart runtime route.
// Adaptations: agent key -> "genui-components-markdown-mode"; HttpAgent URL -> /genui-components-markdown-mode;
// basePath -> /api/copilotkit/genui-components-markdown-mode. `intelligence` + `identifyUser` dropped.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-components-markdown-mode": new HttpAgent({ url: "http://localhost:8000/genui-components-markdown-mode" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-components-markdown-mode",
});

export const GET = handler;
export const POST = handler;
