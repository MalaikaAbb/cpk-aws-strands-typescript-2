"use client";
// Docs: prebuilt-components/popup -> "Basic setup".
// Adaptation: runtimeUrl -> /api/copilotkit/prebuilt-popup.
// Removed: the docs' <MainContent /> and <Suggestions /> lines (demo components, see README).

import { CopilotKit, CopilotPopup } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

export default function Page() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/prebuilt-popup" agent="prebuilt-popup">
      <CopilotPopup
        agentId="prebuilt-popup"
        defaultOpen={true}
        labels={{
          chatInputPlaceholder: "Ask the popup anything...",
        }}
      />
    </CopilotKit>
  );
}
