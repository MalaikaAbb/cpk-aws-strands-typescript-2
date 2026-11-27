# genui-hashbrown

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/hashbrown
**Route:** http://localhost:3000/genui-hashbrown
**Status:** ❌ Broken. The docs' `hashbrown-renderer.tsx` is written for `@hashbrownai/*` `0.5.0-beta.4`, but this repo has `0.8.3`. In 0.8.3, `@hashbrownai/core` has no `prompt` export and `useUiKit` has no `examples` option. `prompt` is `undefined` at runtime, so the tagged template `` prompt`...` `` inside `useSalesDashboardKit()` should throw as soon as `HashBrownDashboard` renders, which takes the page down. 🧩 The six files the docs import but never give, and the agent prompt, were copied from the demo.

## Files
| File | Docs step |
|---|---|
| `page.tsx` | `page.tsx` (`<CopilotKit>` + `HashBrownDashboard` around the chat, Frontend step 1) |
| `_components/chat.tsx` | `chat.tsx` (Frontend step 2: `HashBrownRenderMessage` in the `assistantMessage` slot) |
| `_components/hashbrown-renderer.tsx` | `hashbrown-renderer.tsx` (the UI kit, `HashBrownDashboard`, `HashBrownRenderMessage`) |
| `_components/types.ts`, `suggestions.ts`, `metric-card.tsx`, `charts/{bar-chart,pie-chart,chart-config}.tsx` | Demo files the docs files import |
| `agent/sections/_genui-hashbrown/prompts.ts` | Frontend step 3 / Backend: "Tell the agent to answer with one `{ "ui": [...] }` object" (demo prompt) |
| `agent/sections/genui-hashbrown.ts` | Quickstart `main.ts` with that system prompt |
| `frontend/app/api/copilotkit/genui-hashbrown/[[...slug]]/route.ts` | Quickstart runtime (the page doesn't change it) |

## Adaptations
- `runtimeUrl` `/api/copilotkit-declarative-hashbrown` → `/api/copilotkit/genui-hashbrown`; `agent` `declarative-hashbrown-demo` → `genui-hashbrown`. The provider stays in `page.tsx`, as the docs show it.
- The docs' `src/app/demos/declarative-hashbrown/*` files (other than the page) are in `_components/`, keeping their relative layout; the page imports `./_components/hashbrown-renderer` and `./_components/chat`.
- `intelligence` / `identifyUser` dropped from the runtime.

## Demo code / stubs
From `showcase/integrations/strands-typescript/src/`, each because a docs file imports it and the docs never give it:
- `app/demos/declarative-hashbrown/types.ts` (`SalesStage`)
- `app/demos/declarative-hashbrown/suggestions.ts` (`useByocHashbrownSuggestions`)
- `app/demos/declarative-hashbrown/metric-card.tsx` (`MetricCard`)
- `app/demos/declarative-hashbrown/charts/bar-chart.tsx`, `charts/pie-chart.tsx`, and `charts/chart-config.ts` (imported by both charts)
- `agent/prompts.ts`: `BYOC_HASHBROWN_SYSTEM_PROMPT`. The docs say to tell the agent to answer with one `{ "ui": [...] }` object, and that "the bundled agents use this envelope", but don't give the prompt.

## Known issues (left as the docs have them)
- `hashbrown-renderer.tsx`: `error TS2305: Module '"@hashbrownai/core"' has no exported member 'prompt'.` The docs pin `@hashbrownai/core` / `@hashbrownai/react` `0.5.0-beta.4`, and the repo has `0.8.3`, where `prompt` doesn't exist (also not in the runtime bundle).
- `hashbrown-renderer.tsx`: `error TS2353: Object literal may only specify known properties, and 'examples' does not exist in type 'UiKitOptions<...>'.` The same version mismatch, in `useUiKit({ examples: ..., components: [...] })`.
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries` — the known `@ag-ui/client` 1.0.2 vs 1.0.5 issue, see the quickstart README.
- The charts need `recharts` (the docs say so: "The chart components also need `recharts` and `zod`"), which is not in `frontend/package.json`. It resolves today only as a transitive dependency in the root `node_modules`.
- Missing package: `@hashbrownai/core@0.5.0-beta.4` and `@hashbrownai/react@0.5.0-beta.4`, the versions the docs pin. The repo's `0.8.3` doesn't match the docs code.

## Open questions
- The docs give no system prompt for the agent. The demo's prompt was copied, because without it the agent answers in prose and nothing renders.

## Try these prompts
The docs give no prompts. The copied demo suggestions show as chips in the chat.
