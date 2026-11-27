// Docs: prebuilt-components/copilot-threads-drawer -> "Customization" -> Slots (no file named).
// Host: the "Set up the Threads Drawer" page (../page.tsx), with the docs' slot snippet in
// place of the bare <CopilotThreadsDrawer />.
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
          <CopilotThreadsDrawer>
            <span slot="header">My conversations</span>
          </CopilotThreadsDrawer>
          <CopilotChat />
        </div>
      </CopilotChatConfigurationProvider>
    </CopilotKitProvider>
  );
}
