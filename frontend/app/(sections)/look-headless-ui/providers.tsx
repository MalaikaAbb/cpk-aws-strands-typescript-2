"use client";
// Docs: quickstart -> "Configure CopilotKit Provider" (app/providers.tsx)
// Adaptations: runtimeUrl -> /api/copilotkit/look-headless-ui; agent -> "look-headless-ui".

import { CopilotKit } from "@copilotkit/react-core/v2";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/look-headless-ui" agent="look-headless-ui" useSingleEndpoint={false}>
      {children}
    </CopilotKit>
  );
}
