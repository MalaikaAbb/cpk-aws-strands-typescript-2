"use client";
// Docs: headless-ui -> "Minimal example" (src/app/demos/headless-simple/chat.tsx).
// The two docs snippets (hooks + send, and the message-list `.map()`) are verbatim.
// Adaptation: agentId "headless-simple" -> "look-headless-ui".
// Demo code (showcase headless-simple/chat.tsx): the imports, the `Chat` function wrapper,
// the `visible` computation and `generateMessageId`.
// Harness (not in the docs): the plain <form> composer, so `send` can be exercised.

import { useState } from "react";
import { useAgent, useCopilotKit } from "@copilotkit/react-core/v2";

import { AssistantBubble, UserBubble } from "./message-bubble";

export function Chat() {
  // --- docs snippet 1 ---
  const { agent } = useAgent({ agentId: "look-headless-ui" });
  const { copilotkit } = useCopilotKit();
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || agent.isRunning) return;
    agent.addMessage({
      id: generateMessageId(),
      role: "user",
      content: trimmed,
    });
    setInput("");
    void copilotkit.runAgent({ agent }).catch((err) => {
      // The Headless Simple demo is the canonical "two hooks, your
      // design system" example users copy-paste as a starting point.
      // Silently swallowing errors here would model broken practice;
      // log so a network failure / runtime error / transport disconnect
      // surfaces in the console for the developer.
      console.error("[langgraph-python:headless-simple] runAgent failed", err);
    });
  };
  // --- end docs snippet 1 ---

  // Demo code: render only plain user/assistant text.
  const visible = agent.messages.flatMap((m) => {
    if (m.role !== "user" && m.role !== "assistant") return [];
    if (typeof m.content !== "string" || m.content.length === 0) return [];
    return [{ id: m.id, role: m.role, content: m.content }];
  });

  return (
    <div>
      {/* --- docs snippet 2 --- */}
      {visible.map((m) =>
        m.role === "user" ? (
          <UserBubble key={m.id} content={m.content} />
        ) : (
          <AssistantBubble key={m.id} content={m.content} />
        ),
      )}
      {/* --- end docs snippet 2 --- */}

      {/* Harness composer (not in the docs). */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit" disabled={!input.trim() || agent.isRunning}>
          Send
        </button>
      </form>
    </div>
  );
}

/**
 * Demo code (showcase headless-simple/chat.tsx).
 * Browser-friendly UUID. `crypto.randomUUID` is only defined in secure
 * contexts (https / localhost); the showcase harness serves over a bare
 * http origin, so we fall back to a math-based UUIDv4 there.
 */
function generateMessageId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
