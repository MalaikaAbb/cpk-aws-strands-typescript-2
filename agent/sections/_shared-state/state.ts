// Docs: shared-state -> "Copy UI state into the request context" (src/agent/state.ts: withStateContext)
// and "Send agent writes back to the UI" (src/agent/state.ts: notesStateFromArgs), verbatim.
// Imports completed: RunAgentInput (@ag-ui/core), ToolCallContext + StatePayload (@ag-ui/aws-strands).
import type { ToolCallContext, StatePayload } from "@ag-ui/aws-strands";
import type { RunAgentInput } from "@ag-ui/core";

// ---- Demo code: copied from showcase/integrations/strands-typescript/src/agent/state.ts --------
// The docs use `formatPreferencesBlock` and `parseToolInput` without defining them.

/** Parse a tool's input (string JSON or already-parsed object). */
function parseToolInput(raw: unknown): unknown {
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return undefined;
    }
  }
  return raw;
}

function formatPreferencesBlock(prefs: unknown): string | null {
  if (!prefs || typeof prefs !== "object") return null;
  const p = prefs as Record<string, unknown>;
  const lines: string[] = [];
  if (p.name) lines.push(`- Name: ${p.name}`);
  if (p.tone) lines.push(`- Preferred tone: ${p.tone}`);
  if (p.language) lines.push(`- Preferred language: ${p.language}`);
  const interests = p.interests;
  if (Array.isArray(interests) && interests.length > 0) {
    lines.push(`- Interests: ${interests.map((i) => String(i)).join(", ")}`);
  }
  if (lines.length === 0) return null;
  return (
    "The user has shared these preferences with you:\n" +
    lines.join("\n") +
    "\nTailor every response to these preferences. Address the user by name when appropriate."
  );
}
// ---- end demo code --------------------------------------------------------------------------

export function withStateContext(inputData: RunAgentInput): RunAgentInput {
  const state =
    inputData.state && typeof inputData.state === "object"
      ? (inputData.state as Record<string, unknown>)
      : {};
  const context = [...inputData.context];
  const preferences = formatPreferencesBlock(state.preferences);
  if (preferences) {
    context.push({
      description: "Current user preferences",
      value: preferences,
    });
  }
  if ("todos" in state) {
    context.push({
      description: "Current sales pipeline",
      value: JSON.stringify(state.todos, null, 2),
    });
  }
  return { ...inputData, context };
}

export async function notesStateFromArgs(
  ctx: ToolCallContext,
): Promise<StatePayload | null> {
  const input = parseToolInput(ctx.toolInput);
  let notes: unknown;
  if (input && typeof input === "object" && !Array.isArray(input)) {
    notes = (input as Record<string, unknown>).notes;
  } else if (Array.isArray(input)) {
    notes = input;
  }
  if (!Array.isArray(notes)) return null;
  return { notes: notes.map((n) => String(n)) };
}
