"use client";
// Docs: prebuilt-components/copilot-threads-drawer -> "Add your own "New conversation" button",
// the controlled-thread example (`ControlledChat`, no file named).
// Host: the docs give only ControlledChat, so it is rendered under the same <CopilotKitProvider>
// as ../page.tsx (runtimeUrl, agentId, useSingleEndpoint={false}). Imports completed:
// useState (react) and the components from @copilotkit/react-core/v2. "use client" added
// because ControlledChat uses useState.
import { useState } from "react";
import {
  CopilotKitProvider,
  CopilotChatConfigurationProvider,
  CopilotChat,
  CopilotThreadsDrawer,
} from "@copilotkit/react-core/v2";

function ControlledChat() {
  const [threadId, setThreadId] = useState(() => crypto.randomUUID());
  const startNew = () => setThreadId(crypto.randomUUID());

  return (
    <CopilotChatConfigurationProvider threadId={threadId}>
      <CopilotThreadsDrawer
        onThreadSelect={(id) => setThreadId(id)}
        onNewThread={startNew}
      />
      <button type="button" onClick={startNew}>
        New conversation
      </button>
      <CopilotChat />
    </CopilotChatConfigurationProvider>
  );
}

export default function Page() {
  return (
    <CopilotKitProvider
      runtimeUrl="/api/copilotkit/prebuilt-threads-drawer"
      agentId="prebuilt-threads-drawer"
      useSingleEndpoint={false}
    >
      <ControlledChat />
    </CopilotKitProvider>
  );
}
