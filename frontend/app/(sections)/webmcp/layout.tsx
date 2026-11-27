// WebMCP docs: the tool "must run inside your existing CopilotKitProvider"; the page gives none.
// Provider from quickstart -> "Configure CopilotKit Provider", rendered in this section's layout.
import { Providers } from "./providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
