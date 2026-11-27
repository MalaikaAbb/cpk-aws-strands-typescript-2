"use client";
// Docs: quickstart -> "Configure CopilotKit Provider" (the governed-actions page uses the provider without showing it) (app/providers.tsx)
// Adaptations: runtimeUrl -> /api/copilotkit/hitl-governed-actions; agent -> "hitl-governed-actions".

import { CopilotKit } from "@copilotkit/react-core/v2";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/hitl-governed-actions" agent="hitl-governed-actions" useSingleEndpoint={false}>
      {children}
    </CopilotKit>
  );
}
