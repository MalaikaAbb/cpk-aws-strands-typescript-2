"use client";
// Docs: human-in-the-loop/headless -> "The same panel, built on the `useHeadlessInterrupt` hook
// from the snippet" (HeadlessInterruptPanelRaw).
// Added imports: useCopilotKit, useAgent from "@copilotkit/react-core/v2"; SLOTS from ../_lib/slots
// ("SLOTS is the list from the previous sample"). Adaptation: "interrupt-headless" -> "hitl-headless".
// LEFT BROKEN: `useHeadlessInterrupt` is not defined anywhere. The snippet it refers to shows
// `useInterrupt` for Strands instead, and the demo doesn't have the hook either.
import { useAgent, useCopilotKit } from "@copilotkit/react-core/v2";
import { ProviderShell } from "../_components/provider-shell";
import { SLOTS } from "../_lib/slots";

// SLOTS is the list from the previous sample.
function HeadlessInterruptPanelRaw() {
  const { copilotkit } = useCopilotKit();
  const { agent } = useAgent({ agentId: "hitl-headless" });
  const { pending, resolve } = useHeadlessInterrupt("hitl-headless");

  const kickOff = (prompt: string) => {
    agent.addMessage({ id: crypto.randomUUID(), role: "user", content: prompt });
    void copilotkit.runAgent({ agent });
  };

  if (pending) {
    return (
      <div>
        <p>Pick a slot for {pending.value.topic ?? "a call"}:</p>
        {SLOTS.map((s) => (
          <button key={s.iso} onClick={() => resolve({ chosen_time: s.iso, chosen_label: s.label })}>
            {s.label}
          </button>
        ))}
        <button onClick={() => resolve({ cancelled: true })}>Cancel</button>
      </div>
    );
  }

  return <button onClick={() => kickOff("Book a call with sales.")}>Book call</button>;
}

export default function Page() {
  return (
    <ProviderShell>
      <HeadlessInterruptPanelRaw />
    </ProviderShell>
  );
}
