"use client";
// Docs: from-a2ui -> "Use 1.0 with the React a2ui renderer" (first snippet), with the
// provider inside the page as the docs show it ({/* Your app */} -> a minimal chat).
// Adaptations: runtimeUrl -> /api/copilotkit/genui-components-from-a2ui; agent="genui-components-from-a2ui" added.
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
import { basicCatalogV1 } from "@copilotkit/a2ui-renderer";

export default function Page() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/genui-components-from-a2ui" agent="genui-components-from-a2ui" a2ui={{ catalog: basicCatalogV1 }}>
      {/* Your app */}
      <main className="h-screen">
        <CopilotChat />
      </main>
    </CopilotKit>
  );
}
