"use client";
// Docs: prebuilt-components/sidebar -> "Basic setup" + "Configuring the sidebar".
// Adaptation: runtimeUrl -> /api/copilotkit/prebuilt-sidebar.
// Removed: the docs' <MainContent /> and <Suggestions /> lines (demo components, see README).

import { CopilotKit, CopilotSidebar } from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

export default function Page() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/prebuilt-sidebar" agent="prebuilt-sidebar">
      <CopilotSidebar agentId="prebuilt-sidebar" defaultOpen={true} />
    </CopilotKit>
  );
}
