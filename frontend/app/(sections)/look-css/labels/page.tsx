"use client";
// Docs: custom-look-and-feel/css -> "Custom Labels", verbatim.
// Added: the default-export page wrapper.

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      labels={{
        welcomeMessageText: "Hello! How can I help you today?",
        modalHeaderTitle: "My Copilot",
        chatInputPlaceholder: "Ask me anything!",
      }}
    />
  );
}
