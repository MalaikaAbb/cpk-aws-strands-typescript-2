# look-css

**Docs:** https://docs.copilotkit.ai/strands-typescript/custom-look-and-feel/css
**Route:** http://localhost:3000/look-css (plus `/look-css/my-chat` and `/look-css/labels`)
**Status:** 🧩 The docs' `theme.css` snippets use `--halcyon-*` variables they never define. The definitions were copied from the demo. The page markup around `<CopilotChat>` is described but not given, so a minimal wrapper was added. ⚠️ One type error, caused by the docs (see below).

## Routes
| Route | Docs section |
|---|---|
| `/look-css` | Scoping the theme + the two `theme.css` snippets (CSS variables, user message bubble), on a `<CopilotChat />` inside `.chat-css-demo-scope` |
| `/look-css/my-chat` | The v2 `.my-chat [data-copilotkit] { --primary: #222222; }` rule, on a `<CopilotSidebar />` inside `.my-chat` |
| `/look-css/labels` | Custom Labels |

The section `globals.css` (every `globals.css` snippet) is loaded by the section layout, so it applies on all three routes.

## Files
| File | Docs step |
|---|---|
| `agent/sections/look-css.ts` | No backend code on this page: the shared quickstart agent |
| `frontend/app/api/copilotkit/look-css/[[...slug]]/route.ts` | No runtime changes on this page: the quickstart runtime route |
| `layout.tsx`, `providers.tsx` | No provider code on this page: the quickstart provider. `layout.tsx` also imports the section `globals.css` |
| `page.tsx` | Scoping the theme (`import "./theme.css";`) |
| `theme.css` | `theme.css` snippets from "CSS Variables (Easiest)" and "Custom CSS" (verbatim), plus the demo's `--halcyon-*` token block |
| `globals.css` | All `globals.css` snippets, in page order: the v2 `.my-chat` rule, v2 design tokens (light + `.dark`), Custom CSS classes, Custom Fonts |
| `my-chat/page.tsx` | The `.my-chat` wrapper for the v2 `--primary` rule |
| `labels/page.tsx` | Custom Labels (verbatim) |

## Adaptations
- The agent name is `look-css`. The runtime URL is `/api/copilotkit/look-css`, and the agent is at `http://localhost:8000/look-css`. The docs' components pass no `agentId`, so they use the provider's agent.
- The provider is in this section's `layout.tsx` (via `providers.tsx`), as quickstart does.
- The docs' `globals.css` snippets go in `(sections)/look-css/globals.css`, imported by the section layout. The root `globals.css` is shared and is not edited.
- Intelligence is not used (as quickstart).

### Skipped (v1 only)
The page marks these as v1-only (`@copilotkit/react-ui`, deprecated), so they were not implemented:
- The `CopilotKitCSSProperties` inline-style example (`--copilot-kit-primary-color`) and the `--copilot-kit-*` variable reference.
- The Custom Icons `icons` prop example ("The v2 components have no `icons` prop").

## Demo code / stubs
- The `.chat-css-demo-scope { --halcyon-*: … }` token block (light mode, `@region[design-tokens]`) from `showcase/integrations/strands-typescript/src/app/demos/chat-customization-css/theme.css`, copied to the top of `theme.css`. Without it every `var(--halcyon-*)` in the docs' snippets resolves to nothing. The demo's Google Fonts `@import` was not copied, so `--halcyon-mono` falls back to the system monospace font.
- Minimal additions: the `.chat-css-demo-scope` wrapper div + `<CopilotChat />` in `page.tsx` (the docs describe "the wrapper div holding `<CopilotChat>`" but show only the import line), and the `.my-chat` wrapper + `<CopilotSidebar />` in `my-chat/page.tsx` (taken from the v1 example's markup, without its v1 `style`).

## Known issues (left as the docs have them)
- **Type error in `route.ts`:** `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` version mismatch. See the quickstart README.
- The section CSS files are global stylesheets once loaded (Next.js does not unload route CSS). After visiting this section, the unscoped `globals.css` rules (`[data-copilotkit]`, `.copilotKitMessages`, ...) can also affect other sections until a full page reload. This only matters when testing on `main`.

## Open questions
- **Two user-bubble rules compete.** The `globals.css` "Custom CSS" snippet sets `.copilotKitUserMessage { background: #007AFF; }`, while the `theme.css` snippet sets `.chat-css-demo-scope .copilotKitMessage.copilotKitUserMessage { background: transparent; }`. On `/look-css`, the more specific `theme.css` rule should win. The page doesn't say whether the two are meant to be used together. Both were implemented because both are on the page.
- **The global `[data-copilotkit]` token block vs CopilotKit's own.** The docs say CopilotKit declares each token on the `[data-copilotkit]` element, which is the same selector and specificity as the docs' override. Whether the override wins depends on stylesheet order (the root layout loads CopilotKit's `styles.css` first).

## Try these prompts
Docs give no prompts. What to check, from the prose:
- `/look-css`: send any message (for example `Please tell me a joke.`). The chat should use the warm paper and ember palette, square corners (`--radius: 0px`), and the user bubble should be a mono "→" card with an ember left border.
- `/look-css/my-chat`: primary-colored elements of the sidebar should be `#222222`.
- `/look-css/labels`: the welcome text reads "Hello! How can I help you today?" and the input placeholder "Ask me anything!".
- All routes: messages and input use Arial, and the message list has `2rem` padding (Custom CSS / Custom Fonts).
