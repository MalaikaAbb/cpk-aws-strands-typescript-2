"use client";
// Docs: headless-ui -> "Minimal example" (src/app/demos/headless-simple/chat.tsx).
// The two docs snippets are verbatim. Adaptation: agentId "headless-simple" -> "look-headless-ui".
// Added (needed, not in the docs): the `Chat` wrapper + imports, `visible`, `generateMessageId`,
// and a plain input so `send` can be called.

import { useState } from "react";
import { useAgent, useCopilotKit } from "@copilotkit/react-core/v2";
import { AssistantBubble, UserBubble } from "./message-bubble";

const generateMessageId = () => crypto.randomUUID();

export function Chat() {
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

  const visible = agent.messages.flatMap((m) =>
    (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content
      ? [{ id: m.id, role: m.role, content: m.content }]
      : [],
  );

  return (
    <div>
      {visible.map((m) =>
        m.role === "user" ? (
          <UserBubble key={m.id} content={m.content} />
        ) : (
          <AssistantBubble key={m.id} content={m.content} />
        ),
      )}
      <form onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
