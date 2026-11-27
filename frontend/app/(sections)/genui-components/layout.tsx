// Docs: generative-ui/components -> "Turn on generative UI" (app/layout.tsx).
// Adaptation: rendered in this section's layout instead of the root layout
// (the root layout already provides <html>/<body>).
import { Providers } from "./providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
