"use client";
// Docs: quickstart -> "Configure CopilotKit Provider" (app/providers.tsx)
// Adaptations: runtimeUrl -> /api/copilotkit/frontend-tools; agent -> "frontend-tools".

import { CopilotKit } from "@copilotkit/react-core/v2";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/frontend-tools" agent="frontend-tools" useSingleEndpoint={false}>
      {children}
    </CopilotKit>
  );
}
