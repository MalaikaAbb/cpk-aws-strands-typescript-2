# frontend-tools

**Docs:** https://docs.copilotkit.ai/strands-typescript/frontend-tools
**Routes:**
- http://localhost:3000/frontend-tools: `useFrontendTool` (`change_background`)
- http://localhost:3000/frontend-tools/list: Registering a list of tools (`useFrontendTools`) ❌

**Status:** 🧩 The agent (`agent.ts` + `prompts.ts`) and the `useFrontendTool` registration are from the docs. `createModel`, `Background`, the suggestions hook and the rest of `page.tsx` are demo code. ❌ The `useFrontendTools` snippet uses `reports` / `navigate`, which nothing defines. ⚠️ The docs' agent prompt is for a different tool (`render_bar_chart`) than the one the frontend registers (`change_background`).

## Files
| File | Docs step |
|---|---|
| `agent/sections/_frontend-tools/agent.ts` | Step "Nothing to wire on the agent" (`src/agent/agent.ts`) |
| `agent/sections/_frontend-tools/prompts.ts` | Step "Tell the model when to call it" (`src/agent/prompts.ts`) |
| `agent/sections/_frontend-tools/model-factory.ts`, `header-forwarding.ts` | Demo: `createModel()` and its `forwardingFetch` |
| `agent/sections/frontend-tools.ts` | Serves `aguiAgent` with `createStrandsApp` (the quickstart shape, no server code in the docs) |
| `frontend/app/api/copilotkit/frontend-tools/[[...slug]]/route.ts` | Quickstart runtime (the page doesn't change it) |
| `page.tsx` | `useFrontendTool` (`src/app/demos/frontend-tools/page.tsx`) + handler |
| `_components/background.tsx`, `_components/suggestions.ts` | Demo: `Background`, `DEFAULT_BACKGROUND`, `useFrontendToolsSuggestions` |
| `list/page.tsx`, `list/layout.tsx`, `providers.tsx` | Registering a list of tools, with the quickstart provider |

## Adaptations
- The agent name `"chart_agent"` becomes `"frontend-tools"`. The page's `agent` / `agentId` `"frontend_tools"` (from the demo part) becomes `"frontend-tools"`, and `runtimeUrl` becomes `/api/copilotkit/frontend-tools`.
- The docs' `page.tsx` imports `CopilotKit`, so the provider stays in the page. `/list` gets the quickstart provider from its own layout.
- `./background` and `./suggestions` move to `./_components/`.
- `agent.ts` uses `createModel` and `SYSTEM_PROMPT` without importing them. The imports were added (`./model-factory.ts`, `./prompts.ts`).
- `list/page.tsx`: the bare `useFrontendTools(...)` call sits in a page component with a `<CopilotSidebar defaultOpen />` (the main example's chat) so the agent can see the tools. The `useFrontendTools` / `CopilotSidebar` imports were added.
- Intelligence is not used (as in quickstart).

## Demo code / stubs
From `showcase/integrations/strands-typescript/src/`:
- `agent/model-factory.ts`: `createModel` (with `AIMOCK_CONTEXT` and `CreateModelOptions`). Defaults: `MODEL_PROVIDER=openai`, `gpt-6-luna`, **Chat Completions** API with `reasoning_effort: "none"`. That differs from quickstart's default Responses API.
- `agent/header-forwarding.ts`: `forwardingFetch` + `getForwardedHeaders` + `headersStorage` (used by `createModel`).
- `app/demos/frontend-tools/background.tsx`: `Background` + `DEFAULT_BACKGROUND`.
- `app/demos/frontend-tools/suggestions.ts`: `useFrontendToolsSuggestions`.
- `app/demos/frontend-tools/page.tsx`: the end of `Chat` (`useFrontendToolsSuggestions()`; `<Background><CopilotSidebar agentId=... defaultOpen /></Background>`) and `export default function FrontendToolsDemo()` with `<CopilotKit>`. The docs snippet stops after `useFrontendTool({...})`.

## Known issues (left as the docs have them)
- **Prompt / tool mismatch:** the docs' `SYSTEM_PROMPT` describes a data-visualization assistant that calls `render_bar_chart`, but the page registers `change_background`. No `render_bar_chart` tool exists. The model still receives `change_background` (with its description) on every run, so "change the background" may still work, but the docs' own advice ("Name the tool in `systemPrompt`") isn't followed for it.
- `list/page.tsx`: `Cannot find name 'reports'.`, `Parameter 'report' implicitly has an 'any' type.`, `Cannot find name 'navigate'.` These aren't in the docs or the demo. The route throws `ReferenceError: reports is not defined` on render.
- `createModel()` throws at agent start-up if `OPENAI_API_KEY` is unset (`agent/server.ts` logs the error and skips this section).
- `route.ts`: the known `HttpAgent is missing ... _threadId, _maxEnforcedEntries` error (see the quickstart README).

## Open questions
- `createModel()` is undefined in the docs. The demo's factory was used, as the rules say, rather than the quickstart `OpenAIModel` setup. As a result this agent runs on Chat Completions, not the Responses API.
- Should the prompt name `change_background`? The docs' backend and frontend snippets seem to come from two different demos (a chart agent and a background changer).

## Try these prompts (from the docs)
- `Change the background to a blue gradient.` The page background changes, and the agent gets `{ status: "success" }` as the tool result.
- Also check Inspector: **Inspect → Frontend Tools** should list `change_background` and its schema.
- Demo suggestion pills: "Sunset theme", "Forest theme", "Cosmic theme".
