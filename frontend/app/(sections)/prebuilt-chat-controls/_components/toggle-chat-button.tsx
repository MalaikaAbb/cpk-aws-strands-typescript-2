"use client";
// Docs: prebuilt-components/chat-controls -> "To toggle, read `config.isModalOpen` and flip it".
// The docs give only the <button> JSX, which uses `config`. Added: a minimal component that
// gets `config` the same way OpenChatButton does (useCopilotChatConfiguration()). No null
// guard is added, because the docs snippet has none.

import { useCopilotChatConfiguration } from "@copilotkit/react-core/v2";

export function ToggleChatButton() {
  const config = useCopilotChatConfiguration();

  return (
    <button onClick={() => config.setModalOpen(!config.isModalOpen)}>
      {config.isModalOpen ? "Close chat" : "Open chat"}
    </button>
  );
}
