// Docs: prebuilt-components/copilot-threads-drawer -> "Add your own "New conversation" button" (app/page.tsx).
// Adaptations: same as ../page.tsx (runtimeUrl, agentId on the provider, useSingleEndpoint={false}).
// Note: like the docs, this file has no "use client", although NewConversationButton calls a hook.
import {
  CopilotKitProvider,
  CopilotChatConfigurationProvider,
  CopilotChat,
  CopilotThreadsDrawer,
  useCopilotChatConfiguration,
} from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

function NewConversationButton() {
  const configuration = useCopilotChatConfiguration();

  return (
    <button
      type="button"
      onClick={() => configuration?.startNewThread()}
    >
      New conversation
    </button>
  );
}

export default function Page() {
  return (
    <CopilotKitProvider
      runtimeUrl="/api/copilotkit/prebuilt-threads-drawer"
      agentId="prebuilt-threads-drawer"
      useSingleEndpoint={false}
    >
      <CopilotChatConfigurationProvider>
        <div style={{ display: "flex", height: "100dvh" }}>
          <CopilotThreadsDrawer />
          <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <header>
              <NewConversationButton />
            </header>
            <CopilotChat />
          </main>
        </div>
      </CopilotChatConfigurationProvider>
    </CopilotKitProvider>
  );
}
