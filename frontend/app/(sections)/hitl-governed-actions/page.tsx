"use client";
// Docs: human-in-the-loop/governed-actions gives no page. Minimal page to exercise the two
// samples: both components (each renders null and only registers its hook) plus a chat.
import { CopilotChat } from "@copilotkit/react-core/v2";
import { GovernedActionApproval } from "./_components/governed-action-approval";
import { GovernedActionTool } from "./_components/governed-action-tool";

export default function Page() {
  return (
    <main className="h-screen">
      <GovernedActionApproval />
      <GovernedActionTool />
      <CopilotChat className="h-full" />
    </main>
  );
}
