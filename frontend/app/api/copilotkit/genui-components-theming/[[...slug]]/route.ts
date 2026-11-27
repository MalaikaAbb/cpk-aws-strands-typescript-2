// Docs: generative-ui/components/theming (no runtime code on this page).
// The page gives no runtime code for a Strands agent, so this is the quickstart runtime
// route (generative-ui/components: "Your runtime needs no change").
// Adaptations: agent key -> "genui-components-theming"; HttpAgent URL -> /genui-components-theming; basePath -> /api/copilotkit/genui-components-theming.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-components-theming": new HttpAgent({ url: "http://localhost:8000/genui-components-theming" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-components-theming",
});

export const GET = handler;
export const POST = handler;
