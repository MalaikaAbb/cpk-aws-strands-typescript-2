"use client";
// Docs: json-render -> chat.tsx (src/app/demos/declarative-json-render/chat.tsx), verbatim except: the `useByocJsonRenderSuggestions()` call and its import are removed (demo suggestions); AGENT_ID "byoc_json_render" -> "genui-json-render".

import type { CopilotChatAssistantMessage } from "@copilotkit/react-core/v2";
import { CopilotChat } from "@copilotkit/react-core/v2";
import { JsonRenderAssistantMessage } from "./json-render-renderer";

export const AGENT_ID = "genui-json-render";

export function Chat() {
  return (
    <CopilotChat
      agentId={AGENT_ID}
      className="h-full rounded-2xl"
      messageView={{
        assistantMessage:
          JsonRenderAssistantMessage as unknown as typeof CopilotChatAssistantMessage,
      }}
    />
  );
}
