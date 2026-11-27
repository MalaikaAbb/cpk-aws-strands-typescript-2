"use client";
// Docs: catalogs -> "Then give it to the provider" (React tab).
// Adaptations: runtimeUrl -> /api/copilotkit/genui-components-catalogs;
// agentId "genui-components-catalogs" (the docs use the implicit "default" agent).
import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { shopUI } from "./catalog";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKitProvider runtimeUrl="/api/copilotkit/genui-components-catalogs" agentId="genui-components-catalogs" generativeUI={{ ui: shopUI }}>
      {children}
    </CopilotKitProvider>
  );
}
