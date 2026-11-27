"use client";
// Docs: shared-state/agent-readonly -> "Wire it to your own state" (src/app/demos/readonly-state-agent-context/page.tsx)
// followed by "How it works in code" (the useAgentContext calls, same file).
// Removed from the docs snippet: the `DemoLayout` import (demo layout) and the
// `useReadonlyStateAgentContextSuggestions` import (suggestions).
// The docs' DemoContent stops after the useState hooks; it is closed with a plain name input, so
// the name can be changed ("Change the name in your UI and ask again").
// Adaptations: runtimeUrl -> /api/copilotkit/shared-state-agent-readonly; agent/agentId
// "readonly-state-agent-context" -> "shared-state-agent-readonly"; "./demo-layout" -> "./_components/demo-layout".
import React, { useState } from "react";
import {
  CopilotKit,
  CopilotPopup,
  useAgentContext,
} from "@copilotkit/react-core/v2";

import { ACTIVITIES } from "./_components/demo-layout";

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

  return <input value={userName} onChange={(e) => setUserName(e.target.value)} />;
}
