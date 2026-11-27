"use client";
// Docs: hashbrown -> chat.tsx (src/app/demos/declarative-hashbrown/chat.tsx), verbatim
// except: the `useByocHashbrownSuggestions()` call and its import are removed (demo suggestions).

import type { CopilotChatAssistantMessage } from "@copilotkit/react-core/v2";
import { CopilotChat } from "@copilotkit/react-core/v2";
import { HashBrownRenderMessage } from "./hashbrown-renderer";

export function Chat() {
  return (
    <CopilotChat
      className="h-full"
      messageView={{
        // The renderer reads only `message` from the slot props; cast to the
        // wider CopilotChatAssistantMessage signature to satisfy the slot type.
        assistantMessage:
          HashBrownRenderMessage as unknown as typeof CopilotChatAssistantMessage,
      }}
    />
  );
}
