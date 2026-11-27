"use client";
// Docs: custom-look-and-feel/slots -> "Two levels deep" (page.tsx), verbatim JSX.
// The docs give only the <CopilotChat> element. Added: the `CopilotChat` import, a minimal
// component around it, and the import of CustomUserMessage (copied from the demo).
// CustomToolbar and CustomCopyButton are defined neither by the docs nor by the demo, so they
// stay undefined (see README).

import { CopilotChat } from "@copilotkit/react-core/v2";
import { CustomUserMessage } from "./slot-wrappers";

export function Chat() {
  return (
    <CopilotChat
      messageView={{
        assistantMessage: {
          toolbar: CustomToolbar,
          copyButton: CustomCopyButton,
        },
        userMessage: CustomUserMessage,
      }}
    />
  );
}
