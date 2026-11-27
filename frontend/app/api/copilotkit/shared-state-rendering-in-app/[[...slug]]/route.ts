// Docs: quickstart -> "Setup Copilot Runtime" (app/api/copilotkit/[[...slug]]/route.ts).
// The shared-state-rendering-in-app page has no runtime changes.
// Adaptations: agent key "strands_agent" -> "shared-state-rendering-in-app"; HttpAgent URL -> /shared-state-rendering-in-app;
// basePath -> /api/copilotkit/shared-state-rendering-in-app. `intelligence` + `identifyUser` dropped, as the
// docs callout "Running without the Intelligence Platform?" describes.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "shared-state-rendering-in-app": new HttpAgent({ url: "http://localhost:8000/shared-state-rendering-in-app" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/shared-state-rendering-in-app",
});

export const GET = handler;
export const POST = handler;
