"use client";
// Docs: multimodal-attachments -> "Custom upload handler", "URL (hosted)" tab, verbatim.
// Adaptation: the docs' bare `<CopilotChat ... />` is returned from the page component.
// Import added (the snippet has none): CopilotChat, as in "Quick start".
// NOTE: the docs give no `/api/upload` endpoint (and the demo has none), so the
// upload request 404s. Left as is.

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      attachments={{
        enabled: true,
        onUpload: async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("/api/upload", { method: "POST", body: formData });
          const { url } = await res.json();
          return {
            type: "url",
            value: url,
            mimeType: file.type,
          };
        },
      }}
    />
  );
}
