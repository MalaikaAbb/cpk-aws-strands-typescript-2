"use client";
// Host for the docs' OrderSearch ("React frontend tool"): it "must run inside your existing
// CopilotKitProvider" (the quickstart provider in layout.tsx). WebMCP calls come from the browser
// agent, so no chat is mounted.
import { OrderSearch } from "./_components/OrderSearch";

export default function Page() {
  return <OrderSearch />;
}
