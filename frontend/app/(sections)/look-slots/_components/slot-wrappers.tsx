// Demo code: only the slot components the docs reference, copied from
// showcase/integrations/strands-typescript/src/app/demos/chat-slots/slot-wrappers.tsx:
//   CustomWelcomeScreen (+ CustomWelcomeMessage, which it renders), CustomAssistantMessage,
//   CustomDisclaimer  -> used by the "What it looks like in code" snippet (slot-overrides.tsx)
//   CustomUserMessage -> used by the "Two levels deep" snippet (nested-chat.tsx)
// Imports trimmed to what these components use.
"use client";

import React from "react";
import {
  CopilotChatAssistantMessage,
  CopilotChatUserMessage,
} from "@copilotkit/react-core/v2";
import type {
  CopilotChatAssistantMessageProps,
  CopilotChatUserMessageProps,
} from "@copilotkit/react-core/v2";
import { SlotMarker } from "./slot-marker";

// =====================================================================
// welcomeScreen + welcomeScreen.welcomeMessage
// The welcomeScreen receives `input` and `suggestionView` as elements; we
// also expose the `welcomeMessage` sub-slot to show that slots can nest.
// =====================================================================
export function CustomWelcomeMessage(
  props: React.HTMLAttributes<HTMLDivElement>,
) {
  return (
    <SlotMarker color="violet" label="WelcomeScreen.WelcomeMessage">
      <div
        {...props}
        className="text-center px-4 py-3 text-sm text-muted-foreground"
        data-testid="custom-welcome-message"
      >
        Hover any region to see its slot path · click the badge to copy
      </div>
    </SlotMarker>
  );
}

export function CustomWelcomeScreen({
  input,
  suggestionView,
}: {
  input: React.ReactElement;
  suggestionView: React.ReactElement;
  welcomeMessage?: React.ReactElement;
}) {
  return (
    <SlotMarker color="indigo" label="WelcomeScreen" className="flex-1 m-3">
      <div
        data-testid="custom-welcome-screen"
        className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-4 w-full"
      >
        <CustomWelcomeMessage />
        <div className="w-full max-w-2xl">{input}</div>
        <div className="flex justify-center">{suggestionView}</div>
      </div>
    </SlotMarker>
  );
}

// =====================================================================
// messageView.assistantMessage
// =====================================================================
export function CustomAssistantMessage(
  props: CopilotChatAssistantMessageProps,
) {
  return (
    <SlotMarker
      color="emerald"
      label="MessageView.AssistantMessage"
      className="my-3"
    >
      <CopilotChatAssistantMessage {...props} />
    </SlotMarker>
  );
}

// =====================================================================
// messageView.userMessage
// =====================================================================
export function CustomUserMessage(props: CopilotChatUserMessageProps) {
  return (
    <SlotMarker
      color="sky"
      label="MessageView.UserMessage"
      className="my-3 ml-auto"
    >
      <CopilotChatUserMessage {...props} />
    </SlotMarker>
  );
}


// =====================================================================
// input.disclaimer
// =====================================================================
export function CustomDisclaimer(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <SlotMarker
      color="yellow"
      label="Input.Disclaimer"
      className="mx-auto my-1.5"
    >
      <div
        {...props}
        data-testid="custom-disclaimer"
        className="text-xs text-center text-muted-foreground px-2 py-1"
      >
        Custom disclaimer slot · stays visible in every input variant
      </div>
    </SlotMarker>
  );
}

