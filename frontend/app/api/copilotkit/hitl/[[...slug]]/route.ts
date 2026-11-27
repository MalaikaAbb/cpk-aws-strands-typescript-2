// Docs: quickstart -> "Setup Copilot Runtime" (the HITL page changes nothing in the runtime).
// Adaptations: agent key -> "hitl"; HttpAgent URL -> /hitl; basePath -> /api/copilotkit/hitl.
// `intelligence` + `identifyUser` dropped (as in quickstart).
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    hitl: new HttpAgent({ url: "http://localhost:8000/hitl" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/hitl",
});

export const GET = handler;
export const POST = handler;
