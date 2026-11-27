# genui-json-render

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/json-render
**Route:** http://localhost:3000/genui-json-render
**Status:** 🧩 The four docs files (`chat.tsx`, `json-render-renderer.tsx`, `catalog.ts`, `registry.tsx`) are verbatim. They import six files the docs never give (types, suggestions, the metric card and the charts). Those, and the agent's system prompt, were copied from the demo. ⚠️ The only type error is the known docs `HttpAgent` one.

## Files
| File | Docs step |
|---|---|
| `_components/chat.tsx` | `chat.tsx` (Frontend step 3: the renderer in the `assistantMessage` slot) |
| `_components/json-render-renderer.tsx` | `json-render-renderer.tsx` (Frontend step 2) |
| `_components/catalog.ts`, `_components/registry.tsx` | `catalog.ts` and `registry.tsx` (Frontend step 1) |
| `_components/types.ts`, `suggestions.ts`, `metric-card.tsx`, `charts/{bar-chart,pie-chart,chart-config}.tsx` | Demo files the docs files import |
| `providers.tsx`, `layout.tsx` | Not in the docs: the quickstart provider |
| `page.tsx` | Not in the docs: renders `<Chat />` |
| `agent/sections/_genui-json-render/prompts.ts` | Frontend step 4 / Backend: "Tell the agent to answer with one `{ root, elements }` object" (demo prompt) |
| `agent/sections/genui-json-render.ts` | Quickstart `main.ts` with that system prompt |
| `frontend/app/api/copilotkit/genui-json-render/[[...slug]]/route.ts` | Quickstart runtime (the page doesn't change it) |

## Adaptations
- `AGENT_ID` `"byoc_json_render"` → `"genui-json-render"` (in `chat.tsx`); the provider and the runtime use the same id.
- The docs' `src/app/demos/declarative-json-render/*` files are in `_components/`, keeping their relative layout (`./charts/...`).
- `intelligence` / `identifyUser` dropped from the runtime.

## Demo code / stubs
From `showcase/integrations/strands-typescript/src/`, each because a docs file imports it and the docs never give it:
- `app/demos/declarative-json-render/types.ts` (`JsonRenderSpec`, imported by `json-render-renderer.tsx`)
- `app/demos/declarative-json-render/suggestions.ts` (`useByocJsonRenderSuggestions`, called in `chat.tsx`)
- `app/demos/declarative-json-render/metric-card.tsx` (`MetricCard`, imported by `registry.tsx`)
- `app/demos/declarative-json-render/charts/bar-chart.tsx`, `charts/pie-chart.tsx` (imported by `registry.tsx`) and `charts/chart-config.ts` (imported by both charts)
- `agent/prompts.ts`: `BYOC_JSON_RENDER_SYSTEM_PROMPT`. The docs say the agent must be told to answer with one `{ root, elements }` object, and refer to "the agent prompts", but don't give the prompt.

Not copied: the demo's `page.tsx` (a page and the quickstart provider are used instead) and its `createModel` factory.

## Known issues (left as the docs have them)
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries` — the known `@ag-ui/client` 1.0.2 vs 1.0.5 issue, see the quickstart README.
- The docs say the demos use `@json-render/react` and `@json-render/core` 0.18.0. This repo has 0.23.2. It type-checks.
- The demo charts need `recharts`, which is not in `frontend/package.json`. It resolves today only as a transitive dependency in the root `node_modules`.
- As the docs say, `parseSpec` does not validate props against the Zod schemas.

## Open questions
- The docs give no system prompt for the agent. The demo's prompt was copied, because without it the agent answers in prose and nothing renders.

## Try these prompts
The docs give no prompts. The copied demo suggestions (shown as chips in the chat) are:
- `Show me the sales dashboard with metrics and a revenue chart`
- `Break down revenue by category as a pie chart`
- `Show me monthly expenses as a bar chart`
