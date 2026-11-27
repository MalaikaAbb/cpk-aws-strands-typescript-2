"use client";
// Docs: reasoning-messages -> "Default Behavior" (src/app/demos/reasoning-default/page.tsx).
// The docs put <CopilotKit> in the page, so it stays here (no section layout provider).
// Adaptations: runtimeUrl -> /api/copilotkit/look-reasoning-messages;
// AGENT_ID "reasoning-default" -> "look-reasoning-messages".
// Demo code (showcase reasoning-default/page.tsx): the imports.

import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
import { useReasoningDefaultSuggestions } from "./_components/default-suggestions";

const AGENT_ID = "look-reasoning-messages";

export default function ReasoningDefaultDemo() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/look-reasoning-messages" agent={AGENT_ID}>
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-full w-full max-w-4xl">
          <Chat />
        </div>
      </div>
    </CopilotKit>
  );
}

function Chat() {
  useReasoningDefaultSuggestions();
  return <CopilotChat agentId={AGENT_ID} className="h-full rounded-2xl" />;
}
