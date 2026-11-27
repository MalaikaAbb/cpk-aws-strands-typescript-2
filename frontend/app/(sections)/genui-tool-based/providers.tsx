"use client";
// Docs: quickstart -> "Configure CopilotKit Provider" (app/providers.tsx)
// Adaptations: runtimeUrl -> /api/copilotkit/genui-tool-based; agent -> "genui-tool-based".

import { CopilotKit } from "@copilotkit/react-core/v2";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/genui-tool-based" agent="genui-tool-based" useSingleEndpoint={false}>
      {children}
    </CopilotKit>
  );
}
