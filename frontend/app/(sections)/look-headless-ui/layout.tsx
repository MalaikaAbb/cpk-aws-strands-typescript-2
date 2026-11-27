// Adaptation (same as quickstart): the provider is rendered in this section's layout,
// not in the root layout.
import { Providers } from "./providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
