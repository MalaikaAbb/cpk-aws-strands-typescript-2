# frontend-tools

**Docs:** https://docs.copilotkit.ai/strands-typescript/frontend-tools
**Routes:**
- http://localhost:3000/frontend-tools: `useFrontendTool` (`change_background`)
- http://localhost:3000/frontend-tools/list: Registering a list of tools (`useFrontendTools`) ❌

**Status:** 🧩 The agent (`agent.ts` + `prompts.ts`) and the `useFrontendTool` registration are from the docs. The undefined `createModel` returns the quickstart `OpenAIModel`. The page ends with a minimal `<div style={{ background }}>` + `<CopilotSidebar />`. ❌ `/list` uses `reports` / `navigate`, which nothing defines. ⚠️ The docs' agent prompt is about a different tool (`render_bar_chart`) than the one the page registers (`change_background`).

## Files
| File | Docs step |
|---|---|
| `agent/sections/_frontend-tools/agent.ts` | Step "Nothing to wire on the agent" (`src/agent/agent.ts`) |
| `agent/sections/_frontend-tools/prompts.ts` | Step "Tell the model when to call it" (`src/agent/prompts.ts`) |
| `agent/sections/frontend-tools.ts` | Serves `aguiAgent` with `createStrandsApp` (the quickstart shape; the docs give no server code) |
| `frontend/app/api/copilotkit/frontend-tools/[[...slug]]/route.ts` | Quickstart runtime |
| `providers.tsx`, `layout.tsx` | Quickstart provider |
| `page.tsx` | `useFrontendTool` (`src/app/demos/frontend-tools/page.tsx`) + handler |
| `_components/background.tsx` | `DEFAULT_BACKGROUND` only |
| `list/page.tsx` | Registering a list of tools |

## Adaptations
- The agent name `"chart_agent"` becomes `"frontend-tools"`. The runtime URL is `/api/copilotkit/frontend-tools`.
- The provider is the quickstart one, in `layout.tsx`. The docs' `CopilotKit` import is kept but unused.
- `list/page.tsx`: the bare `useFrontendTools(...)` call sits in a page with `<CopilotSidebar />`. The imports were added.
- Intelligence is not used.

## Demo code / stubs (kept because they are needed)
- `createModel` (in `agent.ts`): one line returning the quickstart `new OpenAIModel({ apiKey: process.env.OPENAI_API_KEY ?? "", modelId: "gpt-6-luna" })`. The docs call it without defining it. The `SYSTEM_PROMPT` import (the docs' `prompts.ts`) was added.
- `DEFAULT_BACKGROUND = "white"`. The docs' `useState` uses it, imported from `./background`.
- The end of `Chat`: `<div style={{ background, minHeight: "100vh" }}><CopilotSidebar /></div>`. The style makes the tool's result visible, and the sidebar is the chat for asking. Plus `export default Chat`.

## Removed (not needed for functionality)
- The demo `createModel` factory (Chat Completions, aimock headers) and `forwardingFetch`.
- The demo `Background` component. It was dropped from the docs' import line along with `useFrontendToolsSuggestions`.
- The `useFrontendToolsSuggestions` hook and `suggestions.ts`.
- The demo's `<CopilotKit>` default export, `agentId`, `defaultOpen`, and the `list/` layout (the section layout covers it now).

## Known issues (left as the docs have them)
- **Prompt / tool mismatch:** the docs' `SYSTEM_PROMPT` describes a chart assistant calling `render_bar_chart`, but the page registers `change_background`. The model still receives `change_background` with its description on every run.
- `list/page.tsx`: `Cannot find name 'reports'.`, `Parameter 'report' implicitly has an 'any' type.`, `Cannot find name 'navigate'.` These aren't in the docs or the demo. The route throws `ReferenceError: reports is not defined` on render.
- `route.ts`: the known `HttpAgent is missing ... _threadId, _maxEnforcedEntries` error (see the quickstart README).

## Open questions
- Should the prompt name `change_background`? The docs' backend and frontend snippets seem to come from two different demos.

## Try these prompts (from the docs)
- `Change the background to a blue gradient.` The page background changes, and the agent gets `{ status: "success" }` as the tool result.
- Inspector: **Inspect → Frontend Tools** lists `change_background` and its schema.
