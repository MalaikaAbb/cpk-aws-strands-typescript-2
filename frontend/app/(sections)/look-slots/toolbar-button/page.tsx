"use client";
// Docs: custom-look-and-feel/slots -> "One toolbar button" (page.tsx), verbatim JSX.
// Added: the `CopilotChat` import and the default-export page wrapper.

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      messageView={{
        assistantMessage: {
          copyButton: ({ onClick }) => (
            <button onClick={onClick}>Copy</button>
          ),
        },
      }}
    />
  );
}
