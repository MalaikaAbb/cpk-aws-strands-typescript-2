"use client";
// Docs: custom-look-and-feel/slots -> "Tailwind Classes" (page.tsx), verbatim.
// Moved to _components/ (rendered by tailwind/page.tsx) so the page file has only a default export.

import { CopilotChat } from "@copilotkit/react-core/v2";

export function Chat() {
  return (
    <CopilotChat
      messageView="bg-gray-50 dark:bg-gray-900 p-4"
      input="border-2 border-blue-400 rounded-xl"
    />
  );
}
