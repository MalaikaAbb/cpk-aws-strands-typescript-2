"use client";
// Docs: human-in-the-loop/headless -> "Use useInterrupt without the chat" (HeadlessInterruptPanel).
// Added imports: useCopilotKit, useAgent, useInterrupt from "@copilotkit/react-core/v2" (the
// snippet has none). SLOTS moved to ../_lib/slots. Adaptation: agentId "interrupt-headless" ->
// "hitl-headless". The panel is rendered inside a provider-only shell (no chat).
import { useAgent, useCopilotKit, useInterrupt } from "@copilotkit/react-core/v2";
import { ProviderShell } from "../_components/provider-shell";
import { SLOTS } from "../_lib/slots";

function HeadlessInterruptPanel() {
  const { copilotkit } = useCopilotKit();
  const { agent } = useAgent({ agentId: "hitl-headless" });

  const kickOff = (prompt: string) => {
    agent.addMessage({ id: crypto.randomUUID(), role: "user", content: prompt });
    void copilotkit.runAgent({ agent });
  };

  const interruptElement = useInterrupt({
    renderInChat: false,
    render: ({ interrupt, resolve, cancel }) => (
      <div>
        <p>Pick a slot for {interrupt?.message ?? "a call"}:</p>
        {SLOTS.map((s) => (
          <button key={s.iso} onClick={() => resolve({ chosen_time: s.iso, chosen_label: s.label })}>
            {s.label}
          </button>
        ))}
        <button onClick={() => cancel()}>Cancel</button>
      </div>
    ),
  });

  if (interruptElement) {
    return interruptElement;
  }

  return <button onClick={() => kickOff("Book a call with sales.")}>Book call</button>;
}

export default function Page() {
  return (
    <ProviderShell>
      <HeadlessInterruptPanel />
    </ProviderShell>
  );
}
