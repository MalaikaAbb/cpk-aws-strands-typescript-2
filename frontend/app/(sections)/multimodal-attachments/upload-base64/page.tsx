"use client";
// Docs: multimodal-attachments -> "Custom upload handler", "Base64 (inline)" tab, verbatim.
// Adaptation: the docs' bare `<CopilotChat ... />` is returned from the page component.
// Import added (the snippet has none): CopilotChat, as in "Quick start".

import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <CopilotChat
      attachments={{
        enabled: true,
        onUpload: async (file) => {
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          });
          const base64 = dataUrl.split(",")[1];
          return {
            type: "data",
            value: base64,
            mimeType: file.type,
          };
        },
      }}
    />
  );
}
