"use client";
// The catalogs page gives no page. This is the app/page.tsx of generative-ui/components
// ("Try it"), verbatim, so the agent can be asked to render the catalog's components.
import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return <CopilotChat />;
}
