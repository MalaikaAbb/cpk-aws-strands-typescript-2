"use client";
// Docs: tool-rendering -> "Custom catch-all" (src/app/demos/tool-rendering-custom-catchall/page.tsx).
// The docs give only the hook call. Host (CopilotKit + Chat + CopilotChat) and imports: from the
// same demo page, minus its layout divs and suggestions. Adaptations: runtimeUrl + agent ->
// genui-tool-rendering; renderer import path -> ../_components/custom-catchall-renderer.

import React from "react";
import {
  CopilotKit,
  CopilotChat,
  useDefaultRenderTool,
} from "@copilotkit/react-core/v2";
import { CustomCatchallRenderer } from "../_components/custom-catchall-renderer";
import type { CatchallToolStatus } from "../_components/custom-catchall-renderer";

export default function ToolRenderingCustomCatchallDemo() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/genui-tool-rendering" agent="genui-tool-rendering">
      <Chat />
    </CopilotKit>
  );
}

function Chat() {
  // `useDefaultRenderTool` is a convenience wrapper around
  // `useRenderTool({ name: "*", ... })` — a single wildcard renderer
  // that handles every tool call not claimed by a named renderer.
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
