# genui-a2ui-fixed-schema

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/a2ui/fixed-schema
**Route:** http://localhost:3000/genui-a2ui-fixed-schema
**Status:** 🧩 Every docs snippet is integrated. The renderers and the agent snippets have no imports, and the renderers use the demo's `Card`, `Badge`, `Button` and `Separator` components and the `s()` helper. Those were copied from the demo. ⚠️ The only type error is the known docs `HttpAgent` one.

## Files
| File | Docs step |
|---|---|
| `_lib/a2ui/definitions.ts` | Declare the component definitions (verbatim, plus the demo's `Definitions` type) |
| `_lib/a2ui/renderers.tsx` | Implement the React renderers (verbatim snippet, demo imports and `s()` above it) |
| `_lib/a2ui/catalog.ts` | Wire the catalog (verbatim) |
| `_components/{card,badge,button,separator}.tsx` | Demo components the renderers use |
| `agent/sections/_genui-a2ui-fixed-schema/a2ui_schemas/flight_schema.json` | Load the schema JSON at startup (`a2ui_schemas/flight_schema.json`, verbatim) |
| `agent/sections/_genui-a2ui-fixed-schema/agent.ts` | Load the schema JSON at startup + Return render operations from the tool (`src/agent/agent.ts`) |
| `agent/sections/genui-a2ui-fixed-schema.ts` | Quickstart `main.ts` with `tools: [displayFlight]` ("the tool drops into whatever agent you already have") |
| `page.tsx` | Pass the catalog to the provider (`app/page.tsx`) |
| `frontend/app/api/copilotkit/genui-a2ui-fixed-schema/[[...slug]]/route.ts` | Turn off tool injection on the runtime (`a2ui: { injectA2UITool: false, agents: [...] }`) |

## Adaptations
- Agent name `a2ui-fixed-schema` → `genui-a2ui-fixed-schema` (runtime `agents` key and `a2ui.agents`); `runtimeUrl` → `/api/copilotkit/genui-a2ui-fixed-schema`; `agent="genui-a2ui-fixed-schema"` added to `<CopilotKit>`.
- `src/app/demos/a2ui-fixed-schema/a2ui/*` → `_lib/a2ui/*`; the page imports `./_lib/a2ui/catalog`.
- `src/agent/agent.ts` → `agent/sections/_genui-a2ui-fixed-schema/agent.ts`, with the JSON in `a2ui_schemas/` next to it (so `_A2UI_DIR` resolves as in the docs).
- The `display_flight` snippet is indented in the docs, as if it were inside a function. It is dedented, kept at module level and exported, then added to the quickstart agent's `tools`.
- The page snippet wraps `{children}` in `<CopilotKit>`. A page has no children, so a `<CopilotChat />` takes their place; the component wrapper and the imports were added.
- `intelligence` / `identifyUser` dropped from the runtime.

## Demo code / stubs
From `showcase/integrations/strands-typescript/src/`:
- `app/demos/a2ui-fixed-schema/a2ui/renderers.tsx`: the imports (`React`, `CatalogRenderers`, `Definitions`, `Card`, `Badge`, `Button as UIButton`, `Separator`) and the `s()` helper the docs prose describes.
- `app/demos/a2ui-fixed-schema/a2ui/definitions.ts`: `export type Definitions = typeof definitions;`.
- `app/demos/a2ui-fixed-schema/_components/{card,badge,button,separator}.tsx`, whole (they are the components themselves).
- `agent/agent.ts`: the imports of `readFileSync`, `dirname`/`join`, `fileURLToPath`, `tool`, `z`, and `A2UI_OPERATIONS_KEY`/`createSurface`/`updateComponents`/`updateDataModel` from `@ag-ui/a2ui-toolkit`.
- `page.tsx`: `"use client"` (the catalog holds render functions, so a server component can't pass it).

Not copied: the demo agent's `A2UI_FIXED_SYSTEM_PROMPT`, its `createModel` factory (it forces the Chat Completions API "so A2UI streaming isn't buffered"), and its chat and suggestions.

## Known issues (left as the docs have them)
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries` — the known `@ag-ui/client` 1.0.2 vs 1.0.5 issue, see the quickstart README.

## Open questions
- The docs show `<CopilotKit ...>{children}</CopilotKit>` under the title `app/page.tsx`. It was kept in the page, with a `<CopilotChat />` in place of `{children}`.
- The docs give no agent system prompt. The quickstart prompt is used, so the model relies on the `display_flight` tool description alone.
- "Action handlers (reference)": the Book flight button sends the action to the agent in a new run. No handler is in the docs for this page, so the click is not handled specially.

## Try these prompts (from the docs)
- `Find me a flight from SFO to JFK on United for $289`
