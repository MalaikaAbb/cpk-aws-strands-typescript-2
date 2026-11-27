// Docs: quickstart -> "Setup Copilot Runtime" (base), plus
// generative-ui/open-generative-ui -> "Enable it in the runtime" (src/app/api/copilotkit-ogui/route.ts):
// `openGenerativeUI: { agents: [...] }` on the CopilotRuntime, including the docs' `// @ts-ignore`.
// Adaptations: agents "open-gen-ui" / "open-gen-ui-advanced" -> "genui-open-generative-ui" /
// "genui-open-generative-ui-advanced"; basePath -> /api/copilotkit/genui-open-generative-ui.
// `intelligence` + `identifyUser` dropped (as in quickstart).
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

const agents = {
  "genui-open-generative-ui": new HttpAgent({
    url: "http://localhost:8000/genui-open-generative-ui",
  }),
  "genui-open-generative-ui-advanced": new HttpAgent({
    url: "http://localhost:8000/genui-open-generative-ui-advanced",
  }),
};

const handler = createCopilotRuntimeHandler({
  runtime: new CopilotRuntime({
    // @ts-ignore -- see main route.ts
    agents,
    openGenerativeUI: {
      agents: ["genui-open-generative-ui", "genui-open-generative-ui-advanced"],
    },
  }),
  basePath: "/api/copilotkit/genui-open-generative-ui",
});

export const GET = handler;
export const POST = handler;
