// Docs: quickstart -> "Setup Copilot Runtime" (the headless-interrupts page changes nothing in the runtime).
// Adaptations: agent key -> "hitl-headless"; HttpAgent URL -> /hitl-headless; basePath -> /api/copilotkit/hitl-headless.
// `intelligence` + `identifyUser` dropped (as in quickstart).
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "hitl-headless": new HttpAgent({ url: "http://localhost:8000/hitl-headless" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/hitl-headless",
});

export const GET = handler;
export const POST = handler;
