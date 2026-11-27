"use client";
// Docs: generative-ui/reasoning -> "Default reasoning rendering (zero-config)" (src/app/demos/reasoning-default/page.tsx).
// The docs put <CopilotKit> in the page, so it stays here (no section layout provider).
// Adaptations: runtimeUrl -> /api/copilotkit/genui-reasoning;
// AGENT_ID "reasoning-default" -> "genui-reasoning".
// Added (needed): the imports (from the demo). The docs' `useReasoningDefaultSuggestions()` call is removed.

import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";

const AGENT_ID = "genui-reasoning";

export default function ReasoningDefaultDemo() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/genui-reasoning" agent={AGENT_ID}>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-full w-full max-w-4xl">
          <Chat />
        </div>
      </div>
    </CopilotKit>
  );
}

function Chat() {
  return <CopilotChat agentId={AGENT_ID} className="h-full rounded-2xl" />;
}
