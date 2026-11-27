"use client";
// Demo code: copied from showcase src/app/demos/open-gen-ui/chat.tsx (docs reference "the demo's Chat component").
// Adaptation: agentId "open-gen-ui" -> "genui-open-generative-ui".

import { CopilotChat } from "@copilotkit/react-core/v2";
import { useOpenGenUISuggestions } from "./suggestions";

export function Chat() {
  useOpenGenUISuggestions();
  return <CopilotChat agentId="genui-open-generative-ui" className="flex-1 rounded-2xl" />;
}
