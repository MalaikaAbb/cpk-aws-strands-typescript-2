"use client";
// Not from the docs: the headless panels need a CopilotKit provider to run in
// (the docs say "No chat needs to be mounted", so there is no chat here).
import { CopilotKit } from "@copilotkit/react-core/v2";

export function ProviderShell({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/hitl-headless" agent="hitl-headless">
      {children}
    </CopilotKit>
  );
}
