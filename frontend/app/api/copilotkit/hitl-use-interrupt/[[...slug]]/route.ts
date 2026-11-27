// Docs: quickstart -> "Setup Copilot Runtime" (the useInterrupt page changes nothing in the runtime).
// Adaptations: agent key -> "hitl-use-interrupt"; HttpAgent URL -> /hitl-use-interrupt; basePath -> /api/copilotkit/hitl-use-interrupt.
// `intelligence` + `identifyUser` dropped (as in quickstart).
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "hitl-use-interrupt": new HttpAgent({ url: "http://localhost:8000/hitl-use-interrupt" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/hitl-use-interrupt",
});

export const GET = handler;
export const POST = handler;
