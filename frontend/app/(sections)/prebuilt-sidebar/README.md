# prebuilt-sidebar

**Docs:** https://docs.copilotkit.ai/strands-typescript/prebuilt-components/sidebar
**Route:** http://localhost:3000/prebuilt-sidebar
**Status:** ✅ The sidebar works with the docs' code. Two docs lines that render demo components (`<MainContent />`, `<Suggestions />`) were removed (see below). ⚠️ One type error, caused by the docs (see below).

## Files
| File | Docs step |
|---|---|
| `agent/sections/prebuilt-sidebar.ts` | No backend code on this page: the shared quickstart agent |
| `frontend/app/api/copilotkit/prebuilt-sidebar/[[...slug]]/route.ts` | No runtime changes on this page: the quickstart runtime route |
| `page.tsx` | Basic setup (imports, `<CopilotKit>` + `<CopilotSidebar>`) and Configuring the sidebar (the same `<CopilotSidebar agentId defaultOpen>` line) |

## Adaptations
- The docs' agent name is already `prebuilt-sidebar` (the slug), so `agent` and `agentId` are unchanged. The runtime URL is `/api/copilotkit/prebuilt-sidebar`, and the agent is at `http://localhost:8000/prebuilt-sidebar`.
- The docs put `<CopilotKit>` inside the page, so it stays in `page.tsx`. There is no section `layout.tsx`.
- The docs give the provider as a JSX fragment. It is returned from a default-export `Page` component.
- The docs' provider has no `useSingleEndpoint`, so it is left out (the client uses its `"auto"` transport).
- Intelligence is not used (as quickstart).

## Demo code / stubs
None.

## Removed (not needed for functionality)
- The docs' `<MainContent />` and `<Suggestions />` lines. The docs say they "are demo components. Replace them with your own content." `MainContent` is decorative page text and `Suggestions` only adds suggestion pills. Their demo copies (`_components/`, `_lib/`) were deleted too.

## Known issues (left as the docs have them)
- **Type error in `route.ts`:** `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` version mismatch. See the quickstart README.

## Try these prompts
Docs give no prompts. Any message works, for example `Please tell me a joke.`

Also check the prose: the sidebar starts open (`defaultOpen={true}`). On screens 768px and wider the open sidebar adds a margin to the page body (the page itself is empty now). The launcher toggles it.
