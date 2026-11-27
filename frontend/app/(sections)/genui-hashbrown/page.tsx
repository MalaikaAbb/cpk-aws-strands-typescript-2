"use client";
// Docs: hashbrown -> page.tsx (src/app/demos/declarative-hashbrown/page.tsx). The provider stays in the page,
// as the docs show it. Adaptations: runtimeUrl -> /api/copilotkit/genui-hashbrown; agent -> "genui-hashbrown";
// ./hashbrown-renderer and ./chat -> ./_components/...

import { CopilotKit } from "@copilotkit/react-core/v2";
import { HashBrownDashboard } from "./_components/hashbrown-renderer";
import { Chat } from "./_components/chat";

export default function ByocHashbrownDemoPage() {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit/genui-hashbrown"
      agent="genui-hashbrown"
    >
      <HashBrownDashboard>
        <div className="flex h-screen flex-col gap-3 p-6">
          <header>
            <h1 className="text-lg font-semibold">Declarative UI: Hashbrown</h1>
            <p className="text-sm text-[var(--muted-foreground)]">
              Streaming structured output via <code>@hashbrownai/react</code>.
              The agent emits a catalog-constrained UI envelope that renders
              progressively as data streams.
            </p>
          </header>
          <div className="flex-1 overflow-hidden rounded-md border border-[var(--border)]">
            <Chat />
          </div>
        </div>
      </HashBrownDashboard>
    </CopilotKit>
  );
}
