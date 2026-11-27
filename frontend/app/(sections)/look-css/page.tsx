"use client";
// Docs: custom-look-and-feel/css -> "Scoping the theme": `import "./theme.css";` in the page, with the
// styling applied "only to the wrapper div holding <CopilotChat>".
// Added: that wrapper div (class `chat-css-demo-scope`, which every docs theme.css rule targets)
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
