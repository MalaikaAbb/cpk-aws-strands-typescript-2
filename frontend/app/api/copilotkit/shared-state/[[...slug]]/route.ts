// Docs: quickstart -> "Setup Copilot Runtime" (app/api/copilotkit/[[...slug]]/route.ts).
// The shared-state page has no runtime changes.
// Adaptations: agent key "strands_agent" -> "shared-state"; HttpAgent URL -> /shared-state;
// basePath -> /api/copilotkit/shared-state. `intelligence` + `identifyUser` dropped, as the
// docs callout "Running without the Intelligence Platform?" describes.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "shared-state": new HttpAgent({ url: "http://localhost:8000/shared-state" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/shared-state",
});

export const GET = handler;
export const POST = handler;
