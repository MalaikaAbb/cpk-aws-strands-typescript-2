# shared-state

**Docs:** https://docs.copilotkit.ai/strands-typescript/shared-state
**Route:** http://localhost:3000/shared-state (sub-route `/shared-state/run-now`)
**Status:** 🧩 Demo code needed. The docs' `ShowcaseStrandsAgent extends BoardStateStrandsAgent`, a demo class that isn't documented. It and its dependency `manageTodosImpl`/`BoardTodo` (the demo's `shared/typescript/tools/todos.ts`) were copied from the demo, and the agent now loads. Several other demo pieces were needed (see below).

## Routes
| Route | Docs section |
|---|---|
| `/shared-state` | Reading agent state (`useAgent`), Writing agent state (`handlePreferencesChange`), Rendering shared state in the UI (`NotesCard`) |
| `/shared-state/run-now` | Writing agent state: `setState` + `addMessage` + `copilotkit.runAgent({ agent })` |

## Files
| File | Docs step |
|---|---|
| `agent/sections/shared-state.ts` | Quickstart `main.ts` shape. "Pass `config` to `ShowcaseStrandsAgent` with your Strands `Agent`" |
| `agent/sections/_shared-state/state.ts` | Copy UI state into the request context (`withStateContext`) + `notesStateFromArgs` |
| `agent/sections/_shared-state/agent.ts` | Apply it before every run (`ShowcaseStrandsAgent`) + `config` (`toolBehaviors.set_notes`) |
| `agent/sections/_shared-state/todo-state-sync.ts`, `_shared-state/shared-tools/todos.ts` | Demo code: `BoardStateStrandsAgent` + its `manageTodosImpl`/`BoardTodo` dependency |
| `agent/sections/_shared-state/tools.ts` | Demo code: the `set_notes` tool |
| `frontend/app/api/copilotkit/shared-state/[[...slug]]/route.ts` | The quickstart runtime (this page doesn't change it) |
| `layout.tsx`, `providers.tsx` | The quickstart provider (the page gives none) |
| `page.tsx` | The `useAgent` and `handlePreferencesChange` fragments, hosted |
| `_components/notes-card.tsx` | Rendering shared state in the UI (`NotesCard`) |
| `_components/card.tsx`, `_components/button.tsx` | Minimal unstyled `Card*`/`Button` that the docs' `NotesCard` imports |
| `_components/preferences-editor.tsx` | `Preferences` type (demo) + a minimal editor (allowed addition) |
| `run-now/page.tsx` | The `copilotkit.runAgent` snippet, hosted |

## Adaptations
- The agent name is `shared-state`, replacing `strands_agent` and `useAgent({ agentId: "shared-state-read-write" })`. The runtime URL is `/api/copilotkit/shared-state`.
- `ShowcaseStrandsAgent({ agent, name: "shared-state", config })` replaces the quickstart's `new StrandsAgent({ agent, name })`, as the docs say. `app.listen` is replaced with `export default app`.
- `config` gets `export` so the section file can pass it. The tool is attached as `tools: [setNotes]`.
- The system prompt stays the quickstart's `"You are a helpful AI assistant."`. The docs say to "say in your system prompt what each copied value means", but give no prompt.
- `"use client"` is added to the frontend files.

## Demo code / stubs
From `showcase/integrations/strands-typescript/src/`:
- `agent/state.ts`: `parseToolInput` and `formatPreferencesBlock`. The docs use them without defining them.
- `agent/todo-state-sync.ts`: `BoardStateStrandsAgent` (with its `syncBoardTodos` plugin and `requestedTodos` store). Its own import of `manageTodosImpl`/`BoardTodo` (`../../shared-tools/todos`, a symlink to `showcase/shared/typescript/tools/todos.ts`) is copied verbatim to `agent/sections/_shared-state/shared-tools/todos.ts`.
- `agent/tools.ts`: `setNotes` (the `set_notes` tool the docs name but never define).
- `app/demos/shared-state-read-write/page.tsx`: `RWAgentState`, `INITIAL_PREFERENCES`, the `agentState`/`preferences`/`notes` derivation, and `handleClearNotes`. The docs fragments use them, and `NotesCard` requires an `onClear`.
- `app/demos/shared-state-read-write/notes-card.tsx`: the `Card`/`Button` imports and `NotesCardProps`. `Card*` and `Button` are now plain `<div>`/`<h3>`/`<p>`/`<button>` stand-ins.
- `app/demos/shared-state-read-write/preferences-card.tsx`: only the `Preferences` interface.

Allowed additions: `PreferencesEditor` (a name input + a language select, because the docs give no editor for "every edit in the sidebar"), the language `<select>` on `/run-now`, and `<CopilotSidebar />` on both pages.

Imports completed: `RunAgentInput` (`@ag-ui/core`), `ToolCallContext`/`StatePayload` (`@ag-ui/aws-strands`), `tool` and `z`, and `useAgent`/`UseAgentUpdate`/`useCopilotKit`/`CopilotSidebar`.

## Removed (not needed for functionality)
- The demo shadcn `Card`/`Button` styling (Tailwind classes, color tokens, variants).
- Demo comments and the unused `React` imports in `page.tsx` and `notes-card.tsx`.

## Known issues (left as the docs have them)
- The docs subclass an undocumented demo class (`BoardStateStrandsAgent`, a sales-board sync). The page works only because that class and its `todos` dependency were copied from the demo.
- `run-now/page.tsx`: `error TS2322: Type '...@copilotkit/runtime/node_modules/@ag-ui/client...AbstractAgent' is not assignable to type '...@copilotkit/shared/node_modules/@ag-ui/client...AbstractAgent'. Types have separate declarations of a private property '_threadId'.` This is the same `@ag-ui/client` version split as the `HttpAgent` error, at `copilotkit.runAgent({ agent })`.
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error. See the quickstart README.
- The `handlePreferencesChange` comment mentions `PreferencesInjectorMiddleware`, which is not what the Strands code does (`withStateContext` does). The comment is left as written.
- `/run-now` writes `state.language`, but `withStateContext` copies only `preferences` and `todos`. The agent sees the change only through the hint message.

## Open questions
- Whether `ShowcaseStrandsAgent` should extend `StrandsAgent` directly. The docs say `BoardStateStrandsAgent`, so that is what's implemented (with the demo's todos dependency).
- The system prompt: the docs require one that describes the state, but give none.

## Try these prompts
Docs give no prompts. The prose implies: set a name or language in the form, then ask something (the reply should follow the preferences). Ask the agent to remember something, and the notes card fills via `set_notes`.
