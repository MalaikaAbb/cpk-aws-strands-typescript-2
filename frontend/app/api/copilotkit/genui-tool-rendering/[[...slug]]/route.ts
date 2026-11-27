// Docs: quickstart -> "Setup Copilot Runtime" (app/api/copilotkit/[[...slug]]/route.ts).
// The genui-tool-rendering page has no runtime changes.
// Adaptations: agent key "strands_agent" -> "genui-tool-rendering"; HttpAgent URL -> /genui-tool-rendering;
// basePath -> /api/copilotkit/genui-tool-rendering. `intelligence` + `identifyUser` dropped, as the
// docs callout "Running without the Intelligence Platform?" describes.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "genui-tool-rendering": new HttpAgent({ url: "http://localhost:8000/genui-tool-rendering" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-tool-rendering",
});

export const GET = handler;
export const POST = handler;
