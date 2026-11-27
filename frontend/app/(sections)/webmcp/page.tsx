"use client";
// Host for the docs' OrderSearch ("React frontend tool"): it "must run inside your existing
// CopilotKitProvider" (the quickstart provider in layout.tsx). <CopilotSidebar /> as in quickstart,
// so the CopilotKit agent can also call the same tool.
import { CopilotSidebar } from "@copilotkit/react-core/v2";
import { OrderSearch } from "./_components/OrderSearch";

export default function Page() {
  return (
    <main>
      <h1>Your App</h1>
      <OrderSearch />
      <CopilotSidebar />
    </main>
  );
}
