"use client";
// Docs: tool-rendering -> "Grouping tool calls" (page.tsx): `toolCallDisplay` on the message view.
// Host: the same minimal CopilotKit + Chat as the other sub-routes. The docs say grouping applies to
// calls rendered by the built-in card from `useDefaultRenderTool()`, so that zero-config call
// (from "Default tool rendering") is included; without it no tool call renders at all.

import {
  CopilotKit,
  CopilotChat,
  useDefaultRenderTool,
} from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/genui-tool-rendering" agent="genui-tool-rendering">
      <Chat />
    </CopilotKit>
  );
}

function Chat() {
  useDefaultRenderTool();

  return (
    // "grouped" (default) | "line" | "stacked" | "turn" | "separate"
    <CopilotChat messageView={{ toolCallDisplay: "line" }} />
  );
}
