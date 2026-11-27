// Docs: quickstart -> "Setup Copilot Runtime" (app/api/copilotkit/[[...slug]]/route.ts)
// Adaptations: agent key "strands_agent" -> "look-reasoning-messages"; HttpAgent URL -> /look-reasoning-messages;
// basePath -> /api/copilotkit/look-reasoning-messages. `intelligence` + `identifyUser` dropped, as the
// docs callout "Running without the Intelligence Platform?" describes.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "look-reasoning-messages": new HttpAgent({ url: "http://localhost:8000/look-reasoning-messages" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/look-reasoning-messages",
});

export const GET = handler;
export const POST = handler;
