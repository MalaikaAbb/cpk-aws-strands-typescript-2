"use client";
// Docs: generative-ui/open-generative-ui -> "Drop <CopilotChat /> into the page"
// (src/app/demos/open-gen-ui/page.tsx). The docs give only the return statement;
// the "use client", the CopilotKit import and the function wrapper are added so the
// snippet can run. VISUALIZATION_DESIGN_SKILL and Chat are not in the docs: they
// are copied from the demo (see README).
// Adaptations: runtimeUrl "/api/copilotkit-ogui" -> "/api/copilotkit/genui-open-generative-ui";
// agent "open-gen-ui" -> "genui-open-generative-ui". <CopilotKit> stays in the page, as in the docs.

import { CopilotKit } from "@copilotkit/react-core/v2";
import { VISUALIZATION_DESIGN_SKILL } from "./_components/design-skill";
import { Chat } from "./_components/chat";

export default function Page() {
  // Minimal Open Generative UI frontend: the built-in activity renderer is
  // registered by CopilotKitProvider, so a plain <CopilotChat /> is enough —
  // no custom tool renderers, no activity-renderer registration.
  // We DO pass `openGenerativeUI.designSkill` to swap in visualisation-tuned
  // guidance in place of the default shadcn design skill.
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit/genui-open-generative-ui"
      agent="genui-open-generative-ui"
      openGenerativeUI={{ designSkill: VISUALIZATION_DESIGN_SKILL }}
    >
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-full w-full max-w-4xl flex flex-col p-3">
          <Chat />
        </div>
      </div>
    </CopilotKit>
  );
}
