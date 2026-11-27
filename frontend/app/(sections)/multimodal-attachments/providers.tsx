"use client";
// Docs: quickstart -> "Configure CopilotKit Provider" (app/providers.tsx)
// Adaptations: runtimeUrl -> /api/copilotkit/multimodal-attachments; agent -> "multimodal-attachments".

import { CopilotKit } from "@copilotkit/react-core/v2";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/multimodal-attachments" agent="multimodal-attachments" useSingleEndpoint={false}>
      {children}
    </CopilotKit>
  );
}
