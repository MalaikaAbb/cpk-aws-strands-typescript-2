// Provider layout as in generative-ui/components ("Wrap your layout in it"), rendered in
// this section's layout instead of the root layout. Also imports the page's CSS rule.
import { Providers } from "./providers";
import "./surfaces.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
