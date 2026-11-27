"use client";
// The standard-catalog page gives no page. This is the app/page.tsx of
// generative-ui/components ("Try it"), verbatim. The catalog comes from providers.tsx.
import { CopilotChat } from "@copilotkit/react-core/v2";

export default function Page() {
  return <CopilotChat />;
}
