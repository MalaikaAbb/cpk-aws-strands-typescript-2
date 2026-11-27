"use client";
// Docs: human-in-the-loop/useInterrupt -> "Multiple interrupts? Add a type and gate with `enabled`".
// The docs give bare hook calls: they are wrapped in a component (MultipleInterrupts) and rendered
// in the minimal ExampleShell. Adaptation: agentId "gen-ui-interrupt" -> "hitl-use-interrupt".
// Added import: useInterrupt. LEFT BROKEN: `AskCard` and `ApproveCard` are not defined in the
// docs or the demo.
import { useInterrupt } from "@copilotkit/react-core/v2";
import { ExampleShell } from "../_components/example-shell";

function MultipleInterrupts() {
  // The LangGraph adapter sends `event.value` as a JSON string.
  const readValue = (value: unknown) =>
    typeof value === "string" ? JSON.parse(value) : value;

  useInterrupt({
    agentId: "hitl-use-interrupt",
    enabled: (event) => readValue(event.value).type === "ask",
    render: ({ event, resolve }) => (
      <AskCard question={readValue(event.value).content} onAnswer={resolve} />
    ),
  });

  useInterrupt({
    agentId: "hitl-use-interrupt",
    enabled: (event) => readValue(event.value).type === "approval",
    render: ({ event, resolve }) => (
      <ApproveCard content={readValue(event.value).content} onAnswer={resolve} />
    ),
  });

  return null;
}

export default function Page() {
  return (
    <ExampleShell>
      <MultipleInterrupts />
    </ExampleShell>
  );
}
