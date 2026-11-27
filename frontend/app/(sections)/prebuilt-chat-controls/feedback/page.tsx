"use client";
// Docs: chat-controls -> "Capture message feedback (thumbs up / down)".
// Added: the default-export page wrapper. Changed (user request): the docs' undefined
// `analytics.track(...)` placeholder is replaced with `console.log(...)`, same arguments.

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      messageView={{
        assistantMessage: {
          onThumbsUp: (message) => {
            console.log("feedback", { messageId: message.id, value: "up" });
          },
          onThumbsDown: (message) => {
            console.log("feedback", { messageId: message.id, value: "down" });
          },
        },
      }}
    />
  );
}
