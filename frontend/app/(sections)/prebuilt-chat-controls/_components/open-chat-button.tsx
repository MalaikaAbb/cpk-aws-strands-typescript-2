"use client";
// Docs: prebuilt-components/chat-controls -> "Programmatically open or close the chat"
// (OpenChatButton), verbatim. Added: `export` so the sub-routes can render it.

import { useCopilotChatConfiguration } from "@copilotkit/react-core/v2";

export function OpenChatButton() {
  const config = useCopilotChatConfiguration();

  // setModalOpen is only present when a provider in the tree owns modal state
  // (the prebuilt CopilotPopup / CopilotSidebar create it for you).
  if (!config?.setModalOpen) return null;

  return (
    <button onClick={() => config.setModalOpen(true)}>
      Ask the assistant
    </button>
  );
}
