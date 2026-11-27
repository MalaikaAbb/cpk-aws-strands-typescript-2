"use client";
// Docs: prebuilt-components/popup -> "Basic setup" (imports + provider fragment,
// src/app/demos/prebuilt-popup/page.tsx). The docs put <CopilotKit> inside the page, so it stays here.
// Adaptations: runtimeUrl -> /api/copilotkit/prebuilt-popup; agent / agentId stay "prebuilt-popup"
// (already the slug). Added: the default-export page wrapper around the docs' fragment, and
// the imports of the demo components MainContent and Suggestions (copied from the demo, see README).

import { CopilotKit, CopilotPopup } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";
import { MainContent } from "./_components/main-content";
import { Suggestions } from "./_components/suggestions-mount";

export default function Page() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/prebuilt-popup" agent="prebuilt-popup">
      <MainContent />
      <CopilotPopup
        agentId="prebuilt-popup"
        defaultOpen={true}
        labels={{
          chatInputPlaceholder: "Ask the popup anything...",
        }}
      />
      <Suggestions />
    </CopilotKit>
  );
}
