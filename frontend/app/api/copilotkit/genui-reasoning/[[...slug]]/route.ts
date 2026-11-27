// Docs: quickstart -> "Setup Copilot Runtime" (app/api/copilotkit/[[...slug]]/route.ts)
// Adaptations: agent key "strands_agent" -> "genui-reasoning"; HttpAgent URL -> /genui-reasoning;
// basePath -> /api/copilotkit/genui-reasoning. `intelligence` + `identifyUser` dropped, as the
// docs callout "Running without the Intelligence Platform?" describes.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-reasoning": new HttpAgent({ url: "http://localhost:8000/genui-reasoning" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-reasoning",
});

export const GET = handler;
export const POST = handler;
