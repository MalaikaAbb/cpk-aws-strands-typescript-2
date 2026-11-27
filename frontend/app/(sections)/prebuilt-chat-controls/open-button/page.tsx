"use client";
// Docs: chat-controls -> "Programmatically open or close the chat": <OpenChatButton /> rendered
// "from anywhere inside the provider", next to a prebuilt <CopilotSidebar />.
// Added: this minimal page that renders the two side by side.

import { CopilotSidebar } from "@copilotkit/react-core/v2";
import { OpenChatButton } from "../_components/open-chat-button";

export default function Page() {
  return (
    <>
      <OpenChatButton />
      <CopilotSidebar />
    </>
  );
}
