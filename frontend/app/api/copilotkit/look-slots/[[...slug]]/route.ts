// Docs: no runtime changes on this page -> the quickstart "Setup Copilot Runtime" route.
// Adaptations: agent key -> "look-slots"; HttpAgent URL -> /look-slots;
// basePath -> /api/copilotkit/look-slots. `intelligence` + `identifyUser` dropped (as quickstart).
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "look-slots": new HttpAgent({ url: "http://localhost:8000/look-slots" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/look-slots",
});

export const GET = handler;
export const POST = handler;
