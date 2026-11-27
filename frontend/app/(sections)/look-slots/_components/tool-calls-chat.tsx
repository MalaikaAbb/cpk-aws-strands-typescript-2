"use client";
// Docs: custom-look-and-feel/slots -> "Tool calls" (page.tsx), verbatim.
// Moved to _components/ (rendered by tool-calls/page.tsx).

import {
  CopilotChat,
  CopilotChatToolCallsView,
  type CopilotChatToolCallsViewProps,
} from "@copilotkit/react-core/v2";

const CustomToolCallsView = (props: CopilotChatToolCallsViewProps) => (
  <div className="rounded-lg border border-dashed p-2">
    <CopilotChatToolCallsView {...props} />
  </div>
);

export function Chat() {
  return (
    <CopilotChat
      messageView={{
        assistantMessage: { toolCallsView: CustomToolCallsView },
      }}
    />
  );
}
