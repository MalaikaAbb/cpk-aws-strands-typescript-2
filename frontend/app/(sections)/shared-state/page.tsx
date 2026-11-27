"use client";
// Docs: shared-state -> "Reading agent state" (useAgent), "Writing agent state" (handlePreferencesChange)
// and "Rendering shared state in the UI" (NotesCard). The docs give only the two fragments.
// Needed to run them (from the demo page): `RWAgentState`, `INITIAL_PREFERENCES`, the
// `preferences`/`notes` derivation, and `handleClearNotes` (NotesCard's required `onClear`).
// Host: <PreferencesEditor> (minimal) and <CopilotSidebar />. Adaptation: agentId -> "shared-state".

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
