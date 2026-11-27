// Docs: generative-ui/components/standard-catalog (no runtime code on this page).
// The page gives no runtime code for a Strands agent, so this is the quickstart runtime
// route (generative-ui/components: "Your runtime needs no change").
// Adaptations: agent key -> "genui-components-standard-catalog"; HttpAgent URL -> /genui-components-standard-catalog; basePath -> /api/copilotkit/genui-components-standard-catalog.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-components-standard-catalog": new HttpAgent({ url: "http://localhost:8000/genui-components-standard-catalog" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-components-standard-catalog",
});

export const GET = handler;
export const POST = handler;
