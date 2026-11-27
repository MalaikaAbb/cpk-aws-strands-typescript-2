# genui-tool-rendering

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/tool-rendering
**Route:** http://localhost:3000/genui-tool-rendering (with sub-routes, see below)
**Status:** 🧩 Demo code was needed. `getWeatherImpl` and the shadcn `Card`/`Badge` come from the demo. ❌ Two "Grouping tool calls" snippets are broken: `MyToolRow` and `ToolTimeline` are never defined.

## Routes
| Route | Docs section |
|---|---|
| `/genui-tool-rendering` | Per-tool renderers (`app/page.tsx` + `app/tool-renderers.tsx`): the docs-only example |
| `/genui-tool-rendering/default-catchall` | Default tool rendering (zero-config): `useDefaultRenderTool()` |
| `/genui-tool-rendering/custom-catchall` | Custom catch-all: `useDefaultRenderTool({ render })` + `CustomCatchallRenderer` |
| `/genui-tool-rendering/with-catchall` | Per-tool renderers compose with a catch-all (`<ToolRenderers />` + the wildcard) |
| `/genui-tool-rendering/group-opt-in` | Grouping: `useDefaultRenderTool({ render: MyToolRow, group: true })` (broken) |
| `/genui-tool-rendering/display-line` | Grouping: `<CopilotChat messageView={{ toolCallDisplay: "line" }} />` |
| `/genui-tool-rendering/group-slot` | Grouping: the `toolCallsView.group: ToolTimeline` slot (broken) |

## Files
| File | Docs step |
|---|---|
| `agent/sections/genui-tool-rendering.ts` | The quickstart `main.ts` agent, with `tools: [getWeather]` |
| `agent/sections/_genui-tool-rendering/tools.ts` | The backend tool definition (`src/agent/tools.ts`) |
| `agent/sections/_genui-tool-rendering/tool-impls.ts` | Demo code: `getWeatherImpl` |
| `frontend/app/api/copilotkit/genui-tool-rendering/[[...slug]]/route.ts` | The quickstart runtime (this page doesn't change it) |
| `page.tsx` | Per-tool renderers: `app/page.tsx` |
| `_components/tool-renderers.tsx` | Per-tool renderers: `app/tool-renderers.tsx` |
| `_components/weather-card.tsx`, `_components/flight-list-card.tsx` | Per-tool renderers: `components/*.tsx` |
| `_lib/parse-json-result.ts` | Per-tool renderers: `lib/parse-json-result.ts` |
| `_components/custom-catchall-renderer.tsx` | Custom catch-all: `custom-catchall-renderer.tsx` |
| `_components/card.tsx`, `_components/badge.tsx` | Demo code: the shadcn Card and Badge the catch-all uses |
| `<sub-route>/page.tsx` | One per snippet, as listed under Routes |

## Adaptations
- The agent name is `genui-tool-rendering`, not `default`. The runtime URL is `/api/copilotkit/genui-tool-rendering`.
- `app.listen(8000)` is replaced with `export default app`. Intelligence is dropped from the runtime (as in quickstart).
- `<CopilotKit>` stays inside the page, because the docs' `app/page.tsx` puts it there. There is no section layout.
- `components/`, `lib/` and `app/tool-renderers.tsx` move to `_components/` and `_lib/`. Relative imports are adjusted. The catch-all's `./_components/card` becomes `./card`.
- The docs don't say how `getWeather` is attached to the agent. It is passed as `tools: [getWeather]` to `new Agent(...)`.
- The docs give the default-catchall, custom-catchall, with-catchall and grouping snippets as hook calls or JSX lines only. Each sub-route wraps them in the demo's minimal host (`<CopilotKit>` → `Chat` → `<CopilotChat>`) and leaves out the demo's layout divs, suggestions, and extra stock/d20 renderers.
- `display-line` and `group-slot` also call `useDefaultRenderTool()`. The docs say grouping applies to calls rendered by the built-in card. Without a renderer, tool calls are invisible.

## Demo code / stubs
- `getWeatherImpl` (with its `WeatherResult` type and `seededRandom`/`hashString`/`randInt`/`randChoice`/`CONDITIONS` helpers) is copied from the demo's `src/agent/lib/tool-impls.ts`. The docs call it but never define it. No stubs were needed.
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` and `Badge` are copied from the demo's `src/app/demos/tool-rendering-custom-catchall/_components/{card,badge}.tsx`.
- Imports completed: `tool` from `@strands-agents/sdk` and `z` from `zod` in `tools.ts`. In the sub-routes, `CopilotKit`, `CopilotChat` and `useDefaultRenderTool` from `@copilotkit/react-core/v2`, plus the `CustomCatchallRenderer`/`CatchallToolStatus` imports.

## Known issues (left as the docs have them)
- `group-opt-in/page.tsx`: `error TS2304: Cannot find name 'MyToolRow'.` Neither the docs nor the demo define it. The page throws a ReferenceError at runtime.
- `group-slot/page.tsx`: `error TS2304: Cannot find name 'ToolTimeline'.` It is "your component", given by neither the docs nor the demo. The docs refer to the `CopilotChatToolCallGroup` reference page. The page throws a ReferenceError at runtime.
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error. See the quickstart README.
- The docs give a backend only for `get_weather`. The `search_flights` renderer (and its `FlightListCard`) can never fire, because the agent has no such tool. For the same reason, the catch-all on `/with-catchall` never fires: the only tool has a named renderer.

## Open questions
- The page shows four separate examples (default, custom catch-all, per-tool, grouping). They are implemented as separate sub-routes rather than combined on one page.
- `search_flights` has a frontend renderer but no backend definition in the docs. It was not added to the agent.

## Try these prompts (from the docs)
- `What's the weather in San Francisco?`: on `/genui-tool-rendering` the `WeatherCard` should render with the temperature from `result`. On `/default-catchall` and `/custom-catchall` the default card or the custom catch-all card renders instead.
- For grouping (`/display-line`), ask for several tool calls in a row, for example `What's the weather in Paris, Tokyo and London?` (not from the docs; the docs give no grouping prompt).
