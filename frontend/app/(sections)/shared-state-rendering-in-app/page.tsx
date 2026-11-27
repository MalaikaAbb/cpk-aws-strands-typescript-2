// Docs: shared-state/rendering-in-app -> "Put it anywhere in your layout" (app/page.tsx).
// Adaptations: runtimeUrl -> /api/copilotkit/shared-state-rendering-in-app; agent="shared-state-rendering-in-app" added (the docs pass none,
// i.e. "default"); "../components/Canvas" -> "./_components/Canvas".
// The provider stays in the page because the docs put it there. No "use client", as in the docs.
import { CopilotKit, CopilotSidebar } from "@copilotkit/react-core/v2";
import { Canvas } from "./_components/Canvas";

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
