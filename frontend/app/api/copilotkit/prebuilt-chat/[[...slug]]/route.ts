// Docs: no runtime changes on this page -> the quickstart "Setup Copilot Runtime" route.
// Adaptations: agent key -> "prebuilt-chat"; HttpAgent URL -> /prebuilt-chat;
// basePath -> /api/copilotkit/prebuilt-chat. `intelligence` + `identifyUser` dropped (as quickstart).
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "prebuilt-chat": new HttpAgent({ url: "http://localhost:8000/prebuilt-chat" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/prebuilt-chat",
});

export const GET = handler;
export const POST = handler;
