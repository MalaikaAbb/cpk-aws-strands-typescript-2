"use client";
// Docs: fixed-schema -> "Pass the catalog to the provider" (app/page.tsx):
//   import { catalog } from "./a2ui/catalog";
//   <CopilotKit runtimeUrl="/api/copilotkit" a2ui={{ catalog }}>{children}</CopilotKit>
// The provider stays in the page, as the docs show it. Adaptations: runtimeUrl ->
// /api/copilotkit/genui-a2ui-fixed-schema; agent="genui-a2ui-fixed-schema" added; ./a2ui/catalog -> ./_lib/a2ui/catalog.
// A page has no `children`, so a minimal <CopilotChat /> takes its place.
// Added: the CopilotKit / CopilotChat import, the component wrapper and "use client"
// (the catalog holds render functions, so it can't be passed from a server component).
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";
import { catalog } from "./_lib/a2ui/catalog";

export default function Page() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/genui-a2ui-fixed-schema" agent="genui-a2ui-fixed-schema" a2ui={{ catalog }}>
      <CopilotChat />
    </CopilotKit>
  );
}
