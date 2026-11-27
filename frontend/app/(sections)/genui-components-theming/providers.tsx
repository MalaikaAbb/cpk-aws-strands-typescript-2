"use client";
// Docs: theming -> "What is this?" (React tab): generativeUI with `ui: standardUI` and
// `theme`, plus the `dark` block of "Colors for each mode" (whose snippet repeats the same
// top-level accent), merged into the one `theme`.
// Not added: "The map" `mapStyle` fragment (placeholder tiles.example.com URLs); it is
// type-checked in _lib/map-theme.ts instead.
// Added import: `standardUI` (the snippet has no imports).
// Adaptations: runtimeUrl -> /api/copilotkit/genui-components-theming;
// agentId "genui-components-theming" (the docs use the implicit "default" agent).
import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { standardUI } from "@copilotkit/react-core/v2/generative-ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKitProvider
      runtimeUrl="/api/copilotkit/genui-components-theming"
      agentId="genui-components-theming"
      generativeUI={{
        ui: standardUI,
        theme: {
          "--a2ui-color-accent": "#d97706",
          "--a2ui-font-family": "Inter, sans-serif",
          "--a2ui-radius-md": "10px",
          dark: {
            "--a2ui-color-panel": "#1f2937",
            "--a2ui-color-surface": "#111827",
          },
        },
      }}
    >
      {children}
    </CopilotKitProvider>
  );
}
