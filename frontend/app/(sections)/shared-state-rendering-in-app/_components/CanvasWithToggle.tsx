// Docs: shared-state/rendering-in-app -> "Writing back from the main view" (toggleItem, no file named).
// The docs' Canvas (components/Canvas.tsx) with the docs' `toggleItem` placed inside it (it uses
// `agent`), wired to each item's onClick. Renamed CanvasWithToggle. "Try it" says to "mark an item
// done with toggleItem"; the docs don't say how it is triggered, so the click wiring is the addition.
import { useEffect } from "react";
import { useAgent } from "@copilotkit/react-core/v2";

type CanvasState = {
  title: string;
  items: { id: string; label: string; done: boolean }[];
};

const INITIAL_CANVAS_STATE: CanvasState = {
  title: "Project launch",
  items: [
    { id: "research", label: "Research user needs", done: true },
    { id: "prototype", label: "Build a prototype", done: false },
  ],
};

export function CanvasWithToggle() {
  // No agentId means the "default" agent. Pass { agentId } to target another.
  const { agent, isReady } = useAgent();
  const state = (agent.state ?? {}) as Partial<CanvasState>;

  useEffect(() => {
    if (!isReady) return;

    const current = (agent.state ?? {}) as Partial<CanvasState>;
    const updates: Partial<CanvasState> = {};

    if (current.title === undefined) {
      updates.title = INITIAL_CANVAS_STATE.title;
    }
    if (current.items === undefined) {
      updates.items = INITIAL_CANVAS_STATE.items;
    }

    if (Object.keys(updates).length > 0) {
      agent.setState({ ...(agent.state ?? {}), ...updates });
    }
  }, [agent, isReady, state.title, state.items]);


  function toggleItem(id: string) {
    agent.setState({
      ...agent.state,
      items: (agent.state?.items ?? []).map((it) =>
        it.id === id ? { ...it, done: !it.done } : it,
      ),
    });
  }

  return (
    <main className="canvas">
      <h1>{state.title ?? "Untitled"}</h1>
      <ul>
        {(state.items ?? []).map((item) => (
          <li key={item.id} data-done={item.done} onClick={() => toggleItem(item.id)}>
            {item.label}
          </li>
        ))}
      </ul>
    </main>
  );
}
