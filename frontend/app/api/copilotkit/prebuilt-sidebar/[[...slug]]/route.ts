// Docs: no runtime changes on this page -> the quickstart "Setup Copilot Runtime" route.
// Adaptations: agent key -> "prebuilt-sidebar"; HttpAgent URL -> /prebuilt-sidebar;
// basePath -> /api/copilotkit/prebuilt-sidebar. `intelligence` + `identifyUser` dropped (as quickstart).
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "prebuilt-sidebar": new HttpAgent({ url: "http://localhost:8000/prebuilt-sidebar" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/prebuilt-sidebar",
});

export const GET = handler;
export const POST = handler;
