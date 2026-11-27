// Docs: the page gives no provider code -> the quickstart provider (app/layout.tsx).
// The docs' `globals.css` snippets go in this section's own globals.css, imported here
// (the root globals.css is shared and is not edited).
import { Providers } from "./providers";
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
