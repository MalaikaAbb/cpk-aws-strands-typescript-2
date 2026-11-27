"use client";
// Docs: frontend-tools -> "Registering a list of tools", verbatim.
// Adaptation: the bare hook call is placed in this route's page component, next to a
// <CopilotSidebar> (as the main example uses) so the tools can be called.
// Import added: `useFrontendTools` and `CopilotSidebar` from "@copilotkit/react-core/v2".
// NOTE: `reports` and `navigate` are not defined by the docs or the demo. Left undefined.

import { CopilotSidebar, useFrontendTools } from "@copilotkit/react-core/v2";

export default function Page() {
  useFrontendTools(
    reports.map((report) => ({
      name: `open_${report.id}`,
      description: `Open the ${report.title} report`,
      handler: async () => navigate(`/reports/${report.id}`),
    })),
    [navigate],
  );

  return <CopilotSidebar defaultOpen />;
}
