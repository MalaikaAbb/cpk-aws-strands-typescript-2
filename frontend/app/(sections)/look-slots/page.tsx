"use client";
// Docs: custom-look-and-feel/slots -> "What it looks like in code": "Each slot is just a prop; the
// demo extracts them into locals". The docs show only the extraction (slot-overrides.tsx).
// Added: this minimal page that passes the three extracted slots to <CopilotChat> as props.

import { CopilotChat } from "@copilotkit/react-core/v2";
import { ChatSlotsTeachingExtracts } from "./_components/slot-overrides";

export default function Page() {
  const { welcomeScreen, messageView, input } = ChatSlotsTeachingExtracts();
  return (
    <CopilotChat
      welcomeScreen={welcomeScreen}
      messageView={messageView}
      input={input}
    />
  );
}
