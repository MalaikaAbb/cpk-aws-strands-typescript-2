"use client";
// Docs: human-in-the-loop/useInterrupt -> "Multi-interrupt behavior".
// The docs give a bare hook call: it is wrapped in a component (MultiInterrupt) and rendered
// in the minimal ExampleShell. Added import: useInterrupt.
import { useInterrupt } from "@copilotkit/react-core/v2";
import { ExampleShell } from "../_components/example-shell";

function MultiInterrupt() {
  useInterrupt({
    render: ({ interrupts, resolve, cancel }) => (
      <ul>
        {interrupts.map((i) => (
          <li key={i.id}>
            {i.message}
            <button onClick={() => resolve({ ok: true }, i.id)}>Approve</button>
            <button onClick={() => cancel(i.id)}>Cancel</button>
          </li>
        ))}
      </ul>
    ),
  });

  return null;
}

export default function Page() {
  return (
    <ExampleShell>
      <MultiInterrupt />
    </ExampleShell>
  );
}
