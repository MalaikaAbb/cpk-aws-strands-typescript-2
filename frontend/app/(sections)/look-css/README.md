# look-css

**Docs:** https://docs.copilotkit.ai/strands-typescript/custom-look-and-feel/css
**Route:** http://localhost:3000/look-css (plus `/look-css/labels`)
**Status:** ❌ The `theme.css` snippets have no visible effect as given. Every rule is scoped under `.chat-css-demo-scope`, and the docs never show the markup that adds that class. Their `--halcyon-*` variables are also never defined. The `globals.css` snippets and Custom Labels work as given. ⚠️ One type error, caused by the docs (see below).

## Routes
| Route | Docs section |
|---|---|
| `/look-css` | Scoping the theme (`import "./theme.css";`) on a `<CopilotChat />` |
| `/look-css/labels` | Custom Labels |

The section `globals.css` (every `globals.css` snippet) is loaded by the section layout, so it applies on both routes.

## Files
| File | Docs step |
|---|---|
| `agent/sections/look-css.ts` | No backend code on this page: the shared quickstart agent |
| `frontend/app/api/copilotkit/look-css/[[...slug]]/route.ts` | No runtime changes on this page: the quickstart runtime route |
| `layout.tsx`, `providers.tsx` | No provider code on this page: the quickstart provider. `layout.tsx` also imports the section `globals.css` |
| `page.tsx` | Scoping the theme (`import "./theme.css";`), plus a `<CopilotChat />` to style |
| `theme.css` | The `theme.css` snippets from "CSS Variables (Easiest)" and "Custom CSS" (verbatim) |
| `globals.css` | All `globals.css` snippets, in page order: the v2 `.my-chat` rule, v2 design tokens (light + `.dark`), Custom CSS classes, Custom Fonts |
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
None. The only addition is the `<CopilotChat />` in `page.tsx`, so the CSS has a chat to style.

## Removed (not needed for functionality)
- The demo's `--halcyon-*` token block, copied from `chat-customization-css/theme.css`. The docs' `var(--halcyon-*)` references are now undefined, as the docs leave them.
- The `.chat-css-demo-scope` wrapper div around `<CopilotChat />`.
- The `/look-css/my-chat` route, which was only a `.my-chat` wrapper div (not from the docs) around `<CopilotSidebar />`. Without the wrapper the `.my-chat [data-copilotkit]` rule in `globals.css` matches nothing.

## Known issues (left as the docs have them)
- **The `theme.css` rules match nothing.** Every selector starts with `.chat-css-demo-scope`. The docs say the demo applies them "only to the wrapper div holding `<CopilotChat>`", but they never give that div, so nothing on the page carries the class. The rules also use `--halcyon-*` variables that the docs never define.
- **The `.my-chat [data-copilotkit]` rule matches nothing.** The docs give no `.my-chat` element.
- **Type error in `route.ts`:** `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` version mismatch. See the quickstart README.
- The section CSS files are global stylesheets once loaded (Next.js does not unload route CSS). After visiting this section, the unscoped `globals.css` rules (`[data-copilotkit]`, `.copilotKitMessages`, ...) can also affect other sections until a full page reload. This only matters when testing on `main`.

## Open questions
- **The global `[data-copilotkit]` token block vs CopilotKit's own.** The docs say CopilotKit declares each token on the `[data-copilotkit]` element, which is the same selector and specificity as the docs' override. Whether the override wins depends on stylesheet order (the root layout loads CopilotKit's `styles.css` first).

## Try these prompts
Docs give no prompts. What to check, from the prose (send any message, for example `Please tell me a joke.`):
- Both routes: the `globals.css` v2 tokens (blue-violet `--primary`, `0.625rem` radius), Arial in messages and input, `2rem` padding on the message list, and a `#007AFF` user message (Custom CSS / Custom Fonts).
- `/look-css`: the `theme.css` palette is not expected to appear (see Known issues).
- `/look-css/labels`: the welcome text reads "Hello! How can I help you today?" and the input placeholder "Ask me anything!".
