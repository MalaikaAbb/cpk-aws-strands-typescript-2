# prebuilt-popup

**Docs:** https://docs.copilotkit.ai/strands-typescript/prebuilt-components/popup
**Route:** http://localhost:3000/prebuilt-popup
**Status:** 🧩 The docs render two demo components (`<MainContent />`, `<Suggestions />`) without defining them. They were copied from the demo. ⚠️ One type error, caused by the docs (see below).

## Files
| File | Docs step |
|---|---|
| `agent/sections/prebuilt-popup.ts` | No backend code on this page: the shared quickstart agent |
| `frontend/app/api/copilotkit/prebuilt-popup/[[...slug]]/route.ts` | No runtime changes on this page: the quickstart runtime route |
| `page.tsx` | Basic setup (imports, `<CopilotKit>` + `<MainContent />` + `<CopilotPopup agentId defaultOpen labels>` + `<Suggestions />`) |
| `_components/main-content.tsx` | `MainContent` (demo code) |
| `_components/suggestions-mount.tsx`, `_lib/suggestions.ts` | `Suggestions` and its hook `usePrebuiltPopupSuggestions` (demo code) |

"Configuring the popup" has only a props table and no code.

## Adaptations
- The docs' agent name is already `prebuilt-popup` (the slug), so `agent` and `agentId` are unchanged. The runtime URL is `/api/copilotkit/prebuilt-popup`, and the agent is at `http://localhost:8000/prebuilt-popup`.
- The docs put `<CopilotKit>` inside the page, so it stays in `page.tsx`. There is no section `layout.tsx`.
- The docs give the provider as a JSX fragment. It is returned from a default-export `Page` component.
- The docs' provider has no `useSingleEndpoint`, so it is left out (the client uses its `"auto"` transport).
- Intelligence is not used (as quickstart).

## Demo code / stubs
From `showcase/integrations/strands-typescript/src/app/demos/prebuilt-popup/`:
- `main-content.tsx` → `_components/main-content.tsx` (`MainContent`, uses `lucide-react`).
- `suggestions-mount.tsx` → `_components/suggestions-mount.tsx` (`Suggestions`; import path adjusted to `../_lib/suggestions`).
- `suggestions.ts` → `_lib/suggestions.ts` (`usePrebuiltPopupSuggestions`, needed by `Suggestions`).

The docs say "`<MainContent />` and `<Suggestions />` are demo components. Replace them with your own content." The import lines in `page.tsx` were added to match.

## Known issues (left as the docs have them)
- **Type error in `route.ts`:** `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` version mismatch. See the quickstart README.

## Try these prompts
Docs give no prompts. The demo `Suggestions` component adds three pills: **Say hi**, **Limerick**, **Is 17 prime?**

Also check the prose: the popup starts open (`defaultOpen={true}`), the input placeholder reads "Ask the popup anything...", and the page layout does not reflow (the popup overlays it). The corner bubble toggles it.
