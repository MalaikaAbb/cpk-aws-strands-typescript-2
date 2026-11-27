"use client";
// Docs: custom-look-and-feel/css -> "Scoping the theme": `import "./theme.css";` in the page
// (src/app/demos/chat-customization-css/page.tsx), with the styling applied "only to the wrapper
// div holding <CopilotChat>". The docs show only the import line.
// Added: the minimal wrapper div (class `chat-css-demo-scope`, the scope the docs' theme.css uses)
// and the <CopilotChat /> it holds.

import { CopilotChat } from "@copilotkit/react-core/v2";
import "./theme.css";

export default function Page() {
  return (
    <div className="chat-css-demo-scope">
      <CopilotChat />
    </div>
  );
}
