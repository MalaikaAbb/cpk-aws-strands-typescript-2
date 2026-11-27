"use client";
// Docs: tool-rendering -> "Per-tool renderers compose with a catch-all"
// (src/app/demos/tool-rendering/page.tsx). The docs give only the hook call; it is combined here
// with the docs' <ToolRenderers /> (named renderers) under the same provider as app/page.tsx.
// Host + imports: from the demo page, minus layout divs, suggestions and its extra stock/d20 renderers.

import React from "react";
import {
  CopilotKit,
  CopilotChat,
  useDefaultRenderTool,
} from "@copilotkit/react-core/v2";
import { ToolRenderers } from "../_components/tool-renderers";
import { CustomCatchallRenderer } from "../_components/custom-catchall-renderer";
import type { CatchallToolStatus } from "../_components/custom-catchall-renderer";

export default function ToolRenderingDemo() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/genui-tool-rendering" agent="genui-tool-rendering">
      <ToolRenderers />
      <Chat />
    </CopilotKit>
  );
}

function Chat() {
  // Wildcard catch-all for anything that doesn't match a per-tool
  // renderer above.
  useDefaultRenderTool(
    {
      render: ({ name, parameters, status, result }) => (
        <CustomCatchallRenderer
          name={name}
          parameters={parameters}
          status={status as CatchallToolStatus}
          result={result}
        />
      ),
    },
    [],
  );

  return <CopilotChat agentId="genui-tool-rendering" />;
}
