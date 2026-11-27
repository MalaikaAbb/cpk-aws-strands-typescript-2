"use client";
// Docs: prebuilt-components/chat -> "Basic setup" (imports + provider) and "Code example" (Chat).
// The docs put <CopilotKit> inside the page (src/app/demos/agentic-chat/page.tsx), so it stays here.
// Adaptations: runtimeUrl -> /api/copilotkit/prebuilt-chat; agent / agentId "agentic_chat" -> "prebuilt-chat".
// Added: the default-export page wrapper around the docs' provider fragment, and the
// import of useAgenticChatSuggestions (copied from the demo, see README).

import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";
import { useAgenticChatSuggestions } from "./_lib/suggestions";

export default function Page() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/prebuilt-chat" agent="prebuilt-chat">
      <Chat />
    </CopilotKit>
  );
}

function Chat() {
  useAgenticChatSuggestions();
  return <CopilotChat agentId="prebuilt-chat" />;
}
