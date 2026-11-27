// Docs: generative-ui/components -> "Try it": "Already have CopilotKit running? Do step 3 only.
// Your runtime needs no change". So this is the quickstart runtime route (Strands agent via
// HttpAgent), not the page's BuiltInAgent route (skipped per the user's instruction).
// Adaptations: agent key -> "genui-components"; HttpAgent URL -> /genui-components; basePath -> /api/copilotkit/genui-components.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-components": new HttpAgent({ url: "http://localhost:8000/genui-components" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-components",
});

export const GET = handler;
export const POST = handler;
