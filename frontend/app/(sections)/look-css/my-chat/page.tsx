"use client";
// Docs: custom-look-and-feel/css -> `.my-chat [data-copilotkit] { --primary: #222222; }` (globals.css).
// Added: the `.my-chat` element that rule targets, around a <CopilotSidebar />.

import { CopilotSidebar } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <div className="my-chat">
      <CopilotSidebar />
    </div>
  );
}
