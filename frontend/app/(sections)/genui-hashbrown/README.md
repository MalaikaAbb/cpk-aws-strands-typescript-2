# genui-hashbrown

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/hashbrown
**Route:** http://localhost:3000/genui-hashbrown
**Status:** 🧩 The three docs files (`page.tsx`, `chat.tsx`, `hashbrown-renderer.tsx`) are verbatim, except that the demo suggestions call in `chat.tsx` was removed. They import files the docs never give: `SalesStage`, the metric card and two charts. `SalesStage` comes from the demo, and the metric card and charts are minimal unstyled stand-ins. The agent's system prompt was copied from the demo. With `@hashbrownai/*` pinned to the docs' `0.5.0-beta.4`, the renderer type-checks. ⚠️ The only type error is the known docs `HttpAgent` one.

## Files
| File | Docs step |
|---|---|
| `page.tsx` | `page.tsx` (`<CopilotKit>` + `HashBrownDashboard` around the chat, Frontend step 1) |
| `_components/chat.tsx` | `chat.tsx` (Frontend step 2: `HashBrownRenderMessage` in the `assistantMessage` slot) |
| `_components/hashbrown-renderer.tsx` | `hashbrown-renderer.tsx` (the UI kit, `HashBrownDashboard`, `HashBrownRenderMessage`) |
| `_components/types.ts` | Demo type the renderer imports (`SalesStage`) |
| `_components/metric-card.tsx`, `charts/{bar-chart,pie-chart}.tsx` | Minimal stand-ins for the components the renderer imports |
| `agent/sections/_genui-hashbrown/prompts.ts` | Frontend step 3 / Backend: "Tell the agent to answer with one `{ "ui": [...] }` object" (demo prompt) |
| `agent/sections/genui-hashbrown.ts` | Quickstart `main.ts` with that system prompt |
| `frontend/app/api/copilotkit/genui-hashbrown/[[...slug]]/route.ts` | Quickstart runtime (the page doesn't change it) |

## Adaptations
- `runtimeUrl` `/api/copilotkit-declarative-hashbrown` → `/api/copilotkit/genui-hashbrown`; `agent` `declarative-hashbrown-demo` → `genui-hashbrown`. The provider stays in `page.tsx`, as the docs show it.
- The docs' `src/app/demos/declarative-hashbrown/*` files (other than the page) are in `_components/`, keeping their relative layout. The page imports `./_components/hashbrown-renderer` and `./_components/chat`.
- `intelligence` / `identifyUser` dropped from the runtime.

## Demo code / stubs
Kept because the docs code fails without it:
- `_components/types.ts`: the `SalesStage` union from the demo's `types.ts` (`hashbrown-renderer.tsx` imports it).
- `_components/metric-card.tsx`, `charts/bar-chart.tsx`, `charts/pie-chart.tsx`: `hashbrown-renderer.tsx` imports `MetricCard`, `BarChart` and `PieChart`. Each is a plain, unstyled stand-in. The metric card shows the label and value. Each chart shows its title, description and data as a `<ul>` of `label: value`. The docs' code doesn't use recharts, so the stand-ins don't either.
- `agent/sections/_genui-hashbrown/prompts.ts`: `BYOC_HASHBROWN_SYSTEM_PROMPT` from the demo's `src/agent/prompts.ts`. The docs say to tell the agent to answer with one `{ "ui": [...] }` object, but don't give the prompt. Without it the agent answers in prose and nothing renders.

## Removed (not needed for functionality)
- `useByocHashbrownSuggestions()` and its import, from the docs' own `chat.tsx` (demo suggestion chips), plus the demo's `suggestions.ts`.
- The demo's styled recharts / SVG charts, `charts/chart-config.ts`, the styled metric card (with its trend colors), and the `SALES_STAGES` array in `types.ts`.

## Known issues (left as the docs have them)
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries` — the known `@ag-ui/client` 1.0.2 vs 1.0.5 issue, see the quickstart README.
- The earlier `prompt` / `examples` errors (`@hashbrownai` 0.8.3) are gone, now that `main` pins `0.5.0-beta.4`.

## Open questions
- The docs give no system prompt for the agent. The demo's prompt was copied, because without it the agent answers in prose and nothing renders.
- The root `package.json` sets `allowScripts` to `false` for `@hashbrownai/core` and `@hashbrownai/react`, so their install scripts don't run. Whether the parser works without them is for the live test.

## Try these prompts
Docs give no prompts. (The kit is a sales dashboard, so something like "Show me a sales dashboard" exercises it.)
