"use client";
// Docs: the page gives no provider code -> quickstart "Configure CopilotKit Provider" (app/providers.tsx)
// Adaptations: runtimeUrl -> /api/copilotkit/look-css; agent -> "look-css".

import { CopilotKit } from "@copilotkit/react-core/v2";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/look-css" agent="look-css" useSingleEndpoint={false}>
      {children}
    </CopilotKit>
  );
}
