"use client";
// Docs: headless-ui -> "The MessageList component" + "Per-role dispatch" + "Tool-call composition"
// (src/app/demos/headless-complete/chat/message-list.tsx). The hook block and the
// `messages.map` block are verbatim from the docs ("Tool-call composition" is the inner
// part of "Per-role dispatch").
// Demo code (showcase headless-complete/chat/message-list.tsx): the imports and the
// `MessageList({ messages })` function signature / fragment wrapper. Paths adjusted:
// the docs put UserBubble in message-assistant.tsx, so it is imported from there.

import React, { useMemo } from "react";
import {
  useRenderActivityMessage,
  useRenderToolCall,
} from "@copilotkit/react-core/v2";
import type { Message, ToolMessage } from "@copilotkit/shared";
import { ActivityWrapper } from "./message-activity";
import { AssistantBubble, UserBubble } from "./message-assistant";

export function MessageList({ messages }: { messages: Message[] }) {
  const renderToolCall = useRenderToolCall();
  const { renderActivityMessage } = useRenderActivityMessage();

  // Index tool results by their originating tool-call id so each tool-call
  // card can hand the matching ToolMessage to `useRenderToolCall`.
  // Without this the renderer can't see a result and the card stays in the
  // "in-progress" state forever.
  const toolMessagesByCallId = useMemo(() => {
    const map = new Map<string, ToolMessage>();
    for (const m of messages) {
      if (m.role === "tool" && "toolCallId" in m && m.toolCallId) {
        map.set(m.toolCallId, m as ToolMessage);
      }
    }
    return map;
  }, [messages]);

  return (
    <>
      {messages.map((m) => {
        if (m.role === "user") {
          // Cast through the local input shape — UserBubble accepts a
          // simplified version of the ag-ui content union.
          return (
            <UserBubble
              key={m.id}
              content={m.content as Parameters<typeof UserBubble>[0]["content"]}
            />
          );
        }

        if (m.role === "assistant") {
          const toolCalls =
            "toolCalls" in m && Array.isArray(m.toolCalls) ? m.toolCalls : [];
          return (
            <AssistantBubble
              key={m.id}
              content={typeof m.content === "string" ? m.content : undefined}
            >
              {toolCalls.map((tc) => {
                const toolMessage = toolMessagesByCallId.get(tc.id);
                const node = renderToolCall({
                  toolCall: tc,
                  toolMessage,
                });
                return node ? <div key={tc.id}>{node}</div> : null;
              })}
            </AssistantBubble>
          );
        }

        if (m.role === "activity") {
          const node = renderActivityMessage(m);
          if (!node) return null;
          return <ActivityWrapper key={m.id}>{node}</ActivityWrapper>;
        }

        return null;
      })}
    </>
  );
}
