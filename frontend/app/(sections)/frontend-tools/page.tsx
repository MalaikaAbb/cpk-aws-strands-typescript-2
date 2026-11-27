"use client";
// Docs: frontend-tools -> "Register a frontend tool with useFrontendTool"
// (src/app/demos/frontend-tools/page.tsx). Verbatim up to the end of `useFrontendTool({...})`,
// except: `Background` and the `useFrontendToolsSuggestions` import were removed from the
// docs' imports ("./background" -> "./_components/background").
// Added (needed): the end of `Chat`, which shows `background` and a chat to ask the agent;
// the default export. The provider is the quickstart one, in layout.tsx.

import React, { useState } from "react";
import {
  CopilotKit,
  CopilotSidebar,
  useFrontendTool,
} from "@copilotkit/react-core/v2";
import { z } from "zod";
import { DEFAULT_BACKGROUND } from "./_components/background";

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

  return (
    <div style={{ background, minHeight: "100vh" }}>
      <CopilotSidebar />
    </div>
  );
}

export default Chat;
