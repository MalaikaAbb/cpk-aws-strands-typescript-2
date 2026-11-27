"use client";
// The docs render <VoiceChat /> and describe (without code) a parent that drops the sample
// text into the composer's textarea via the native value setter + an `input` event.
// Kept from the demo (voice/voice-chat.tsx) in its simplest form: that injection, the docs'
// SampleAudioButton, and <CopilotChat />. Adaptation: agent "voice-demo" -> "voice".

import { CopilotChat } from "@copilotkit/react-core/v2";
import { SampleAudioButton } from "./sample-audio-button";

export function VoiceChat() {
  const handleTranscribed = (text: string) => {
    const textarea = document.querySelector<HTMLTextAreaElement>(
      '[data-testid="copilot-chat-textarea"]',
    );
    if (!textarea) return;
    Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set?.call(textarea, text);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
  };

  return (
    <div>
      <SampleAudioButton onTranscribed={handleTranscribed} sampleText="What is the weather in Tokyo?" />
      <CopilotChat agentId="voice" />
    </div>
  );
}
