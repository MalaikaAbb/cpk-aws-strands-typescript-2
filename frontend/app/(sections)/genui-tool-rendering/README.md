# genui-tool-rendering

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/tool-rendering
**Route:** http://localhost:3000/genui-tool-rendering (with sub-routes, see below)
**Status:** 🧩 Stubs were needed: `getWeatherImpl` and the `search_flights` backend (neither is in the docs). Minimal unstyled `Card`/`Badge` stand-ins are used. ❌ Two "Grouping tool calls" snippets are broken: `MyToolRow` and `ToolTimeline` are never defined.

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
| `agent/sections/genui-tool-rendering.ts` | The quickstart `main.ts` agent, with `tools: [getWeather, searchFlights]` |
| `agent/sections/_genui-tool-rendering/tools.ts` | The backend tool definition (`src/agent/tools.ts`) + the `search_flights` stub at the bottom |
| `agent/sections/_genui-tool-rendering/tool-impls.ts` | Stub: `getWeatherImpl` |
| `frontend/app/api/copilotkit/genui-tool-rendering/[[...slug]]/route.ts` | The quickstart runtime (this page doesn't change it) |
| `page.tsx` | Per-tool renderers: `app/page.tsx` |
| `_components/tool-renderers.tsx` | Per-tool renderers: `app/tool-renderers.tsx` |
| `_components/weather-card.tsx`, `_components/flight-list-card.tsx` | Per-tool renderers: `components/*.tsx` |
| `_lib/parse-json-result.ts` | Per-tool renderers: `lib/parse-json-result.ts` |
| `_components/custom-catchall-renderer.tsx` | Custom catch-all: `custom-catchall-renderer.tsx` |
| `_components/card.tsx`, `_components/badge.tsx` | Minimal unstyled `Card*`/`Badge` that the docs' catch-all imports |
| `<sub-route>/page.tsx` | One per snippet, as listed under Routes |

## Adaptations
- The agent name is `genui-tool-rendering`, not `default`. The runtime URL is `/api/copilotkit/genui-tool-rendering`.
- `app.listen(8000)` is replaced with `export default app`. Intelligence is dropped from the runtime (as in quickstart).
- `<CopilotKit>` stays inside the page, because the docs' `app/page.tsx` puts it there. There is no section layout.
- `components/`, `lib/` and `app/tool-renderers.tsx` move to `_components/` and `_lib/`. Relative imports are adjusted. The catch-all's `./_components/card` becomes `./card`.
- The docs don't say how tools are attached to the agent. They are passed as `tools: [getWeather, searchFlights]` to `new Agent(...)`.
- The docs give the default-catchall, custom-catchall, with-catchall and grouping snippets as hook calls or JSX lines only. Each sub-route wraps them in a minimal host (`<CopilotKit>` → `Chat` → `<CopilotChat>`).
- `display-line` and `group-slot` also call `useDefaultRenderTool()`. The docs say grouping applies to calls rendered by the built-in card. Without a renderer, tool calls are invisible.

## Demo code / stubs
- `getWeatherImpl(city)` (`tool-impls.ts`): a stub. The docs call it but never define it. It returns fixed `{ city, temperature, humidity, wind_speed, conditions }`, which is what `WeatherCard` reads.
- `search_flights` (bottom of `tools.ts`): a stub. The docs give its renderer but no backend. The model supplies `origin`, `destination` and 2 `flights`, and the tool returns them as JSON in the shape `FlightListCard` reads (`airline`, `flight`, `depart`, `arrive`, `price_usd`).
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` and `Badge`: plain `<div>`/`<h3>`/`<p>`/`<span>` stand-ins. The docs' `custom-catchall-renderer.tsx` imports them.
- Imports completed: `tool` and `z` in `tools.ts`. In the sub-routes, `CopilotKit`, `CopilotChat`, `useDefaultRenderTool` and the `CustomCatchallRenderer`/`CatchallToolStatus` imports.

## Removed (not needed for functionality)
- The demo's `getWeatherImpl` seeded-random helpers (`seededRandom`, `hashString`, `randInt`, `randChoice`, `CONDITIONS`, `WeatherResult`, `feels_like`).
- The demo `search_flights` A2UI payload: `searchFlightsImpl`, `shared-tools/{search-flights,types,generate-a2ui}.ts`, the A2UI surface operations, and the long airline-logo description.
- The demo shadcn `Card`/`Badge` styling (Tailwind classes, `forwardRef`, variant colors).
- Unused `React` imports in the sub-route hosts.

## Known issues (left as the docs have them)
- `group-opt-in/page.tsx`: `error TS2304: Cannot find name 'MyToolRow'.` Neither the docs nor the demo define it. The page throws a ReferenceError at runtime.
- `group-slot/page.tsx`: `error TS2304: Cannot find name 'ToolTimeline'.` It is "your component", given by neither the docs nor the demo. The docs refer to the `CopilotChatToolCallGroup` reference page. The page throws a ReferenceError at runtime.
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error. See the quickstart README.
- The docs give a backend only for `get_weather`. `search_flights` is a stub, so the `FlightListCard` renderer can fire. The catch-all on `/with-catchall` never fires, because both tools have named renderers.

## Open questions
- The page shows four separate examples (default, custom catch-all, per-tool, grouping). They are implemented as separate sub-routes rather than combined on one page.
- `search_flights` has a frontend renderer but no backend definition in the docs. A minimal stub tool was added to the agent (see Demo code / stubs).

## Try these prompts (from the docs)
- `What's the weather in San Francisco?`: on `/genui-tool-rendering` the `WeatherCard` should render with the temperature from `result`. On `/default-catchall` and `/custom-catchall` the default card or the custom catch-all card renders instead.
- `Find flights from SFO to JFK`: the `FlightListCard` renders (not from the docs).
- For grouping (`/display-line`), ask for several tool calls in a row, for example `What's the weather in Paris, Tokyo and London?` (not from the docs; the docs give no grouping prompt).
