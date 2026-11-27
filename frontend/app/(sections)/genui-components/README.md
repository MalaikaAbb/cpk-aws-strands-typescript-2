# genui-components

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/components
**Route:** http://localhost:3000/genui-components
**Status:** ✅ Everything the React tab needs was provided. The page's agent (a TanStack `BuiltInAgent`) is replaced with the Strands agent, per the user's instruction. ⚠️ One type error, the known docs issue (see below).

## Files
| File | Docs step |
|---|---|
| `agent/sections/genui-components.ts` | Step 2 "Add the runtime and an agent", Strands instead of BuiltInAgent (shared quickstart agent) |
| `frontend/app/api/copilotkit/genui-components/[[...slug]]/route.ts` | Step 2, as the quickstart route ("Your runtime needs no change") |
| `providers.tsx` | Step 3 "Turn on generative UI" (`app/providers.tsx`) |
| `layout.tsx` | Step 3 (`app/layout.tsx`) |
| `page.tsx` | Step 3 (`app/page.tsx`) |

## Adaptations
- **Strands, not BuiltInAgent.** The docs' step 2 route builds a TanStack `BuiltInAgent`. Per the user's instruction it is not used. The page says: "Already have CopilotKit running? Do step 3 only. Your runtime needs no change ... Your agent must pass the run's tools and context to its model". So the backend is the shared quickstart Strands agent (`createQuickstartApp("genui-components")`) and the route is the quickstart route (HttpAgent). Step 1's `@tanstack/ai` packages are therefore not needed.
- Agent name `default` (implicit in the docs) -> `genui-components`: runtime key, and `agentId="genui-components"` on `CopilotKitProvider`.
- `runtimeUrl` -> `/api/copilotkit/genui-components`; `basePath` -> `/api/copilotkit/genui-components`.
- The docs' `app/layout.tsx` becomes this section's `layout.tsx` (no `<html>`/`<body>`, the root layout has them).
- No intelligence (as quickstart).

## Demo code / stubs
None.

## Known issues
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries` — the known `@ag-ui/client` version mismatch, see the quickstart README.

## Open questions
- The docs' BuiltInAgent has the system prompt "You are a helpful assistant. When a visual answer helps, render it with generative UI." The Strands path ("Do step 3 only") keeps the quickstart prompt "You are a helpful AI assistant." The runtime's `render_ui` guide should be enough, but the model may render less eagerly than with the docs prompt.
- The docs' provider sets no `useSingleEndpoint` (quickstart used `false`). Left as the docs have it (client default is "auto").

## Try these prompts (from the docs)
- `Compare the Starter, Team, and Enterprise plans in a table`
- Follow-up: `add a column for support` (the table should change in place)

Also: Inspector -> **Inspect** -> **Generative UI** shows the catalog, targets/surfaces and the prompt text.
