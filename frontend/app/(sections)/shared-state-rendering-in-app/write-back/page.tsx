// Docs: shared-state/rendering-in-app -> "Writing back from the main view", hosted by the docs' app/page.tsx
// ("Put it anywhere in your layout") with the toggle-enabled Canvas.
// Adaptations: runtimeUrl -> /api/copilotkit/shared-state-rendering-in-app; agent="shared-state-rendering-in-app" added (the docs pass none,
// i.e. "default"); "../components/Canvas" -> "../_components/CanvasWithToggle".
// The provider stays in the page because the docs put it there. No "use client", as in the docs.
import { CopilotKit, CopilotSidebar } from "@copilotkit/react-core/v2";
import { CanvasWithToggle as Canvas } from "../_components/CanvasWithToggle";

export default function Page() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/shared-state-rendering-in-app" agent="shared-state-rendering-in-app">
      <div className="app-shell">
        {/* Your app UI, driven by agent.state */}
        <Canvas />
        {/* Chat is just another consumer of the same agent */}
        <CopilotSidebar />
      </div>
    </CopilotKit>
  );
}
