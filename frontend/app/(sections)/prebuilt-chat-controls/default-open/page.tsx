"use client";
// Docs: chat-controls -> "set the **initial** open state declaratively", verbatim.
// Added: the default-export page wrapper.

import { CopilotSidebar } from "@copilotkit/react-core/v2";

export default function Page() {
  return <CopilotSidebar defaultOpen={false} />;
}
