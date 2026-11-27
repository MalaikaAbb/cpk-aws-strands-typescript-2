// Docs: prebuilt-components/copilot-threads-drawer -> "Use the Drawer with a sidebar chat" (app/page.tsx).
// Adaptations: same as ../page.tsx (runtimeUrl, agentId on the provider, useSingleEndpoint={false}).
// `YourMainContent` is not given by the docs or the demo: a minimal placeholder is in
// ../_components/your-main-content.tsx.
import {
  CopilotKitProvider,
  CopilotChatConfigurationProvider,
  CopilotSidebar,
  CopilotThreadsDrawer,
} from "@copilotkit/react-core/v2";
import "@copilotkit/react-core/v2/styles.css";
import { YourMainContent } from "../_components/your-main-content";

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
          <main style={{ flex: 1 }}>
            <YourMainContent />
            <CopilotSidebar defaultOpen={true} />
          </main>
        </div>
      </CopilotChatConfigurationProvider>
    </CopilotKitProvider>
  );
}
