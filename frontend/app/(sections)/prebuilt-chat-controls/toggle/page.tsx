"use client";
// Docs: chat-controls -> "To toggle, read `config.isModalOpen` and flip it", next to a
// prebuilt <CopilotSidebar />. Added: this minimal page that renders the two side by side.

import { CopilotSidebar } from "@copilotkit/react-core/v2";
import { ToggleChatButton } from "../_components/toggle-chat-button";

export default function Page() {
  return (
    <>
      <ToggleChatButton />
      <CopilotSidebar />
    </>
  );
}
