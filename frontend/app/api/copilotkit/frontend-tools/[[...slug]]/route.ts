// Docs: quickstart -> "Setup Copilot Runtime" (app/api/copilotkit/[[...slug]]/route.ts)
// Adaptations: agent key "strands_agent" -> "frontend-tools"; HttpAgent URL -> /frontend-tools;
// basePath -> /api/copilotkit/frontend-tools. `intelligence` + `identifyUser` dropped, as the
// docs callout "Running without the Intelligence Platform?" describes.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "frontend-tools": new HttpAgent({ url: "http://localhost:8000/frontend-tools" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/frontend-tools",
});

export const GET = handler;
export const POST = handler;
