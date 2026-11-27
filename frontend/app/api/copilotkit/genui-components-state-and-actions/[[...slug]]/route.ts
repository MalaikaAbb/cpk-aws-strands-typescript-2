// Docs: generative-ui/components/state-and-actions (no runtime code on this page).
// The page gives no runtime code for a Strands agent, so this is the quickstart runtime
// route (generative-ui/components: "Your runtime needs no change").
// Adaptations: agent key -> "genui-components-state-and-actions"; HttpAgent URL -> /genui-components-state-and-actions; basePath -> /api/copilotkit/genui-components-state-and-actions.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-components-state-and-actions": new HttpAgent({ url: "http://localhost:8000/genui-components-state-and-actions" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-components-state-and-actions",
});

export const GET = handler;
export const POST = handler;
