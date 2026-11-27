"use client";
// Docs: multimodal-attachments -> "Handling upload errors" (onError on CopilotChat), verbatim.
// Adaptation: the docs' bare `<CopilotChat ... />` is returned from the page component.
// Import added (the snippet has none): CopilotChat, as in "Quick start".

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      attachments={{ enabled: true }}
      onError={(event) => {
        console.error(`[${event.code}]`, event.error.message);
      }}
    />
  );
}
