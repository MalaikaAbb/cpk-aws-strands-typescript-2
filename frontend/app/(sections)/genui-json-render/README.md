# genui-json-render

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/json-render
**Route:** http://localhost:3000/genui-json-render
**Status:** 🧩 The four docs files (`chat.tsx`, `json-render-renderer.tsx`, `catalog.ts`, `registry.tsx`) are verbatim, except that the demo suggestions call in `chat.tsx` was removed. They import files the docs never give: the spec type, the metric card and two charts. The type comes from the demo, and the metric card and charts are minimal unstyled stand-ins. The agent's system prompt was copied from the demo. ⚠️ The only type error is the known docs `HttpAgent` one.

## Files
| File | Docs step |
|---|---|
| `_components/chat.tsx` | `chat.tsx` (Frontend step 3: the renderer in the `assistantMessage` slot) |
| `_components/json-render-renderer.tsx` | `json-render-renderer.tsx` (Frontend step 2) |
| `_components/catalog.ts`, `_components/registry.tsx` | `catalog.ts` and `registry.tsx` (Frontend step 1) |
| `_components/types.ts` | Demo type the renderer imports |
| `_components/metric-card.tsx`, `charts/{bar-chart,pie-chart}.tsx` | Minimal stand-ins for the components `registry.tsx` imports |
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
Kept because the docs code fails without it:
- `_components/types.ts` (`JsonRenderSpec`, imported by `json-render-renderer.tsx`), from the demo.
- `_components/metric-card.tsx`, `charts/bar-chart.tsx`, `charts/pie-chart.tsx`: `registry.tsx` imports `MetricCard`, `BarChart` and `PieChart` and their props types. Each is a plain, unstyled stand-in. The metric card shows the label, value and trend. Each chart shows its title, description and data as a `<ul>` of `label: value`. The docs' code doesn't use recharts, so the stand-ins don't either.
- `agent/sections/_genui-json-render/prompts.ts`: `BYOC_JSON_RENDER_SYSTEM_PROMPT` from the demo's `src/agent/prompts.ts`. The docs say to tell the agent to answer with one `{ root, elements }` object, but don't give the prompt. Without it the agent answers in prose and nothing renders.

## Removed (not needed for functionality)
- `useByocJsonRenderSuggestions()` and its import, from the docs' own `chat.tsx` (demo suggestion chips), plus the demo's `suggestions.ts`.
- The demo's styled recharts / SVG charts, `charts/chart-config.ts`, and the styled metric card.
- The `<main className="h-screen">` wrapper in `page.tsx`.

## Known issues (left as the docs have them)
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries` — the known `@ag-ui/client` 1.0.2 vs 1.0.5 issue, see the quickstart README.
- The docs say the demos use `@json-render/react` and `@json-render/core` 0.18.0. This repo has 0.23.2. It type-checks.
- As the docs say, `parseSpec` does not validate props against the Zod schemas.

## Open questions
- The docs give no system prompt for the agent. The demo's prompt was copied, because without it the agent answers in prose and nothing renders.

## Try these prompts
Docs give no prompts. (The example output is a revenue `MetricCard` with a `BarChart` child, so something like "Show total revenue with a bar chart by region" exercises it.)
