"use client";
// Docs: tool-rendering -> "Per-tool renderers" (app/page.tsx).
// Adaptations: runtimeUrl -> /api/copilotkit/genui-tool-rendering; agent/agentId "default" ->
// "genui-tool-rendering"; "./tool-renderers" -> "./_components/tool-renderers".
// The provider stays in the page because the docs put it there.

import { CopilotChat, CopilotKit } from "@copilotkit/react-core/v2";
import { ToolRenderers } from "./_components/tool-renderers";

export default function Page() {
  return (
    // Use the agent name you registered on CopilotRuntime
    <CopilotKit runtimeUrl="/api/copilotkit/genui-tool-rendering" agent="genui-tool-rendering">
      <ToolRenderers />
      <CopilotChat agentId="genui-tool-rendering" />
    </CopilotKit>
  );
}
