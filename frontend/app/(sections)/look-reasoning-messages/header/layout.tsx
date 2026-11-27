// Adaptation: this docs snippet shows only <CopilotChat>, with no provider, so the
// quickstart provider (../providers.tsx) is rendered in this sub-route's layout.
import { Providers } from "../providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
