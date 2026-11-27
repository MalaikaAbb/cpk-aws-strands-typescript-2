"use client";
// Docs: tool-rendering -> "Grouping tool calls" (page.tsx): a custom renderer opting in to grouping.
// Host: the same minimal CopilotKit + Chat as the other sub-routes. `useDefaultRenderTool` import
// completed. `MyToolRow` is never defined by the docs and is not in the demo: left undefined.

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
  useDefaultRenderTool({ render: MyToolRow, group: true });

  return <CopilotChat agentId="genui-tool-rendering" />;
}
