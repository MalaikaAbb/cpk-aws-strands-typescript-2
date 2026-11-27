# genui-tool-based

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/tool-based
**Routes:**
- http://localhost:3000/genui-tool-based: `useComponent` (`render_bar_chart`) in `<CopilotChat>`
- http://localhost:3000/genui-tool-based/headless: Rendering in a headless chat (`CopilotChatToolCallsView`)

**Status:** 🧩 The agent (`agent.ts` + `prompts.ts`), the schema and the `useComponent` call are from the docs. `createModel`, the `BarChart` component and the page wrapper are demo code. The headless route is a minimal harness around the docs' `CopilotChatToolCallsView` element. Type-check is clean apart from the known `@ag-ui/client` errors.

## Files
| File | Docs step |
|---|---|
| `agent/sections/_genui-tool-based/agent.ts` | Step "Nothing to wire on the agent" (`src/agent/agent.ts`) |
| `agent/sections/_genui-tool-based/prompts.ts` | Step "Tell the model when to call it" (`src/agent/prompts.ts`) |
| `agent/sections/_genui-tool-based/model-factory.ts`, `header-forwarding.ts` | Demo: `createModel()` and its `forwardingFetch` |
| `agent/sections/genui-tool-based.ts` | Serves `aguiAgent` with `createStrandsApp` (the quickstart shape, no server code in the docs) |
| `frontend/app/api/copilotkit/genui-tool-based/[[...slug]]/route.ts` | Quickstart runtime (the page doesn't change it) |
| `providers.tsx`, `layout.tsx` | Quickstart provider (the page shows none) |
| `page.tsx` | The `useComponent` / `z` imports + `useComponent({...})` (`src/app/demos/gen-ui-tool-based/page.tsx`) |
| `_components/bar-chart.tsx` | `barChartPropsSchema` (`bar-chart.tsx`) + demo `BarChart` |
| `headless/page.tsx` | Rendering in a headless chat |

## Adaptations
- The agent name `"chart_agent"` becomes `"genui-tool-based"`. The demo-derived `agentId="gen-ui-tool-based"` becomes `"genui-tool-based"`. The runtime URL is `/api/copilotkit/genui-tool-based`.
- `agent.ts` uses `createModel` and `SYSTEM_PROMPT` without importing them. The imports were added (`./model-factory.ts`, `./prompts.ts`).
- `bar-chart.tsx` moved to `_components/`.
- Intelligence is not used (as in quickstart).

## Demo code / stubs
From `showcase/integrations/strands-typescript/src/`:
- `agent/model-factory.ts`: `createModel` (with `AIMOCK_CONTEXT` and `CreateModelOptions`). Defaults: `gpt-6-luna` on the **Chat Completions** API with `reasoning_effort: "none"`.
- `agent/header-forwarding.ts`: `forwardingFetch` + `getForwardedHeaders` + `headersStorage`.
- `app/demos/gen-ui-tool-based/bar-chart.tsx`: the `BarChart` component, `BarChartProps`, and its React/`recharts` imports. The docs: "`BarChart` is your own React component ... The demo builds it with Recharts".
- `app/demos/gen-ui-tool-based/page.tsx`: the `Chat` wrapper with `<CopilotChat agentId=... className="h-full rounded-2xl" />` in a centered container. The demo's second `useComponent` (pie chart) and `useSuggestions()` were not copied.
- `recharts` is not declared in `frontend/package.json`. It resolves only because it's installed transitively (`recharts@3.11.2`, required by a CopilotKit package).

Harness (`headless/page.tsx`, not in the docs or the demo): the docs' element uses `assistantMessage` / `allMessages` without defining them, and needs a headless chat around it. The harness maps `agent.messages`: user text as `<p>`, and for each assistant message its text plus `<CopilotChatToolCallsView message={assistantMessage} messages={allMessages} />`. It has a plain input/Send form (`addMessage` + `copilotkit.runAgent`), and registers the same `render_bar_chart` component.

## Known issues
- `headless/page.tsx` (harness), on `copilotkit.runAgent({ agent })`: `Type '...@copilotkit/runtime/node_modules/@ag-ui/client...AbstractAgent' is not assignable to type '...@copilotkit/shared/node_modules/@ag-ui/client...AbstractAgent'. Types have separate declarations of a private property '_threadId'.` This is the same `@ag-ui/client` version split as the route error (type-only).
- `route.ts`: the known `HttpAgent is missing ... _threadId, _maxEnforcedEntries` error (see the quickstart README).
- `createModel()` throws at agent start-up if `OPENAI_API_KEY` is unset.

## Open questions
- `createModel()` is undefined in the docs. The demo's factory was used rather than the quickstart `OpenAIModel` setup, so this runs on Chat Completions.
- The docs say "The built-in agent needs no backend step", but this page's Strands tab shows a backend step anyway. The Strands agent was implemented as shown.

## Try these prompts (from the docs)
- `Show me a bar chart of quarterly sales.` The bar chart renders inline in the chat with the data from the agent. Try it on both routes.
