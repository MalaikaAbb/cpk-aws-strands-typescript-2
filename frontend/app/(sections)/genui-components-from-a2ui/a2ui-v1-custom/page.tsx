"use client";
// Docs: from-a2ui -> "Use 1.0 with the React a2ui renderer": the custom 1.0 catalog
// (../_lib/greetings-catalog.tsx) passed to the same `a2ui={{ catalog }}` provider option.
// Adaptations: runtimeUrl -> /api/copilotkit/genui-components-from-a2ui; agent="genui-components-from-a2ui" added.
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
import { myCatalog } from "../_lib/greetings-catalog";

export default function Page() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/genui-components-from-a2ui" agent="genui-components-from-a2ui" a2ui={{ catalog: myCatalog }}>
      {/* Your app */}
      <CopilotChat />
    </CopilotKit>
  );
}
