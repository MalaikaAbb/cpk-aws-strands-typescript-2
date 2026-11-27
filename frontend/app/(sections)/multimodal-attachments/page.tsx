"use client";
// Docs: multimodal-attachments -> "Quick start" (page.tsx).
// Adaptations: agentId "my-agent" -> "multimodal-attachments"; the docs' bare
// `<CopilotChat ... />` is returned from the page component so it renders.

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      agentId="multimodal-attachments"
      attachments={{ enabled: true }}
    />
  );
}
