"use client";
// Docs: standard-catalog -> "Use it as it is" (React tab): generativeUI={{ ui: standardUI }}.
// Adaptations: runtimeUrl -> /api/copilotkit/genui-components-standard-catalog;
// agentId "genui-components-standard-catalog" (the docs use the implicit "default" agent).
// Structural addition: the page has several independent catalogs, each its own sub-route,
// so the provider picks the catalog by route: /omit -> "Drop components" appUI,
// /overrides -> "Replace a component" appUI, otherwise standardUI.
import { usePathname } from "next/navigation";
import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { standardUI } from "@copilotkit/react-core/v2/generative-ui";
import { appUI as omitUI } from "./_lib/omit-ui";
import { appUI as overridesUI } from "./_lib/overrides-ui";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const ui = pathname.endsWith("/omit") ? omitUI : pathname.endsWith("/overrides") ? overridesUI : standardUI;
  return (
    <CopilotKitProvider key={pathname} runtimeUrl="/api/copilotkit/genui-components-standard-catalog" agentId="genui-components-standard-catalog" generativeUI={{ ui }}>
      {children}
    </CopilotKitProvider>
  );
}
