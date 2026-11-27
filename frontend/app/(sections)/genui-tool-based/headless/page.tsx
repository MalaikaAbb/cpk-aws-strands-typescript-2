"use client";
// Docs: generative-ui/tool-based -> "Rendering in a headless chat": the
// `CopilotChatToolCallsView` import and the `<CopilotChatToolCallsView message={assistantMessage}
// messages={allMessages} />` element, verbatim.
// Harness (not in the docs or the demo): a minimal headless chat, so the element has an
// assistant message to render. `assistantMessage` is each assistant message in
// `agent.messages`, and `allMessages` is `agent.messages`. It registers the same
// `render_bar_chart` component as the main route, and sends with `addMessage` + `runAgent`
// (the pattern from the Headless UI docs page).

import { useState } from "react";
import {
  useAgent,
  useComponent,
  useCopilotKit,
} from "@copilotkit/react-core/v2";
import { CopilotChatToolCallsView } from "@copilotkit/react-core/v2";
import { BarChart, barChartPropsSchema } from "../_components/bar-chart";

export default function Page() {
  useComponent({
    name: "render_bar_chart",
    description: "Display a bar chart with labeled numeric values.",
    parameters: barChartPropsSchema,
    render: BarChart,
  });

  const { agent } = useAgent({ agentId: "genui-tool-based" });
  const { copilotkit } = useCopilotKit();
  const [input, setInput] = useState("");
  const allMessages = agent.messages;

  return (
    <div>
      {allMessages.map((m) => {
        if (m.role === "user") {
          return <p key={m.id}>{typeof m.content === "string" ? m.content : ""}</p>;
        }
        if (m.role === "assistant") {
          const assistantMessage = m;
          return (
            <div key={m.id}>
              {typeof m.content === "string" && <p>{m.content}</p>}
              <CopilotChatToolCallsView message={assistantMessage} messages={allMessages} />
            </div>
          );
        }
        return null;
      })}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const trimmed = input.trim();
          if (!trimmed) return;
          agent.addMessage({ id: crypto.randomUUID(), role: "user", content: trimmed });
          setInput("");
          void copilotkit.runAgent({ agent });
        }}
      >
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
