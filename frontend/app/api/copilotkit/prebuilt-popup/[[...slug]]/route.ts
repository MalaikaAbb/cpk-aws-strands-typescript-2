// Docs: no runtime changes on this page -> the quickstart "Setup Copilot Runtime" route.
// Adaptations: agent key -> "prebuilt-popup"; HttpAgent URL -> /prebuilt-popup;
// basePath -> /api/copilotkit/prebuilt-popup. `intelligence` + `identifyUser` dropped (as quickstart).
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "prebuilt-popup": new HttpAgent({ url: "http://localhost:8000/prebuilt-popup" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/prebuilt-popup",
});

export const GET = handler;
export const POST = handler;
