"use client";
// Docs: intelligence/quickstart -> "Connect your frontend" (Your CopilotKit provider).
// Adaptations: runtimeUrl -> /api/copilotkit/headless-threads; agentId="headless-threads" added
// (the docs' <CopilotChat> passes no agent, so it would resolve to "default").

import { CopilotKitProvider } from "@copilotkit/react-core/v2";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKitProvider
      runtimeUrl="/api/copilotkit/headless-threads"
      agentId="headless-threads"
      useSingleEndpoint={false}
    >
      {children}
    </CopilotKitProvider>
  );
}
