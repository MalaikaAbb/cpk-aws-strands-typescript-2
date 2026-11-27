// Docs: quickstart -> "Render Providers in app/layout.tsx".
// Adaptation: rendered in this section's layout instead of the root layout
// (the root layout already imports the v2 styles.css and globals.css).
import { Providers } from "./providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
