"use client";
// Docs: chat-controls -> "Capture message feedback (thumbs up / down)", verbatim.
// Added: the default-export page wrapper. `analytics` is not defined by the docs or the demo,
// so it is left undefined (see README).

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      messageView={{
        assistantMessage: {
          onThumbsUp: (message) => {
            analytics.track("feedback", { messageId: message.id, value: "up" });
          },
          onThumbsDown: (message) => {
            analytics.track("feedback", { messageId: message.id, value: "down" });
          },
        },
      }}
    />
  );
}
