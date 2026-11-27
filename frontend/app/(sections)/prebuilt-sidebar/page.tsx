"use client";
// Docs: prebuilt-components/sidebar -> "Basic setup" (imports + provider fragment,
// src/app/demos/prebuilt-sidebar/page.tsx) and "Configuring the sidebar" (same CopilotSidebar line).
// The docs put <CopilotKit> inside the page, so it stays here.
// Adaptations: runtimeUrl -> /api/copilotkit/prebuilt-sidebar; agent / agentId stay "prebuilt-sidebar"
// (already the slug). Added: the default-export page wrapper around the docs' fragment, and
// the imports of the demo components MainContent and Suggestions (copied from the demo, see README).

import { CopilotKit, CopilotSidebar } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";
import { MainContent } from "./_components/main-content";
import { Suggestions } from "./_components/suggestions-mount";

export default function Page() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/prebuilt-sidebar" agent="prebuilt-sidebar">
      <MainContent />
      <CopilotSidebar agentId="prebuilt-sidebar" defaultOpen={true} />
      <Suggestions />
    </CopilotKit>
  );
}
