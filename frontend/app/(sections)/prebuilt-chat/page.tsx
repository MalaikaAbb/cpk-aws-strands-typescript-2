"use client";
// Docs: prebuilt-components/chat -> "Basic setup" + "Code example".
// Adaptations: runtimeUrl -> /api/copilotkit/prebuilt-chat; agent / agentId -> "prebuilt-chat".
// Removed: the docs' `useAgenticChatSuggestions();` line (demo suggestions hook, see README).

import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

export default function Page() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/prebuilt-chat" agent="prebuilt-chat">
      <Chat />
    </CopilotKit>
  );
}

function Chat() {
  return <CopilotChat agentId="prebuilt-chat" />;
}
