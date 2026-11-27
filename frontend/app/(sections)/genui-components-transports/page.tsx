"use client";
// The transports page gives no page. This is the app/page.tsx of generative-ui/components
// ("Try it"), verbatim. The transport config comes from providers.tsx.
import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return <CopilotChat />;
}
