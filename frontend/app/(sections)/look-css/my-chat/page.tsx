"use client";
// Docs: custom-look-and-feel/css -> "In v2, set the same color with a CSS rule on the
// [data-copilotkit] element" (`.my-chat [data-copilotkit] { --primary: #222222; }`, in globals.css).
// The docs give only the CSS. Added: the `.my-chat` wrapper around <CopilotSidebar />, from the
// v1 example right above it, without its v1-only inline `style`.

import { CopilotSidebar } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <div className="my-chat">
      <CopilotSidebar />
    </div>
  );
}
