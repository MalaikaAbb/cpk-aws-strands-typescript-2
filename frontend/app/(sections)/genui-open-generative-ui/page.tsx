"use client";
// Docs: generative-ui/open-generative-ui -> "Drop <CopilotChat /> into the page"
// (src/app/demos/open-gen-ui/page.tsx). The docs give only the return statement; "use client",
// the imports and the function wrapper are added.
// Adaptations: runtimeUrl -> /api/copilotkit/genui-open-generative-ui; agent -> "genui-open-generative-ui".
// Removed from the docs snippet: `openGenerativeUI={{ designSkill: VISUALIZATION_DESIGN_SKILL }}`
// (optional per the docs; VISUALIZATION_DESIGN_SKILL is demo-only, see README).

import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";

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
    >
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-full w-full max-w-4xl flex flex-col p-3">
          <Chat />
        </div>
      </div>
    </CopilotKit>
  );
}

// The docs render <Chat /> without defining it ("renders <CopilotChat agentId="open-gen-ui" />").
function Chat() {
  return <CopilotChat agentId="genui-open-generative-ui" />;
}
