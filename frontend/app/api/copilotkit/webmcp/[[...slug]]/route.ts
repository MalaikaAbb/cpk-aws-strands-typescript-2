// Docs: quickstart -> "Setup Copilot Runtime" (app/api/copilotkit/[[...slug]]/route.ts).
// The webmcp page has no runtime changes.
// Adaptations: agent key "strands_agent" -> "webmcp"; HttpAgent URL -> /webmcp;
// basePath -> /api/copilotkit/webmcp. `intelligence` + `identifyUser` dropped, as the
// docs callout "Running without the Intelligence Platform?" describes.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "webmcp": new HttpAgent({ url: "http://localhost:8000/webmcp" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/webmcp",
});

export const GET = handler;
export const POST = handler;
