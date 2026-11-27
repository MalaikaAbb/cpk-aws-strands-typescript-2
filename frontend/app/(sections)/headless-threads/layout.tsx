// The headless-threads page gives no provider: it uses the one from intelligence/quickstart
// ("Connect your frontend"), rendered in this section's layout (as quickstart does).
import { Providers } from "./providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
