"use client";
// Not from the docs: a minimal provider + chat, so the docs' reference snippets
// (sub-routes of this section) have an agent run to attach to. Same runtime and
// agent as the main page.
import { CopilotKit, CopilotChat } from "@copilotkit/react-core/v2";

export function ExampleShell({ children }: { children: React.ReactNode }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/hitl-use-interrupt" agent="hitl-use-interrupt">
      <div className="flex justify-center items-center h-screen w-full">
        <div className="h-full w-full max-w-4xl">
          {children}
          <CopilotChat agentId="hitl-use-interrupt" className="h-full rounded-2xl" />
        </div>
      </div>
    </CopilotKit>
  );
}
