// Docs: shared-state -> "Apply it before every run" (src/agent/agent.ts: ShowcaseStrandsAgent)
// and "Send agent writes back to the UI" (src/agent/agent.ts: config), verbatim.
// Imports completed: RunAgentInput (@ag-ui/core), withStateContext (./state.ts),
// BoardStateStrandsAgent (./todo-state-sync.ts, demo code). `export` added to `config`.
import type { RunAgentInput } from "@ag-ui/core";
import type { StrandsAgentConfig } from "@ag-ui/aws-strands";
import { notesStateFromArgs, withStateContext } from "./state.ts";
import { BoardStateStrandsAgent } from "./todo-state-sync.ts";

export class ShowcaseStrandsAgent extends BoardStateStrandsAgent {
  override async *run(inputData: RunAgentInput) {
    // The adapter exposes context during model calls and restores history afterward.
    yield* super.run(withStateContext(inputData));
  }
}

export const config: StrandsAgentConfig = {
  toolBehaviors: {
    // Shared State (Read + Write) — notes panel.
    set_notes: { stateFromArgs: notesStateFromArgs },
  },
};
