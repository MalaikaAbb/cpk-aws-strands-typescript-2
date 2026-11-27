"use client";
// Docs: generative-ui/components -> "Turn on generative UI" (app/providers.tsx, React tab).
// Adaptations: runtimeUrl -> /api/copilotkit/genui-components; agentId "genui-components" (the docs use the implicit
// "default" agent).
import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { standardUI } from "@copilotkit/react-core/v2/generative-ui";
import "@copilotkit/react-core/v2/styles.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKitProvider runtimeUrl="/api/copilotkit/genui-components" agentId="genui-components" generativeUI={{ ui: standardUI }}>
      {children}
    </CopilotKitProvider>
  );
}
