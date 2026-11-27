// Demo code: `setNotes` copied from showcase/integrations/strands-typescript/src/agent/tools.ts.
// The docs name the `set_notes` tool ("The agent writes state through a tool") but don't define it.
import { tool } from "@strands-agents/sdk";
import { z } from "zod";

export const setNotes = tool({
  name: "set_notes",
  description:
    "Replace the notes array in shared state with the full updated list. Use whenever the user asks you to remember something. ALWAYS pass the FULL notes list (existing + new), not a diff. Keep each note short (< 120 chars).",
  inputSchema: z.object({
    notes: z
      .array(z.string())
      .describe("The complete updated list of short note strings."),
  }),
  callback: ({ notes }) => `Notes updated. Tracking ${notes.length} note(s).`,
});
