"use client";
// Demo code: showcase frontend-tools/suggestions.ts (`useFrontendToolsSuggestions`),
// imported by the docs' page.tsx but not given.

import { useConfigureSuggestions } from "@copilotkit/react-core/v2";

export function useFrontendToolsSuggestions() {
  useConfigureSuggestions({
    suggestions: [
      {
        title: "Sunset theme",
        message: "Make the background a sunset gradient.",
      },
      {
        title: "Forest theme",
        message: "Switch to a deep green forest gradient.",
      },
      {
        title: "Cosmic theme",
        message: "Make it a navy → magenta cosmic gradient.",
      },
    ],
    available: "always",
  });
}
