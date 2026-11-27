// Docs: quickstart -> "Setup Copilot Runtime" (app/api/copilotkit/[[...slug]]/route.ts).
// The shared-state-agent-readonly page has no runtime changes.
// Adaptations: agent key "strands_agent" -> "shared-state-agent-readonly"; HttpAgent URL -> /shared-state-agent-readonly;
// basePath -> /api/copilotkit/shared-state-agent-readonly. `intelligence` + `identifyUser` dropped, as the
// docs callout "Running without the Intelligence Platform?" describes.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "shared-state-agent-readonly": new HttpAgent({ url: "http://localhost:8000/shared-state-agent-readonly" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/shared-state-agent-readonly",
});

export const GET = handler;
export const POST = handler;
