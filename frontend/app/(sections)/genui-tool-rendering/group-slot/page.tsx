"use client";
// Docs: tool-rendering -> "Grouping tool calls" (page.tsx): replacing the `group` slot.
// Host: the same minimal CopilotKit + Chat as the other sub-routes, with the built-in default
// renderer (grouping only applies to calls it renders). `ToolTimeline` is "your component" and is
// never given by the docs or the demo: left undefined.

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
    // ToolTimeline: your component, given the group's `calls` and a `renderCall` function
    <CopilotChat
      messageView={{
        assistantMessage: { toolCallsView: { group: ToolTimeline } },
      }}
    />
  );
}
