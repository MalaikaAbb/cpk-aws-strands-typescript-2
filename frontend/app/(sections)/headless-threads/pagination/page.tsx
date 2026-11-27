"use client";
// Docs: headless-threads -> "Add pagination for large thread lists", hosted by the docs' App.tsx
// layout ("Switch between threads") with the paginated ThreadSidebar.
import { CopilotChat } from "@copilotkit/react-core/v2";
import { useState } from "react";
import { ThreadSidebar } from "../_components/PaginatedThreadSidebar";

export default function Page() {
  const [activeThreadId, setActiveThreadId] = useState<string | undefined>();

  return (
    <div className="flex">
      <ThreadSidebar onSelectThread={setActiveThreadId} />
      <CopilotChat threadId={activeThreadId} />
    </div>
  );
}
