// Docs: prebuilt-components/copilot-threads-drawer -> "Set up the Threads Drawer" (app/page.tsx).
// Adaptations: runtimeUrl -> /api/copilotkit/prebuilt-threads-drawer; the docs pass no agent
// (resolves to "default"), so agentId="prebuilt-threads-drawer" is set on <CopilotKitProvider>;
// useSingleEndpoint={false} per intelligence/quickstart "Connect your frontend".
// The provider stays in the page because the docs put it there.
import {
  CopilotKitProvider,
  CopilotChatConfigurationProvider,
  CopilotChat,
  CopilotThreadsDrawer,
} from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";

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
          <CopilotChat />
        </div>
      </CopilotChatConfigurationProvider>
    </CopilotKitProvider>
  );
}
