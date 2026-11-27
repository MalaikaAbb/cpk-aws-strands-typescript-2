"use client";
// Docs: reasoning-messages -> "Fully Custom Reasoning Message" (src/app/demos/reasoning-custom/page.tsx).
// The docs put <CopilotKit> in the page, so it stays here.
// Adaptations: runtimeUrl -> /api/copilotkit/look-reasoning-messages;
// AGENT_ID "reasoning-custom" -> "look-reasoning-messages".
// Added (needed): the imports (from the demo). The docs' `useReasoningCustomSuggestions()` call is removed.

import type { CopilotChatReasoningMessage } from "@copilotkit/react-core/v2";
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
import { ReasoningBlock } from "../_components/reasoning-block";

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
