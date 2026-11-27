"use client";
// Docs: reasoning-messages -> "Render-Prop Children", verbatim.
// Adaptation: the docs' bare `<CopilotChat messageView=... />` is returned from this
// route's page component so it renders.

import {
  CopilotChatReasoningMessage,
} from "@copilotkit/react-core/v2";
import { CopilotChat } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

function MyReasoningLayout(props: React.ComponentProps<typeof CopilotChatReasoningMessage>) {
  return (
    <CopilotChatReasoningMessage {...props}>
      {({ header, toggle }) => (
        <div className="rounded-lg border bg-yellow-50 my-2">
          {header}
          {toggle}
        </div>
      )}
    </CopilotChatReasoningMessage>
  );
}

export default function Page() {
  return (
    <CopilotChat
      messageView={{
        reasoningMessage: MyReasoningLayout as typeof CopilotChatReasoningMessage,
      }}
    />
  );
}
