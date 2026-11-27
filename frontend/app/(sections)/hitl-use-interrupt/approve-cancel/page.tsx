"use client";
// Docs: human-in-the-loop/useInterrupt -> "Approve / Cancel example". `ApprovalInterrupt` is
// verbatim (no agentId, so it uses the provider's agent). Added import: useInterrupt.
// Rendered in the minimal ExampleShell.
import { useInterrupt } from "@copilotkit/react-core/v2";
import { ExampleShell } from "../_components/example-shell";

function ApprovalInterrupt() {
  useInterrupt({
    render: ({ interrupt, resolve, cancel }) => (
      <div className="p-3 border rounded">
        <p>{interrupt?.message ?? "Approve this action?"}</p>
        <div className="mt-2 flex gap-2">
          <button onClick={() => resolve({ approved: true })}>Approve</button>
          <button onClick={() => cancel()}>Cancel</button>
        </div>
      </div>
    ),
  });
  return null;
}

export default function Page() {
  return (
    <ExampleShell>
      <ApprovalInterrupt />
    </ExampleShell>
  );
}
