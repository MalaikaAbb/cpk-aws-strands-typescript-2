"use client";
// Docs: reasoning-messages -> "Custom Header", verbatim.
// Adaptation: the docs' bare `<CopilotChat messageView=... />` is returned from this
// route's page component so it renders.

import { CopilotChat } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

function CustomHeader({
  isOpen,
  label,
  hasContent,
  isStreaming,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isOpen?: boolean;
  label?: string;
  hasContent?: boolean;
  isStreaming?: boolean;
}) {
  return (
    <button
      className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium"
      {...props}
    >
      {isStreaming ? "🧠" : "💡"}
      <span>{label}</span>
      {hasContent && (
        <span className="ml-auto text-xs">{isOpen ? "Hide" : "Show"}</span>
      )}
    </button>
  );
}

export default function Page() {
  return (
    <CopilotChat
      messageView={{
        reasoningMessage: { header: CustomHeader },
      }}
    />
  );
}
