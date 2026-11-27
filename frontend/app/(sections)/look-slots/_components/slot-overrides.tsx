// Docs: custom-look-and-feel/slots -> "What it looks like in code"
// (src/app/demos/chat-slots/slot-overrides.tsx). The three snippets on the page are one file shown
// cumulatively; this is the longest one (welcome screen + assistant message + disclaimer).
// Changes, see README:
// - The docs' three `declare const Custom...: React.ComponentType;` placeholders are replaced by an
//   import of the real components, copied from the demo (./slot-wrappers.tsx). `declare` emits no
//   code, so without this the names are undefined at runtime.
// - The docs' snippet stops before the end of the function. The closing
//   `return { welcomeScreen, messageView, input };` + `}` is from the demo's
//   chat-slots/slot-overrides.snippet.tsx.
import type {
  CopilotChatAssistantMessage,
  CopilotChatInput,
  CopilotChatView,
} from "@copilotkit/react-core/v2";
import {
  CustomWelcomeScreen,
  CustomAssistantMessage,
  CustomDisclaimer,
} from "./slot-wrappers";

export function ChatSlotsTeachingExtracts() {
  const welcomeScreen =
    CustomWelcomeScreen as unknown as typeof CopilotChatView.WelcomeScreen;

  const messageView = {
    assistantMessage:
      CustomAssistantMessage as unknown as typeof CopilotChatAssistantMessage,
  };

  const input = {
    disclaimer:
      CustomDisclaimer as unknown as typeof CopilotChatInput.Disclaimer,
  };

  return { welcomeScreen, messageView, input };
}
