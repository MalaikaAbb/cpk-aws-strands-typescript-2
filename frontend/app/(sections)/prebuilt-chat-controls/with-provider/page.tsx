"use client";
// Docs: chat-controls -> callout "To open the chat from a button outside it, ... wrap the button
// and the chat in one `<CopilotChatConfigurationProvider isModalDefaultOpen={false}>`."
// The docs give this only as prose. Added: this minimal page that does exactly that, with
// the docs' OpenChatButton and toggle button.

import {
  CopilotChatConfigurationProvider,
  CopilotSidebar,
} from "@copilotkit/react-core/v2";
import { OpenChatButton } from "../_components/open-chat-button";
import { ToggleChatButton } from "../_components/toggle-chat-button";

export default function Page() {
  return (
    <CopilotChatConfigurationProvider isModalDefaultOpen={false}>
      <OpenChatButton />
      <ToggleChatButton />
      <CopilotSidebar />
    </CopilotChatConfigurationProvider>
  );
}
