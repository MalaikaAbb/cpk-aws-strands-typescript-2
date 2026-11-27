"use client";
// Docs: multimodal-attachments -> "Handling upload errors" (onUploadFailed), verbatim.
// Adaptation: the docs' bare `<CopilotChat ... />` is returned from the page component.
// Import added (the snippet has none): CopilotChat, as in "Quick start".
// NOTE: `toast` is not defined or imported by the docs, and the demo has none. Left undefined.

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      attachments={{
        enabled: true,
        accept: "image/*",
        maxSize: 5 * 1024 * 1024, // 5MB
        onUploadFailed: (error) => {
          // error.reason: "file-too-large" | "invalid-type" | "upload-failed"
          // error.file: the original File object
          // error.message: human-readable description
          toast.error(error.message);
        },
      }}
    />
  );
}
