// Docs: from-a2ui -> "Before and after" ("Runtime, after"):
//   // Nothing: a run that carries a catalog gets the render_ui tool and the guide.
//   const runtime = new CopilotRuntime({ agents });
// Started from the quickstart route. Adaptations: agent key -> "genui-components-from-a2ui";
// HttpAgent URL -> /genui-components-from-a2ui; basePath -> /api/copilotkit/genui-components-from-a2ui.
// `intelligence` + `identifyUser` dropped.
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const agents = {
  "genui-components-from-a2ui": new HttpAgent({ url: "http://localhost:8000/genui-components-from-a2ui" }),
};

// Nothing: a run that carries a catalog gets the render_ui tool and the guide.
// To force or limit it: generativeUI: true, or generativeUI: { agents: ["shop"] }.
const runtime = new CopilotRuntime({ agents });

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/genui-components-from-a2ui",
});

export const GET = handler;
export const POST = handler;
