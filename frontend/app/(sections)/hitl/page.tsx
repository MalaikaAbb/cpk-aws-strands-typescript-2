"use client";
// Docs: human-in-the-loop -> "Pattern 1: useHumanInTheLoop (tool-based)"
// (src/app/demos/hitl-in-chat/page.tsx). The docs snippet stops after the
// useHumanInTheLoop(...) call: `return <CopilotChat />` and the closing `}` are added.
// "use client" added. Removed from the docs snippet: the useConfigureSuggestions call + import.
// Adaptations: runtimeUrl "/api/copilotkit" -> "/api/copilotkit/hitl"; agent / agentId
// "hitl-in-chat" -> "hitl"; "./time-picker-card" -> "./_components/time-picker-card".
// <CopilotKit> stays in the page, as in the docs.
import React from "react";
import {
  CopilotKit,
  CopilotChat,
  useHumanInTheLoop,
} from "@copilotkit/react-core/v2";
import { z } from "zod";
import type { TimeSlot } from "./_components/time-picker-card";
import { TimePickerCard } from "./_components/time-picker-card";

const DEFAULT_SLOTS: TimeSlot[] = [
  { label: "Tomorrow 10:00 AM", iso: "2026-04-19T10:00:00-07:00" },
  { label: "Tomorrow 2:00 PM", iso: "2026-04-19T14:00:00-07:00" },
  { label: "Monday 9:00 AM", iso: "2026-04-21T09:00:00-07:00" },
  { label: "Monday 3:30 PM", iso: "2026-04-21T15:30:00-07:00" },
];

export default function HitlInChatDemo() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/hitl" agent="hitl">
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-full w-full max-w-4xl">
          <Chat />
        </div>
      </div>
    </CopilotKit>
  );
}

function Chat() {
  useHumanInTheLoop({
    agentId: "hitl",
    name: "book_call",
    description:
      "Use this tool for ANY request to schedule, book, set up, arrange, or organize a call, meeting, 1:1, intro, sync, or chat — including phrasings like 'schedule a 1:1 with Alice', 'book a call', or 'set up a meeting'. It presents the user an in-chat time picker with candidate slots and returns their chosen time. ALWAYS prefer this tool over `schedule_meeting` or any other scheduling tool when the user wants to pick a meeting time in this conversation.",
    parameters: z.object({
      topic: z
        .string()
        .describe("What the call is about (e.g. 'Intro with sales')"),
      attendee: z
        .string()
        .describe("Who the call is with (e.g. 'Alice from Sales')"),
    }),
    render: ({ args, status, respond }: any) => (
      <TimePickerCard
        topic={args?.topic ?? "a call"}
        attendee={args?.attendee}
        slots={DEFAULT_SLOTS}
        status={status}
        onSubmit={(result) => respond?.(result)}
      />
    ),
  });

  return <CopilotChat agentId="hitl" />;
}
