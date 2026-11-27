"use client";
// Docs: multi-agent/subagents gives no page, only the prose of "Rendering a live delegation log":
// "Subscribe with useAgent({ updates: [UseAgentUpdate.OnStateChanged,
// UseAgentUpdate.OnRunStatusChanged] }), read agent.state.delegations, and render one card per
// entry." This minimal page does exactly that, next to a chat to talk to the supervisor.
import {
  CopilotChat,
  useAgent,
  UseAgentUpdate,
} from "@copilotkit/react-core/v2";
import { DelegationLog } from "./_components/delegation-log";
import type { Delegation } from "./_components/delegation-log";

export default function Page() {
  const { agent } = useAgent({
    agentId: "multi-agent-subagents",
    updates: [UseAgentUpdate.OnStateChanged, UseAgentUpdate.OnRunStatusChanged],
  });
  const delegations =
    (agent.state as { delegations?: Delegation[] } | undefined)?.delegations ?? [];

  return (
    <main className="grid h-screen grid-cols-2 gap-4 p-4">
      <DelegationLog delegations={delegations} isRunning={agent.isRunning} />
      <CopilotChat agentId="multi-agent-subagents" className="h-full" />
    </main>
  );
}
