"use client";
// Docs: custom-look-and-feel/css -> "Scoping the theme": `import "./theme.css";` in the page.
// Added: <CopilotChat /> so the CSS has a chat to style.

import { CopilotChat } from "@copilotkit/react-core/v2";
import "./theme.css";

export default function Page() {
  return <CopilotChat />;
}
