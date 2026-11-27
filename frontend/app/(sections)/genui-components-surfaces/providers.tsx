"use client";
// Docs: surfaces -> "When a component fails" (React tab): the provider with `ui: shopUI` and
// `errorBoundary` ("Pass the same catalog that you gave the provider").
// Adaptations: runtimeUrl -> /api/copilotkit/genui-components-surfaces;
// agentId "genui-components-surfaces" (the docs use the implicit "default" agent).
import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { shopUI } from "./catalog";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKitProvider
      runtimeUrl="/api/copilotkit/genui-components-surfaces"
      agentId="genui-components-surfaces"
      generativeUI={{
        ui: shopUI,
        errorBoundary: {
          onError: (info) => console.warn(info.kind, info.surfaceId, info.error.message),
          fallback: ({ retry }) => <button onClick={retry}>Try again</button>,
        },
      }}
    >
      {children}
    </CopilotKitProvider>
  );
}
