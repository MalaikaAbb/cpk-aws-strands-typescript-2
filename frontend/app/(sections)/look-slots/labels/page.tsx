"use client";
// Docs: custom-look-and-feel/slots -> "Labels" (page.tsx), verbatim JSX.
// Added: the `CopilotChat` import and the default-export page wrapper.

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      labels={{
        chatInputPlaceholder: "Ask your agent anything...",
        welcomeMessageText: "How can I help you today?",
        chatDisclaimerText: "AI responses may be inaccurate.",
      }}
    />
  );
}
