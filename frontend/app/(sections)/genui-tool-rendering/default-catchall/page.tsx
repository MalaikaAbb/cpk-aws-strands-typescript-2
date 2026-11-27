"use client";
// Docs: tool-rendering -> "Default tool rendering (zero-config)". The docs give only the hook call;
// minimal host: <CopilotKit> -> Chat -> <CopilotChat>. Adaptation: runtimeUrl + agent -> genui-tool-rendering.

import {
  CopilotKit,
  CopilotChat,
  useDefaultRenderTool,
} from "@copilotkit/react-core/v2";

export default function ToolRenderingDefaultCatchallDemo() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/genui-tool-rendering" agent="genui-tool-rendering">
      <Chat />
    </CopilotKit>
  );
}

function Chat() {
  // Opt in to CopilotKit's built-in default tool-call card. Called with
  // no config so the package-provided `DefaultToolCallRenderer` is used
  // as the wildcard renderer — this is the "out-of-the-box" UI the cell
  // is meant to showcase.
  useDefaultRenderTool();

  return <CopilotChat agentId="genui-tool-rendering" />;
}
