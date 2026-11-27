// Docs: quickstart -> "Setup Copilot Runtime" (app/api/copilotkit/[[...slug]]/route.ts)
// Adaptations: agent key "strands_agent" -> "genui-tool-based"; HttpAgent URL -> /genui-tool-based;
// basePath -> /api/copilotkit/genui-tool-based. `intelligence` + `identifyUser` dropped, as the
// docs callout "Running without the Intelligence Platform?" describes.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-tool-based": new HttpAgent({ url: "http://localhost:8000/genui-tool-based" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-tool-based",
});

export const GET = handler;
export const POST = handler;
