// Docs: quickstart -> "Setup Copilot Runtime" (app/api/copilotkit/[[...slug]]/route.ts)
// Adaptations: agent key "strands_agent" -> "quickstart"; HttpAgent URL -> /quickstart;
// basePath -> /api/copilotkit/quickstart. `intelligence` + `identifyUser` dropped, as the
// docs callout "Running without the Intelligence Platform?" describes.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    quickstart: new HttpAgent({ url: "http://localhost:8000/quickstart" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/quickstart",
});

export const GET = handler;
export const POST = handler;
