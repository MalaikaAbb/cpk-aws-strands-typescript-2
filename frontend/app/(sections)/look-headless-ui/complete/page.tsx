"use client";
// Docs: headless-ui -> "Complete example". The docs give MessageList and the bubbles, but
// no chat shell that feeds MessageList. Harness (not in the docs): the smallest shell that
// passes `agent.messages` to MessageList and sends a message with the docs' own
// `useAgent` + `useCopilotKit().runAgent` pattern from the minimal example.

import { useState } from "react";
import { useAgent, useCopilotKit } from "@copilotkit/react-core/v2";
import { MessageList } from "../_components/headless-complete/chat/message-list";

export default function Page() {
  const { agent } = useAgent({ agentId: "look-headless-ui" });
  const { copilotkit } = useCopilotKit();
  const [input, setInput] = useState("");

  return (
    <div>
      <MessageList messages={agent.messages} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = input.trim();
          if (!trimmed || agent.isRunning) return;
          agent.addMessage({ id: crypto.randomUUID(), role: "user", content: trimmed });
          setInput("");
          void copilotkit.runAgent({ agent });
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
