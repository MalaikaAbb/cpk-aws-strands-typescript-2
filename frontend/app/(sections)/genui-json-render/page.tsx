"use client";
// The docs give no page. Minimal page that renders the docs' <Chat /> (_components/chat.tsx).
import { Chat } from "./_components/chat";

export default function Page() {
  return (
    <main className="h-screen">
      <Chat />
    </main>
  );
}
