"use client";
// Docs: quickstart -> "Configure CopilotKit Provider" (app/providers.tsx)
// Adaptations: runtimeUrl -> /api/copilotkit/look-reasoning-messages; agent -> "look-reasoning-messages".

import { CopilotKit } from "@copilotkit/react-core/v2";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/look-reasoning-messages" agent="look-reasoning-messages" useSingleEndpoint={false}>
      {children}
    </CopilotKit>
  );
}
