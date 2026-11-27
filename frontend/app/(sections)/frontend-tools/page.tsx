"use client";
// Docs: frontend-tools -> "Register a frontend tool with useFrontendTool"
// (src/app/demos/frontend-tools/page.tsx). The imports and the `Chat` body up to the end of
// `useFrontendTool({...})` are verbatim from the docs (the handler is the second snippet).
// Demo code (showcase frontend-tools/page.tsx): the rest of `Chat` (suggestions call +
// returned JSX) and the default export with <CopilotKit>; the docs snippet stops mid-function.
// Adaptations: runtimeUrl -> /api/copilotkit/frontend-tools; agent / agentId
// "frontend_tools" -> "frontend-tools"; "./background" and "./suggestions" -> ./_components.

import React, { useState } from "react";
import {
  CopilotKit,
  CopilotSidebar,
  useFrontendTool,
} from "@copilotkit/react-core/v2";
import { z } from "zod";
import { Background, DEFAULT_BACKGROUND } from "./_components/background";
import { useFrontendToolsSuggestions } from "./_components/suggestions";

function Chat() {
  const [background, setBackground] = useState<string>(DEFAULT_BACKGROUND);

  useFrontendTool({
    name: "change_background",
    description:
      "Change the page background. Accepts any valid CSS background value — colors, linear or radial gradients, etc.",
    parameters: z.object({
      background: z
        .string()
        .describe("The CSS background value. Prefer gradients."),
    }),
    handler: async ({ background }) => {
      setBackground(background);
      return { status: "success" };
    },
  });
  // --- end of docs snippet; demo code below ---

  useFrontendToolsSuggestions();

  return (
    <Background background={background}>
      <CopilotSidebar agentId="frontend-tools" defaultOpen />
    </Background>
  );
}

export default function FrontendToolsDemo() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/frontend-tools" agent="frontend-tools">
      <Chat />
    </CopilotKit>
  );
}
