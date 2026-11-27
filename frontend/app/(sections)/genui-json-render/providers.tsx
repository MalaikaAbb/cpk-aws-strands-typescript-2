"use client";
// The json-render page gives no provider. This is the quickstart provider (app/providers.tsx).
// Adaptations: runtimeUrl -> /api/copilotkit/genui-json-render; agent -> "genui-json-render".
import { CopilotKit } from "@copilotkit/react-core/v2";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/genui-json-render" agent="genui-json-render" useSingleEndpoint={false}>
      {children}
    </CopilotKit>
  );
}
