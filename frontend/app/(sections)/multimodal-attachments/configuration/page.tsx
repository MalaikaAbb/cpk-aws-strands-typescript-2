"use client";
// Docs: multimodal-attachments -> "Configuration", verbatim.
// Adaptation: the docs' bare `<CopilotChat ... />` is returned from the page component.
// Import added (the snippet has none): CopilotChat, as in "Quick start".

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      attachments={{
        enabled: true,
        // Omit `accept` to allow all file types (default: "*/*").
        // Restrict with a MIME filter if needed:
        accept: "image/*,audio/*,video/*,application/pdf",
        maxSize: 10 * 1024 * 1024,      // 10MB limit (default: 20MB)
      }}
    />
  );
}
