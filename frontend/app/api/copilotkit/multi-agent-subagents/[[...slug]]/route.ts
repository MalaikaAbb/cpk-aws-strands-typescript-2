// Docs: quickstart -> "Setup Copilot Runtime" (the sub-agents page changes nothing in the runtime).
// Adaptations: agent key -> "multi-agent-subagents"; HttpAgent URL -> /multi-agent-subagents; basePath -> /api/copilotkit/multi-agent-subagents.
// `intelligence` + `identifyUser` dropped (as in quickstart).
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "multi-agent-subagents": new HttpAgent({ url: "http://localhost:8000/multi-agent-subagents" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/multi-agent-subagents",
});

export const GET = handler;
export const POST = handler;
