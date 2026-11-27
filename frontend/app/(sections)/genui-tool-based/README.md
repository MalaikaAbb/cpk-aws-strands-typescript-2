# genui-tool-based

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/tool-based
**Routes:**
- http://localhost:3000/genui-tool-based: `useComponent` (`render_bar_chart`) in `<CopilotChat />`
- http://localhost:3000/genui-tool-based/headless: Rendering in a headless chat (`CopilotChatToolCallsView`)

**Status:** 🧩 The agent (`agent.ts` + `prompts.ts`), the schema and the `useComponent` call are from the docs. Added because they are needed: a one-line `createModel` (the quickstart `OpenAIModel`), a plain `BarChart`, the page component, and a minimal headless harness. Type-check is clean apart from the known `@ag-ui/client` errors.

## Files
| File | Docs step |
|---|---|
| `agent/sections/_genui-tool-based/agent.ts` | Step "Nothing to wire on the agent" (`src/agent/agent.ts`) |
| `agent/sections/_genui-tool-based/prompts.ts` | Step "Tell the model when to call it" (`src/agent/prompts.ts`) |
| `agent/sections/genui-tool-based.ts` | Serves `aguiAgent` with `createStrandsApp` (the quickstart shape; the docs give no server code) |
| `frontend/app/api/copilotkit/genui-tool-based/[[...slug]]/route.ts` | Quickstart runtime |
| `providers.tsx`, `layout.tsx` | Quickstart provider (the page shows none) |
| `page.tsx` | The `useComponent` / `z` imports + `useComponent({...})` |
| `_components/bar-chart.tsx` | `barChartPropsSchema` (`bar-chart.tsx`) + a plain `BarChart` |
| `headless/page.tsx` | Rendering in a headless chat |

## Adaptations
- The agent name `"chart_agent"` becomes `"genui-tool-based"`. The runtime URL is `/api/copilotkit/genui-tool-based`.
- `bar-chart.tsx` moved to `_components/`. Intelligence is not used.

## Demo code / stubs (kept because they are needed)
- `createModel` (in `agent.ts`): one line returning the quickstart `new OpenAIModel({ apiKey: process.env.OPENAI_API_KEY ?? "", modelId: "gpt-6-luna" })`. The docs call it without defining it. The `SYSTEM_PROMPT` import (the docs' `prompts.ts`) was added.
- `BarChart`: the component `useComponent` renders ("`BarChart` is your own React component"), as plain JSX. It shows the title in bold, the description, and a `label: value` list.
- `page.tsx`: the page component returning `<CopilotChat />`, so you can ask for a chart.
- `headless/page.tsx` (harness): the docs' element uses `assistantMessage` / `allMessages` without defining them. A plain map over `agent.messages` renders user text, and for each assistant message its text plus `<CopilotChatToolCallsView message={assistantMessage} messages={allMessages} />`. A plain input sends (`addMessage` + `runAgent`), and the page registers the same `render_bar_chart`.

## Removed (not needed for functionality)
- The demo `createModel` factory and `forwardingFetch`.
- The demo Recharts `BarChart` (colors, tooltip, animation, styling).
- The demo page's centered wrapper `div`s, `className` and `agentId`.
- The disabled-button logic in the headless harness.

## Known issues
- `headless/page.tsx` (harness), on `copilotkit.runAgent({ agent })`: `Type '...@copilotkit/runtime/node_modules/@ag-ui/client...AbstractAgent' is not assignable to type '...@copilotkit/shared/node_modules/@ag-ui/client...AbstractAgent'.` This is the same `@ag-ui/client` version split as the route error (type-only).
- `route.ts`: the known `HttpAgent is missing ... _threadId, _maxEnforcedEntries` error (see the quickstart README).

## Open questions
- The docs say "The built-in agent needs no backend step", but this page's Strands tab shows one. The Strands agent was implemented as shown.

## Try these prompts (from the docs)
- `Show me a bar chart of quarterly sales.` The chart renders inline in the chat with the data from the agent. Try it on both routes.
