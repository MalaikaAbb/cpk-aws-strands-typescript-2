// Docs: human-in-the-loop/useInterrupt -> "The backend: pause the run in your agent" ->
// Step "Pause a tool with Strands' native interrupt" (src/agent/interrupt-agent.ts). The `scheduleMeeting` tool is verbatim.
// Added imports: `tool` from "@strands-agents/sdk" and `z` from "zod" (the docs snippet has none).
// Demo code: `MeetingChoice`, `ResumeEnvelope` and `readResume` are used by the docs but not
// defined there; they are copied from showcase src/agent/interrupt-agent.ts.
import { tool } from "@strands-agents/sdk";
import { z } from "zod";

// --- demo code (showcase src/agent/interrupt-agent.ts) ---
/** What the picker sends back. */
interface MeetingChoice {
  chosen_time?: string;
  chosen_label?: string;
  cancelled?: boolean;
  status?: string;
}

interface ResumeEnvelope {
  /** `null` when the client answered with no payload at all. */
  response?: MeetingChoice | null;
  cancelled?: boolean;
  status?: string;
}

/** Normalise both envelope shapes to `{ choice, cancelled }`. */
export function readResume(
  answer: ResumeEnvelope | MeetingChoice | null | undefined,
): {
  choice: MeetingChoice;
  cancelled: boolean;
} {
  const envelope: ResumeEnvelope =
    answer && typeof answer === "object" ? answer : {};
  const inner =
    "response" in envelope
      ? envelope.response
      : (answer as MeetingChoice | null | undefined);
  const choice: MeetingChoice = inner && typeof inner === "object" ? inner : {};
  const cancelled = Boolean(
    envelope.cancelled ||
    envelope.status === "cancelled" ||
    choice.cancelled ||
    choice.status === "cancelled",
  );
  return { choice, cancelled };
}
// --- end demo code ---

export const scheduleMeeting = tool({
  name: "schedule_meeting",
  description:
    "Ask the user to pick a meeting time, then confirm what was scheduled.",
  inputSchema: z.object({
    topic: z.string().describe("Short description of the meeting purpose."),
    attendee: z.string().optional().describe("Who the meeting is with."),
  }),
  callback: ({ topic, attendee }, context) => {
    // Typed optional by the SDK, so this is checked rather than asserted: with
    // no context there is nothing to pause on, and pretending otherwise would
    // schedule a meeting the user never saw.
    if (!context) {
      throw new Error("schedule_meeting needs a tool context to pause on");
    }

    // `attendee` is optional and the reason has to be JSON, which has no
    // `undefined`, so it is omitted rather than sent as undefined.
    const answer = context.interrupt<ResumeEnvelope>({
      name: "schedule_meeting",
      reason: attendee === undefined ? { topic } : { topic, attendee },
    });

    // Three cancel shapes reach here: each bridge's own sentinel for a
    // cancelled resume entry, and the picker's Cancel button, which resolves
    // with a `cancelled` flag inside the payload.
    const { choice, cancelled } = readResume(answer);
    if (cancelled) {
      return `User cancelled. Meeting NOT scheduled: ${topic}`;
    }

    const label = choice.chosen_label || choice.chosen_time;
    return label
      ? `Meeting scheduled for ${label}: ${topic}`
      : `User did not pick a time. Meeting NOT scheduled: ${topic}`;
  },
});
