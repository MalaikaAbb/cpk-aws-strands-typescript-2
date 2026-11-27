"use client";
// Provider as in generative-ui/components/catalogs ("Then give it to the provider"):
// generativeUI={{ ui: shopUI }}. The state-and-actions page shows no provider.
// Adaptations: runtimeUrl -> /api/copilotkit/genui-components-state-and-actions;
// agentId "genui-components-state-and-actions" (the docs use the implicit "default" agent).
import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { shopUI } from "./catalog";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKitProvider runtimeUrl="/api/copilotkit/genui-components-state-and-actions" agentId="genui-components-state-and-actions" generativeUI={{ ui: shopUI }}>
      {children}
    </CopilotKitProvider>
  );
}
