// Docs: generative-ui/components/catalogs (no runtime code on this page).
// The page gives no runtime code for a Strands agent, so this is the quickstart runtime
// route (generative-ui/components: "Your runtime needs no change").
// Adaptations: agent key -> "genui-components-catalogs"; HttpAgent URL -> /genui-components-catalogs; basePath -> /api/copilotkit/genui-components-catalogs.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-components-catalogs": new HttpAgent({ url: "http://localhost:8000/genui-components-catalogs" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-components-catalogs",
});

export const GET = handler;
export const POST = handler;
