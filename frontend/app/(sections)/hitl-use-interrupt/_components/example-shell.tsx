"use client";
// Not from the docs: provider + chat for the reference-snippet sub-routes, so their hooks
// have an agent run to attach to.
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";

export function ExampleShell({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/hitl-use-interrupt" agent="hitl-use-interrupt">
      {children}
      <CopilotChat agentId="hitl-use-interrupt" />
    </CopilotKit>
  );
}
