// Docs: quickstart -> "Setup Copilot Runtime" (app/api/copilotkit/[[...slug]]/route.ts)
// Adaptations: agent key "strands_agent" -> "multimodal-attachments"; HttpAgent URL -> /multimodal-attachments;
// basePath -> /api/copilotkit/multimodal-attachments. `intelligence` + `identifyUser` dropped, as the
// docs callout "Running without the Intelligence Platform?" describes.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const runtime = new CopilotRuntime({
  agents: {
    "multimodal-attachments": new HttpAgent({ url: "http://localhost:8000/multimodal-attachments" }),
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/multimodal-attachments",
});

export const GET = handler;
export const POST = handler;
