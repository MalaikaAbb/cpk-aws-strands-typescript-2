# genui-components-theming

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/components/theming
**Route:** http://localhost:3000/genui-components-theming
**Status:** ✅ Everything the React tab needs was provided. The "Try it" chat page is reused, since this page has none. ⚠️ One type error, the known docs issue.

## Files
| File | Docs step |
|---|---|
| `agent/sections/genui-components-theming.ts` | No backend code on the page: shared quickstart Strands agent |
| `frontend/app/api/copilotkit/genui-components-theming/[[...slug]]/route.ts` | No runtime code on the page: quickstart route |
| `providers.tsx` | "What is this?" (`theme` on `generativeUI`) + "Colors for each mode" (`dark`) |
| `layout.tsx` | "Dark mode" (`colorSchemeScript`), and imports `theming.css` |
| `theming.css` | "Set variables in CSS" |
| `_lib/theme.ts` | "The variables" (`GenerativeUITheme` in its own file; not used) |
| `_lib/map-theme.ts` | "The map" fragment (typed only, not used) |
| `page.tsx` | Not on this page: "Try it" `<CopilotChat />` |

## Adaptations
- Agent `default` (implicit) -> `genui-components-theming` (`agentId`, runtime key). `runtimeUrl`/`basePath` -> `/api/copilotkit/genui-components-theming`.
- The `dark` block of "Colors for each mode" goes into the provider's theme. Its snippet has the same top-level accent as the first snippet.
- The dark-mode `<script>` belongs in `<head>` per the docs. The root layout is shared, so the script is rendered at the top of the section layout. It toggles `dark` on `<html>`, so the class stays there after client-side navigation to other sections.
- Added import: `standardUI` in `providers.tsx`.

## Demo code / stubs
None.

## Removed (not needed for functionality)
- `typoTheme` in `_lib/map-theme.ts`, my own check of the docs claim that `"--a2ui-color-acent"` is a type error. (Before it was removed, it did give that error.)

## Known issues
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` mismatch (see the quickstart README).

## Open questions
- "The map": the `mapStyle` URLs are `tiles.example.com` placeholders, so the fragment is only type-checked (it passes), not wired up. Wired up, maps would fail to load their style.
- `Inter` is not loaded by the app (the root layout loads Geist), so `--a2ui-font-family: Inter, sans-serif` falls back to `sans-serif` unless Inter is installed locally.
- `theming.css` sets the same accent as `theme`, so you can't see that "a value in `theme` wins". To check, change one of them.

## Try these prompts
Docs give no prompts. Use the "Try it" prompt `Compare the Starter, Team, and Enterprise plans in a table`, or ask for buttons or a chart, to see the amber accent and 10px radii. Switch the OS to dark mode: `<html>` gets `dark`, and panels and surfaces use the `dark` colors.
