"use client";
// Docs: markdown-mode -> "Turn it on" (React tab, app/providers.tsx).
// Adaptations: runtimeUrl -> /api/copilotkit/genui-components-markdown-mode; agentId="genui-components-markdown-mode" added
// (the docs use the default agent, "default"); the bare JSX snippet is wrapped in a
// Providers component, like quickstart's providers.tsx.
import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { standardUI } from "@copilotkit/react-core/v2/generative-ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKitProvider runtimeUrl="/api/copilotkit/genui-components-markdown-mode" agentId="genui-components-markdown-mode" generativeUI={{ ui: standardUI, transport: "markdown" }}>
      {children}
    </CopilotKitProvider>
  );
}
