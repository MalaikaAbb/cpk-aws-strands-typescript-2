// Provider layout as in generative-ui/components ("Wrap your layout in it"), rendered in
// this section's layout instead of the root layout.
import { Providers } from "./providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
