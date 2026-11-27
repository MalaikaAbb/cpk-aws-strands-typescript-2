// Docs: no runtime changes on this page -> the quickstart "Setup Copilot Runtime" route.
// Adaptations: agent key -> "look-markdown"; HttpAgent URL -> /look-markdown;
// basePath -> /api/copilotkit/look-markdown. `intelligence` + `identifyUser` dropped (as quickstart).
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "look-markdown": new HttpAgent({ url: "http://localhost:8000/look-markdown" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/look-markdown",
});

export const GET = handler;
export const POST = handler;
