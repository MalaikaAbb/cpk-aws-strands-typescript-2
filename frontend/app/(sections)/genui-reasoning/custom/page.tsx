"use client";
// Docs: generative-ui/reasoning -> "Custom reasoning rendering": the import block + the page.tsx tab.
// The docs put <CopilotKit> in the page, so it stays here.
// Adaptations: runtimeUrl -> /api/copilotkit/genui-reasoning;
// AGENT_ID "reasoning-custom" -> "genui-reasoning".
// Import paths adjusted: ReasoningBlock lives in ../_components.
// The docs' `useReasoningCustomSuggestions()` call is removed.

import type { CopilotChatReasoningMessage } from "@copilotkit/react-core/v2";
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
import { ReasoningBlock } from "../_components/reasoning-block";

const AGENT_ID = "genui-reasoning";

export default function ReasoningCustomDemo() {
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
