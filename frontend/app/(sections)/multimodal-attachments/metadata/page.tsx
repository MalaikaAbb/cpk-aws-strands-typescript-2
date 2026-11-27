"use client";
// Docs: multimodal-attachments -> "Adding metadata". The docs give only the `onUpload`
// property; it is placed in `<CopilotChat attachments={{ enabled: true, ... }} />`
// (the shape every other snippet on the page uses) so it can be exercised.
// Import added: CopilotChat, as in "Quick start".
// NOTE: `uploadToStorage` and `currentUser` are not defined by the docs or the demo.
// Left undefined (type errors; ReferenceError when a file is attached).

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      attachments={{
        enabled: true,
        onUpload: async (file) => {
          const url = await uploadToStorage(file);
          return {
            type: "url",
            value: url,
            mimeType: file.type,
            metadata: {
              uploadedBy: currentUser.id,
              category: "support-ticket",
            },
          };
        },
      }}
    />
  );
}
