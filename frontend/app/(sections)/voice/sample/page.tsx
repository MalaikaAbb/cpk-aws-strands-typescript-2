"use client";
// Docs: voice -> "Frontend" (src/app/demos/voice/page.tsx), verbatim, rendering the demo's
// <VoiceChat /> (which uses the docs' SampleAudioButton from "Driving the demo without a mic").
// Adaptations: runtimeUrl "/api/copilotkit-voice" -> "/api/copilotkit/voice";
// agent "voice-demo" -> "voice"; "./voice-chat" -> "../_components/voice-chat".

import { CopilotKit } from "@copilotkit/react-core/v2";
import { VoiceChat } from "../_components/voice-chat";

export default function VoiceDemoPage() {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit/voice"
      agent="voice"
      useSingleEndpoint={false}
      // The dev-only `<cpk-web-inspector>` overlay (auto-enabled on
      // localhost via shouldShowDevConsole) intercepts pointer events
      // on top of the voice sample-audio button, so dev/D5 probe runs
      // can't click it through Playwright. Production isn't localhost
      // so the inspector never mounts there — voice is D5 in prod and
      // D4 locally for this reason alone. Disable explicitly here so
      // the demo behaves the same in both environments.
      enableInspector={false}
    >
      <VoiceChat />
    </CopilotKit>
  );
}
