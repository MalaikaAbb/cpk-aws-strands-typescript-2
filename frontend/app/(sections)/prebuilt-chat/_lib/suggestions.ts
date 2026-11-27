"use client";
// Demo code: copied from showcase/integrations/strands-typescript/src/app/demos/agentic-chat/suggestions.ts.
// The docs call useAgenticChatSuggestions() ("a demo hook that wraps useConfigureSuggestions")
// but never define it.

import { useConfigureSuggestions } from "@copilotkit/react-core/v2";

export function useAgenticChatSuggestions() {
  useConfigureSuggestions({
    suggestions: [
      { title: "Write a sonnet", message: "Write a short sonnet about AI." },
      {
        title: "Tell me a joke",
        message: "Tell me a one-line joke.",
      },
      {
        title: "Is 17 prime?",
        message: "Walk me through whether 17 is prime.",
      },
    ],
    available: "always",
  });
}
