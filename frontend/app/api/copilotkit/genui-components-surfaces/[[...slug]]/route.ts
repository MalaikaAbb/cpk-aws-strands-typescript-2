// Docs: generative-ui/components/surfaces (no runtime code on this page).
// The page gives no runtime code for a Strands agent, so this is the quickstart runtime
// route (generative-ui/components: "Your runtime needs no change").
// Adaptations: agent key -> "genui-components-surfaces"; HttpAgent URL -> /genui-components-surfaces; basePath -> /api/copilotkit/genui-components-surfaces.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-components-surfaces": new HttpAgent({ url: "http://localhost:8000/genui-components-surfaces" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-components-surfaces",
});

export const GET = handler;
export const POST = handler;
