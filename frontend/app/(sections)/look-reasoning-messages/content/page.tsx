"use client";
// Docs: reasoning-messages -> "Custom Content", verbatim.
// Adaptation: the docs' bare `<CopilotChat messageView=... />` is returned from this
// route's page component so it renders.
// Import added (the docs snippet has none): CopilotChat, as in the "Custom Header" snippet.

import { CopilotChat } from "@copilotkit/react-core/v2";

function CustomContent({
  isStreaming,
  hasContent,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  isStreaming?: boolean;
  hasContent?: boolean;
}) {
  if (!hasContent && !isStreaming) return null;

  return (
    <div className="px-4 pb-3 text-sm text-gray-500 font-mono" {...props}>
      {children}
      {isStreaming && <span className="animate-pulse ml-1">▊</span>}
    </div>
  );
}

export default function Page() {
  return (
    <CopilotChat
      messageView={{
        reasoningMessage: { contentView: CustomContent },
      }}
    />
  );
}
