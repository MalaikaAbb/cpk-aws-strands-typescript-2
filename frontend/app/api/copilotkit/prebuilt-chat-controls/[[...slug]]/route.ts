// Docs: no runtime changes on this page -> the quickstart "Setup Copilot Runtime" route.
// Adaptations: agent key -> "prebuilt-chat-controls"; HttpAgent URL -> /prebuilt-chat-controls;
// basePath -> /api/copilotkit/prebuilt-chat-controls. `intelligence` + `identifyUser` dropped (as quickstart).
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "prebuilt-chat-controls": new HttpAgent({ url: "http://localhost:8000/prebuilt-chat-controls" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/prebuilt-chat-controls",
});

export const GET = handler;
export const POST = handler;
