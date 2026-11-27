"use client";
// Docs: transports, React tabs. Three provider configs, one per sub-route:
// - /                  "Tool transport":    generativeUI={{ ui: standardUI }}
// - /markdown          "Markdown transport": generativeUI={{ ui: standardUI, transport: "markdown" }}
// - /agent-ids         "Only some agents":   generativeUI={{ ui: standardUI, agentIds: ["shop"] }}
// Adaptations: runtimeUrl -> /api/copilotkit/genui-components-transports; agentId
// "genui-components-transports" (the docs use the implicit "default" agent), and
// agentIds ["shop"] -> ["genui-components-transports"].
// Structural addition: the config is picked by pathname, and the provider is keyed by it.
import { usePathname } from "next/navigation";
import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { standardUI } from "@copilotkit/react-core/v2/generative-ui";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const runtimeUrl = "/api/copilotkit/genui-components-transports";
  const agentId = "genui-components-transports";
  if (pathname.endsWith("/markdown")) {
    return (
      <CopilotKitProvider key={pathname} agentId={agentId} runtimeUrl={runtimeUrl} generativeUI={{ ui: standardUI, transport: "markdown" }}>
        {children}
      </CopilotKitProvider>
    );
  }
  if (pathname.endsWith("/agent-ids")) {
    return (
      <CopilotKitProvider
        key={pathname}
        agentId={agentId}
        runtimeUrl={runtimeUrl}
        generativeUI={{ ui: standardUI, agentIds: ["genui-components-transports"] }}
      >
        {children}
      </CopilotKitProvider>
    );
  }
  return (
    <CopilotKitProvider key={pathname} agentId={agentId} runtimeUrl={runtimeUrl} generativeUI={{ ui: standardUI }}>
      {children}
    </CopilotKitProvider>
  );
}
