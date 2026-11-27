// Docs: headless-threads -> "Switch between threads" (App.tsx).
// Adaptations: `export` added so page.tsx can render it; the docs use <ThreadSidebar /> without
// importing it, so the import from ./ThreadSidebar is completed.
import { CopilotChat } from "@copilotkit/react-core/v2";
import { useState } from "react";
import { ThreadSidebar } from "./ThreadSidebar";

export function App() {
  const [activeThreadId, setActiveThreadId] = useState<string | undefined>();

  return (
    <div className="flex">
      <ThreadSidebar onSelectThread={setActiveThreadId} />
      <CopilotChat threadId={activeThreadId} />
    </div>
  );
}
