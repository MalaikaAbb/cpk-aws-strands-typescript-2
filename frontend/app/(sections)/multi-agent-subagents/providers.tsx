"use client";
// Docs: quickstart -> "Configure CopilotKit Provider" (the sub-agents page uses the provider without showing it) (app/providers.tsx)
// Adaptations: runtimeUrl -> /api/copilotkit/multi-agent-subagents; agent -> "multi-agent-subagents".

import { CopilotKit } from "@copilotkit/react-core/v2";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/multi-agent-subagents" agent="multi-agent-subagents" useSingleEndpoint={false}>
      {children}
    </CopilotKit>
  );
}
