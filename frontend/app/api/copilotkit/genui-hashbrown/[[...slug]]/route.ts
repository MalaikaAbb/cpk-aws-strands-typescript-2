// The hashbrown page doesn't change the runtime: quickstart runtime route.
// Adaptations: agent key -> "genui-hashbrown"; HttpAgent URL -> /genui-hashbrown;
// basePath -> /api/copilotkit/genui-hashbrown. `intelligence` + `identifyUser` dropped.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-hashbrown": new HttpAgent({ url: "http://localhost:8000/genui-hashbrown" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-hashbrown",
});

export const GET = handler;
export const POST = handler;
