"use client";
// Docs: custom-look-and-feel/markdown -> "Restyle the whole markdown block" (page.tsx), verbatim JSX.
// Added: the `CopilotChat` import and the default-export page wrapper.

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      messageView={{
        assistantMessage: { markdownRenderer: "text-sm leading-7" },
      }}
    />
  );
}
