"use client";
// Docs: custom-look-and-feel/slots -> "Custom Components" (page.tsx), verbatim.
// Moved to _components/ (rendered by custom-components/page.tsx).

import {
  CopilotChat,
  CopilotChatMessageView,
  type CopilotChatMessageViewProps,
} from "@copilotkit/react-core/v2";

const CustomMessageView = ({ messages, isRunning }: CopilotChatMessageViewProps) => (
  <div className="space-y-4 p-6">
    {messages?.map((msg) => (
      <div key={msg.id} className={msg.role === "user" ? "text-right" : "text-left"}>
        {typeof msg.content === "string" ? msg.content : null}
      </div>
    ))}
    {isRunning && <div className="animate-pulse">Thinking...</div>}
  </div>
);

export function Chat() {
  return <CopilotChat messageView={CustomMessageView as typeof CopilotChatMessageView} />;
}
