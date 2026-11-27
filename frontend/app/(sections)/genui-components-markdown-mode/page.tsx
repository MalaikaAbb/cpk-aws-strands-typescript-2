"use client";
// The docs give no page. Minimal chat to exercise markdown mode ("The chat renders each
// block as a live surface").
import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return (
    <main className="h-screen">
      <CopilotChat />
    </main>
  );
}
