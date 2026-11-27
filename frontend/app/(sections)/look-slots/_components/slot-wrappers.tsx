"use client";
// The slot components the docs use but never define. Based on the demo's chat-slots/slot-wrappers.tsx,
// reduced to plain JSX with a text label so you can see each override.

import React from "react";
import {
  CopilotChatAssistantMessage,
  CopilotChatUserMessage,
  type CopilotChatAssistantMessageProps,
  type CopilotChatUserMessageProps,
} from "@copilotkit/react-core/v2";

export function CustomWelcomeScreen({
  input,
  suggestionView,
}: {
  input: React.ReactElement;
  suggestionView: React.ReactElement;
}) {
  return (
    <div>
      <p>Custom welcome screen</p>
      {input}
      {suggestionView}
    </div>
  );
}

export function CustomAssistantMessage(props: CopilotChatAssistantMessageProps) {
  return (
    <div>
      <small>Custom assistant message</small>
      <CopilotChatAssistantMessage {...props} />
    </div>
  );
}

export function CustomUserMessage(props: CopilotChatUserMessageProps) {
  return (
    <div>
      <small>Custom user message</small>
      <CopilotChatUserMessage {...props} />
    </div>
  );
}

export function CustomDisclaimer(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props}>Custom disclaimer</div>;
}
