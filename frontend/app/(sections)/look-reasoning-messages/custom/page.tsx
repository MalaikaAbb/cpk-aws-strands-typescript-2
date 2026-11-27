"use client";
// Docs: reasoning-messages -> "Fully Custom Reasoning Message" (src/app/demos/reasoning-custom/page.tsx).
// The docs put <CopilotKit> in the page, so it stays here.
// Adaptations: runtimeUrl -> /api/copilotkit/look-reasoning-messages;
// AGENT_ID "reasoning-custom" -> "look-reasoning-messages".
// Demo code (showcase reasoning-custom/page.tsx): the imports.

import type { CopilotChatReasoningMessage } from "@copilotkit/react-core/v2";
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
import { ReasoningBlock } from "../_components/reasoning-block";
import { useReasoningCustomSuggestions } from "../_components/custom-suggestions";

const AGENT_ID = "look-reasoning-messages";

export default function ReasoningCustomDemo() {
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
  useReasoningCustomSuggestions();
  return (
    <CopilotChat
      agentId={AGENT_ID}
      className="h-full rounded-2xl"
      messageView={{
        reasoningMessage:
          ReasoningBlock as unknown as typeof CopilotChatReasoningMessage,
      }}
    />
  );
}
