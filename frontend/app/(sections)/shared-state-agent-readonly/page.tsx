"use client";
// Docs: shared-state/agent-readonly -> "Wire it to your own state" (src/app/demos/readonly-state-agent-context/page.tsx)
// followed by "How it works in code" (the useAgentContext calls, same file).
// The docs' file stops after the useState hooks. The rest of DemoContent (toggleActivity, the
// suggestions call and the <DemoLayout> return) is demo code from the same demo page.
// "use client" from the demo page (the docs snippet starts at the imports).
// Adaptations: runtimeUrl -> /api/copilotkit/shared-state-agent-readonly; agent/agentId
// "readonly-state-agent-context" -> "shared-state-agent-readonly"; "./demo-layout" and
// "./suggestions" -> "./_components/...".
import React, { useState } from "react";
import {
  CopilotKit,
  CopilotPopup,
  useAgentContext,
} from "@copilotkit/react-core/v2";

import { ACTIVITIES, DemoLayout } from "./_components/demo-layout";
import { useReadonlyStateAgentContextSuggestions } from "./_components/suggestions";

export default function ReadonlyStateAgentContextDemo() {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit/shared-state-agent-readonly"
      agent="shared-state-agent-readonly"
    >
      <DemoContent />
      <CopilotPopup
        agentId="shared-state-agent-readonly"
        defaultOpen={true}
        labels={{ chatInputPlaceholder: "Ask about your context..." }}
      />
    </CopilotKit>
  );
}

function DemoContent() {
  const [userName, setUserName] = useState("Atai");
  const [userTimezone, setUserTimezone] = useState("America/Los_Angeles");
  const [recentActivity, setRecentActivity] = useState<string[]>([
    ACTIVITIES[0],
    ACTIVITIES[2],
  ]);

  // Docs: "How it works in code".
  useAgentContext({
    description: "The currently logged-in user's display name",
    value: userName,
  });
  useAgentContext({
    description: "The user's IANA timezone (used when mentioning times)",
    value: userTimezone,
  });
  useAgentContext({
    description: "The user's recent activity in the app, newest first",
    value: recentActivity,
  });

  // ---- Demo code (same demo page): not in the docs ----
  useReadonlyStateAgentContextSuggestions();

  const toggleActivity = (activity: string) => {
    setRecentActivity((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity],
    );
  };

  return (
    <DemoLayout
      userName={userName}
      userTimezone={userTimezone}
      recentActivity={recentActivity}
      onUserNameChange={setUserName}
      onUserTimezoneChange={setUserTimezone}
      onToggleActivity={toggleActivity}
    />
  );
}
