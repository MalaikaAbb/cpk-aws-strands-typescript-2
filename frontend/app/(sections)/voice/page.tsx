"use client";
// Docs: voice -> "Frontend" (src/app/demos/voice/page.tsx). The docs put <CopilotKit> in the page.
// Per the docs prose ("In your app, render <CopilotChat /> in its place"), the demo
// wrapper <VoiceChat /> is replaced with <CopilotChat />. The literal snippet, with the
// demo's VoiceChat + the docs' SampleAudioButton, is at ./sample.
// Adaptations: runtimeUrl "/api/copilotkit-voice" -> "/api/copilotkit/voice";
// agent "voice-demo" -> "voice".
// Import added: CopilotChat (the prose names it "from @copilotkit/react-core/v2").

import { CopilotKit } from "@copilotkit/react-core/v2";
import { CopilotChat } from "@copilotkit/react-core/v2";

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
      <CopilotChat />
    </CopilotKit>
  );
}
