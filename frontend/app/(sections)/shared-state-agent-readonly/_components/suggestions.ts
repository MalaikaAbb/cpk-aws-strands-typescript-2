// Demo code: copied from showcase/integrations/strands-typescript/src/app/demos/readonly-state-agent-context/suggestions.ts.
// The docs page imports `useReadonlyStateAgentContextSuggestions` from "./suggestions" without giving it.
"use client";

import { useConfigureSuggestions } from "@copilotkit/react-core/v2";

export function useReadonlyStateAgentContextSuggestions() {
  useConfigureSuggestions({
    suggestions: [
      {
        title: "Who am I?",
        message: "What do you know about me from my context?",
      },
      {
        title: "Suggest next steps",
        message: "Based on my recent activity, what should I try next?",
      },
      {
        title: "Plan my morning",
        message:
          "What time is it in my timezone and what should I do for the next hour?",
      },
    ],
    available: "always",
  });
}
