// The shared-state page gives no provider (it says useAgent works in any component under <CopilotKit>).
// Provider from quickstart -> "Configure CopilotKit Provider", rendered in this section's layout.
import { Providers } from "./providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
