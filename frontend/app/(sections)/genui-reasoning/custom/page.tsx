"use client";
// Docs: generative-ui/reasoning -> "Custom reasoning rendering": the import block + the page.tsx tab.
// The docs put <CopilotKit> in the page, so it stays here.
// Adaptations: runtimeUrl -> /api/copilotkit/genui-reasoning;
// AGENT_ID "reasoning-custom" -> "genui-reasoning".
// Import paths adjusted: ReasoningBlock lives in ../_components.
// Demo code: the `useReasoningCustomSuggestions` import (showcase reasoning-custom/page.tsx).

import type { CopilotChatReasoningMessage } from "@copilotkit/react-core/v2";
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
import { ReasoningBlock } from "../_components/reasoning-block";
import { useReasoningCustomSuggestions } from "../_components/custom-suggestions";

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
