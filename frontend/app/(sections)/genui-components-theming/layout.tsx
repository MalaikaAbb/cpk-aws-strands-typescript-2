// Provider layout as in generative-ui/components ("Wrap your layout in it"), rendered in
// this section's layout instead of the root layout. Also:
// - Docs: theming -> "Dark mode" (React tab): `colorSchemeScript`, verbatim. The docs put it
//   in `<head>`. Only the shared root layout can render <head>, so the <script> is rendered
//   at the top of this section's layout instead.
// - Docs: theming -> "Set variables in CSS" (./theming.css).
import { Providers } from "./providers";
import "./theming.css";

const colorSchemeScript = `(() => {
  const media = matchMedia("(prefers-color-scheme: dark)");
  const apply = () => document.documentElement.classList.toggle("dark", media.matches);
  apply();
  media.addEventListener("change", apply);
})();`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: colorSchemeScript }} />
      <Providers>{children}</Providers>
    </>
  );
}
