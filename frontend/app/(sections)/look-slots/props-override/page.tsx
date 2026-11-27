"use client";
// Docs: custom-look-and-feel/slots -> "Props Override" (page.tsx), verbatim JSX.
// Added: the `CopilotChat` import and the default-export page wrapper.

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      messageView={{
        className: "my-custom-messages",
        "data-testid": "message-view",
      }}
      input={{ autoFocus: true }}
    />
  );
}
