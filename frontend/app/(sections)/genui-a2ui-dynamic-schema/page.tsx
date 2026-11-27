"use client";
// Docs: dynamic-schema -> "Pass the catalog to the provider" (src/app/demos/declarative-gen-ui/page.tsx).
// The provider is inside the page, as the docs show it.
// Adaptations: runtimeUrl -> /api/copilotkit/genui-a2ui-dynamic-schema; agent -> "genui-a2ui-dynamic-schema"; ./a2ui/catalog -> ./_lib/a2ui/catalog.
// "use your own chat in place of the demo's Chat component" -> CopilotChat.
// From the demo (same file): the "use client" directive and the closing `);` / `}`, which the
// docs snippet cuts off.
import React from "react";
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";

import { myCatalog } from "./_lib/a2ui/catalog";

export default function DeclarativeGenUIDemo() {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit/genui-a2ui-dynamic-schema"
      agent="genui-a2ui-dynamic-schema"
      a2ui={{ catalog: myCatalog }}
    >
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-full w-full max-w-4xl">
          <CopilotChat />
        </div>
      </div>
    </CopilotKit>
  );
}
