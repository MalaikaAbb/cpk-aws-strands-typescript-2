"use client";
// Docs: from-a2ui -> "Before and after" ("After", React tab):
//   <CopilotKitProvider runtimeUrl="/api/copilotkit" generativeUI={{ ui: appUI }}>
// Adaptations: runtimeUrl -> /api/copilotkit/genui-components-from-a2ui; agentId="genui-components-from-a2ui" added (the docs use
// the default agent); the snippet is wrapped in a Providers component like quickstart's.
import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { appUI } from "./_lib/app-ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKitProvider runtimeUrl="/api/copilotkit/genui-components-from-a2ui" agentId="genui-components-from-a2ui" generativeUI={{ ui: appUI }}>
      {children}
    </CopilotKitProvider>
  );
}
