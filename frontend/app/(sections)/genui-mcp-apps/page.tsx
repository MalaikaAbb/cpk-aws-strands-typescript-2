"use client";
// Docs: mcp-apps -> "No frontend renderer needed" (src/app/demos/mcp-apps/page.tsx). The provider stays
// in the page, as the docs show it. "The demo's Chat component renders <CopilotChat agentId="mcp-apps" />
// ... In your app, render <CopilotChat /> in its place." -> <CopilotChat />.
// Adaptations: runtimeUrl -> /api/copilotkit/genui-mcp-apps; agent -> "genui-mcp-apps".
// From the demo (same file): "use client", the imports and the component wrapper, which the docs
// snippet (a function body only) leaves out.
import React from "react";
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";

export default function MCPAppsDemo() {
  // No `renderActivityMessages`, no `useRenderActivityMessage` — the
  // CopilotKitProvider auto-registers the built-in `MCPAppsActivityRenderer`
  // for the "mcp-apps" activity type. A plain <CopilotChat /> is enough.
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/genui-mcp-apps" agent="genui-mcp-apps">
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-full w-full max-w-4xl">
          <CopilotChat />
        </div>
      </div>
    </CopilotKit>
  );
}
