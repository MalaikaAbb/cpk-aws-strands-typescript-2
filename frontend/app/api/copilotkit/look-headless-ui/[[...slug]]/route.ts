// Docs: quickstart -> "Setup Copilot Runtime" (app/api/copilotkit/[[...slug]]/route.ts)
// Adaptations: agent key "strands_agent" -> "look-headless-ui"; HttpAgent URL -> /look-headless-ui;
// basePath -> /api/copilotkit/look-headless-ui. `intelligence` + `identifyUser` dropped, as the
// docs callout "Running without the Intelligence Platform?" describes.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "look-headless-ui": new HttpAgent({ url: "http://localhost:8000/look-headless-ui" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/look-headless-ui",
});

export const GET = handler;
export const POST = handler;
