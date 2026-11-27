"use client";
// Docs: custom-look-and-feel/markdown -> "Replace the renderer" (page.tsx), verbatim.
// Added: the `CopilotChat` import and the default-export page wrapper around the docs' JSX.

import { CopilotChat } from "@copilotkit/react-core/v2";

const PlainText = ({ content }: { content: string }) => (
  <pre className="whitespace-pre-wrap">{content}</pre>
);

export default function Page() {
  return (
    <CopilotChat
      messageView={{ assistantMessage: { markdownRenderer: PlainText } }}
    />
  );
}
