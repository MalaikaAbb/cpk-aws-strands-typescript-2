"use client";
// Docs: shared-state -> "Reading agent state" (useAgent) + "Writing agent state"
// (handlePreferencesChange), both from src/app/demos/shared-state-read-write/page.tsx, and
// "Rendering shared state in the UI" (NotesCard).
// The docs give only the two fragments. From the same demo page (used but not given by the docs):
// the imports, `RWAgentState`, `INITIAL_PREFERENCES`, the `agentState`/`preferences`/`notes`
// derivation and `handleClearNotes` (NotesCard's `onClear`). Not copied: the demo's suggestions,
// initial-state seeding effect, and DemoLayout/PreferencesCard UI.
// Host additions: <PreferencesEditor> (minimal) and <CopilotSidebar /> (as in quickstart).
// Adaptation: agentId "shared-state-read-write" -> "shared-state".

import React from "react";
import {
  CopilotSidebar,
  useAgent,
  UseAgentUpdate,
} from "@copilotkit/react-core/v2";
import { NotesCard } from "./_components/notes-card";
import { PreferencesEditor, type Preferences } from "./_components/preferences-editor";

const INITIAL_PREFERENCES: Preferences = {
  name: "",
  tone: "casual",
  language: "English",
  interests: [],
};

// Shape of the bidirectional shared state.
// - `preferences` is WRITTEN by the UI via agent.setState().
// - `notes` is WRITTEN by the agent via its `set_notes` tool and READ
//   by the UI via useAgent().
interface RWAgentState {
  preferences: Preferences;
  notes: string[];
}

export default function Page() {
  // Subscribe the component to agent state changes. Any time the agent
  // mutates its state (e.g. via its `set_notes` tool) this hook fires,
  // we re-render, and the sidebar panels reflect the new values.
  const { agent } = useAgent({
    agentId: "shared-state",
    updates: [UseAgentUpdate.OnStateChanged],
  });

  const agentState = agent.state as RWAgentState | undefined;
  const preferences = agentState?.preferences ?? INITIAL_PREFERENCES;
  const notes = agentState?.notes ?? [];

  // WRITE: every edit in the sidebar goes straight into agent state.
  // On the agent's next turn, `PreferencesInjectorMiddleware` reads this
  // back out of state and adds it to the system prompt — so the UI's
  // writes visibly steer the model.
  const handlePreferencesChange = (next: Preferences) => {
    agent.setState({
      preferences: next,
      notes, // preserve what the agent has written
    } as RWAgentState);
  };

  // WRITE: let the user clear the agent-authored notes from the UI.
  const handleClearNotes = () => {
    agent.setState({ preferences, notes: [] } as RWAgentState);
  };

  return (
    <main>
      <PreferencesEditor value={preferences} onChange={handlePreferencesChange} />
      <NotesCard notes={notes} onClear={handleClearNotes} />
      <CopilotSidebar />
    </main>
  );
}
