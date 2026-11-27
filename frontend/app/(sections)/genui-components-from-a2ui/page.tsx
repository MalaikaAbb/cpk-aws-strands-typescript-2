"use client";
// The docs give no page. Minimal chat ("The chat renders surfaces on its own"), wrapped in
// the "After" provider. The provider is mounted here instead of in a section layout,
// because the a2ui-v1 sub-routes mount their own (v1 a2ui) providers.
import { CopilotChat } from "@copilotkit/react-core/v2";
import { Providers } from "./providers";

export default function Page() {
  return (
    <Providers>
      <CopilotChat />
    </Providers>
  );
}
