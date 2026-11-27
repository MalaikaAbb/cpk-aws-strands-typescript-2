# genui-components-from-a2ui

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/components/from-a2ui
**Routes:**
- http://localhost:3000/genui-components-from-a2ui — the "After" state (components and surfaces: `generativeUI={{ ui: appUI }}`)
- http://localhost:3000/genui-components-from-a2ui/a2ui-v1 — "Use 1.0 with the React a2ui renderer" (`a2ui={{ catalog: basicCatalogV1 }}`)
- http://localhost:3000/genui-components-from-a2ui/a2ui-v1-custom — the same, with the docs' custom 1.0 `Greeting` catalog

**Status:** 🧩 The page is a migration guide. Its "After" code (provider, `appUI` catalog, runtime) and its two "Use 1.0 with the React a2ui renderer" snippets are integrated. The `Airport` and `Arrow` components are referenced but never given, so minimal ones were written. ⚠️ The only type error is the known docs `HttpAgent` one.

## Files
| File | Docs step |
|---|---|
| `agent/sections/genui-components-from-a2ui.ts` | No backend code in the docs: quickstart agent |
| `frontend/app/api/copilotkit/genui-components-from-a2ui/[[...slug]]/route.ts` | Before and after → "Runtime, after" (`new CopilotRuntime({ agents })`, nothing else) |
| `providers.tsx` | Before and after → "After" (React): `CopilotKitProvider` with `generativeUI={{ ui: appUI }}` |
| `_lib/app-ui.tsx` | Convert a custom catalog → "After" (React): `createGenerativeUI` with `Airport` and `Arrow` |
| `_components/flight.tsx` | Not in the docs: minimal `Airport` and `Arrow` components |
| `page.tsx` | Not in the docs: a minimal `<CopilotChat />` inside the "After" provider |
| `a2ui-v1/page.tsx` | Use 1.0 with the React a2ui renderer → `<CopilotKit a2ui={{ catalog: basicCatalogV1 }}>` |
| `_lib/greetings-catalog.tsx`, `a2ui-v1-custom/page.tsx` | Use 1.0 with the React a2ui renderer → custom catalog (`createCatalog` + `DynamicStringSchemaV1`, `protocolVersion: "1.0"`) |

## Adaptations
- `runtimeUrl` is `/api/copilotkit/genui-components-from-a2ui` everywhere. The docs snippets name no agent (so they use `"default"`); `agentId=` / `agent=` `"genui-components-from-a2ui"` was added.
- The "After" provider is mounted in `page.tsx` (through `Providers`), not in a section `layout.tsx`, because the `a2ui-v1*` sub-routes mount their own `<CopilotKit a2ui=...>` provider and a layout would nest the two.
- All three routes share the one "Runtime, after" runtime. The dynamic-schema page says a provider catalog auto-enables A2UI ("the runtime needs no `a2ui` block"), so the `a2ui-v1*` routes need no runtime change either.
- The "Before" snippets (the v0.9 `createCatalog` with `DynamicStringSchema`, `a2ui: { injectA2UITool: false, agents: ["shop"] }`) are the starting point of the migration and are not implemented.
- `intelligence` / `identifyUser` dropped from the runtime.

## Demo code / stubs
- None copied. The demo (`src/app/demos/a2ui-fixed-schema/a2ui/renderers.tsx`) has `Airport` and `Arrow`, but as v0.9 a2ui-renderer catalog renderers (`({ props }) => …`, using the demo's `Separator`, no `city`), not as plain React components for `createGenerativeUI`. Minimal `Airport({ code, city })` and `Arrow()` were written in `_components/flight.tsx` instead (allowed: "minimal components referenced but not given").
- Added imports: `z` from `"zod"` in `_lib/app-ui.tsx` (the "After" catalog uses `z` without importing it); the `Airport` / `Arrow` import. `export { myCatalog }` added to the custom-catalog snippet so the page can use it.

## Removed (not needed for functionality)
- The `<main className="h-screen">` wrappers around `<CopilotChat />` in all three pages.

## Known issues (left as the docs have them)
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries` — the known `@ag-ui/client` 1.0.2 vs 1.0.5 issue, see the quickstart README.
- The page itself warns that the `a2ui-v1*` path needs the agent integration to "emit native 1.0 `a2ui_operations`", and that agent tools built with `@ag-ui/a2ui-toolkit` 0.0.5 (which `@ag-ui/aws-strands` uses) write v0.9 operations. Expect the `a2ui-v1*` routes to render nothing, or v0.9 surfaces, with the Strands agent.

## Open questions
- The page is a migration guide with no "build this" steps. The most literal reading was used: implement the "After" state, plus the two "Use 1.0 with the React a2ui renderer" snippets as sub-routes.
- The page gives no agent prompt or tool instructions. The quickstart agent is used unchanged, so whether it calls the `render_ui` tool the runtime adds is for the live test.

## Try these prompts
Docs give no prompts. (The catalog is about flights, so something like "Show a flight from SFO to JFK" exercises `Airport` and `Arrow`; on `a2ui-v1-custom`, "Greet Alice".)
