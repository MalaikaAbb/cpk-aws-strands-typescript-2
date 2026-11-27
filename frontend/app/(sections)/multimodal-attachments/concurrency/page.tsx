"use client";
// Docs: multimodal-attachments -> "Upload concurrency", verbatim.
// Adaptation: the docs' bare `<CopilotChat ... />` is returned from the page component.
// Import added (the snippet has none): CopilotChat, as in "Quick start".
// NOTE: `uploadToStorage` is not defined by the docs or the demo. Left undefined.

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      attachments={{
        enabled: true,
        maxConcurrentUploads: 3, // three files at a time
        onUpload: async (file) => ({ type: "url", value: await uploadToStorage(file), mimeType: file.type }),
      }}
    />
  );
}
