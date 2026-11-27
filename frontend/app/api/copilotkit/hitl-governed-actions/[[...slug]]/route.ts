// Docs: quickstart -> "Setup Copilot Runtime" (the governed-actions page changes nothing in the runtime).
// Adaptations: agent key -> "hitl-governed-actions"; HttpAgent URL -> /hitl-governed-actions; basePath -> /api/copilotkit/hitl-governed-actions.
// `intelligence` + `identifyUser` dropped (as in quickstart).
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "hitl-governed-actions": new HttpAgent({ url: "http://localhost:8000/hitl-governed-actions" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/hitl-governed-actions",
});

export const GET = handler;
export const POST = handler;
