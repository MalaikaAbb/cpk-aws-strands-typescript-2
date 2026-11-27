// Quickstart runtime. Docs: dynamic-schema -> "Pass the catalog to the provider":
// "The catalog auto-enables A2UI and injects the generate_a2ui tool, so the runtime needs
// no a2ui block". Adaptations: agent key -> "genui-a2ui-dynamic-schema"; HttpAgent URL -> /genui-a2ui-dynamic-schema;
// basePath -> /api/copilotkit/genui-a2ui-dynamic-schema. `intelligence` + `identifyUser` dropped.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-a2ui-dynamic-schema": new HttpAgent({ url: "http://localhost:8000/genui-a2ui-dynamic-schema" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-a2ui-dynamic-schema",
});

export const GET = handler;
export const POST = handler;
