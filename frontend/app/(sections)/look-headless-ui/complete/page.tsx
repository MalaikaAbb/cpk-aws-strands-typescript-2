"use client";
// Docs: headless-ui -> "Complete example". The docs give MessageList and the bubbles but no
// shell that feeds it. Added (needed): pass `agent.messages` to MessageList and a plain input
// that sends with the docs' `addMessage` + `runAgent` pattern.

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
          agent.addMessage({ id: crypto.randomUUID(), role: "user", content: input });
          setInput("");
          void copilotkit.runAgent({ agent });
        }}
      >
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
