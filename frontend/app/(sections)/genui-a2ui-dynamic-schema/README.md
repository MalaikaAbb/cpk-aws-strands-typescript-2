# genui-a2ui-dynamic-schema

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/a2ui/dynamic-schema
**Route:** http://localhost:3000/genui-a2ui-dynamic-schema
**Status:** 🧩 The definitions, catalog and provider are as the docs give them. The renderers snippet has no imports and uses helpers and components it never defines. Those were copied from the demo. The page snippet is cut off before its closing lines. ⚠️ The only type error is the known docs `HttpAgent` one.

## Files
| File | Docs step |
|---|---|
| `_lib/a2ui/definitions.ts` | Declare your custom component definitions (verbatim, plus the demo's `MyDefinitions` type) |
| `_lib/a2ui/renderers.tsx` | Implement the React renderers (verbatim snippet, demo imports and helpers above it) |
| `_lib/a2ui/catalog.ts` | Wire definitions and renderers into a catalog (verbatim) |
| `_components/badge.tsx`, `_components/button.tsx` | Demo components the renderers use ("the demo's own `Badge` and `Button` components") |
| `page.tsx` | Pass the catalog to the provider (`<CopilotKit a2ui={{ catalog: myCatalog }}>`, in the page as the docs show it) |
| `frontend/app/api/copilotkit/genui-a2ui-dynamic-schema/[[...slug]]/route.ts` | Quickstart runtime: "the runtime needs no `a2ui` block" |
| `agent/sections/genui-a2ui-dynamic-schema.ts` | Quickstart `main.ts` + the "Agent setup" instruction about `generate_a2ui` |

## Adaptations
- `runtimeUrl` `/api/copilotkit-declarative-gen-ui` → `/api/copilotkit/genui-a2ui-dynamic-schema`; `agent` `declarative-gen-ui` → `genui-a2ui-dynamic-schema`.
- The docs' `src/app/demos/declarative-gen-ui/a2ui/*` files are in `_lib/a2ui/`; the page import is now `./_lib/a2ui/catalog`.
- The demo's `<Chat />` is replaced with `<CopilotChat />`, as the docs say ("use your own chat in place of the demo's `Chat` component").
- `intelligence` / `identifyUser` dropped from the runtime.
- The "I opted out of auto-inject" path (`A2UIMiddleware` with `injectA2UITool: false` and a hand-written `generate_a2ui` tool) is optional, and its agent tool is only given in Python, so it is not implemented.

## Demo code / stubs
From `showcase/integrations/strands-typescript/src/app/demos/declarative-gen-ui/`:
- `a2ui/renderers.tsx`: the imports (`React`, the `recharts` components, `CatalogRenderers`, the `lucide-react` icons, `MyDefinitions`, `Badge`, `Button`) and the helpers `c`, `tooltipStyle`, `barCursor`, `CHART_COLORS` and `CardShell`. That is the whole part of the file above `myRenderers`; the docs snippet uses all of it.
- `a2ui/definitions.ts`: the line `export type MyDefinitions = typeof myDefinitions;`.
- `_components/badge.tsx` and `_components/button.tsx`, whole (they are the `Badge` and `Button` components themselves).
- `page.tsx`: the `"use client"` directive (the provider receives the catalog's render functions, so it can't be a server component) and the closing `);` and `}` that the docs snippet is missing.

Not copied: the demo's `chat.tsx`, `suggestions.ts`, `sales-context.ts`, and the demo agent's sales dataset, composition guide and `a2ui: { defaultCatalogId, guidelines }` adapter options.

## Known issues (left as the docs have them)
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries` — the known `@ag-ui/client` 1.0.2 vs 1.0.5 issue, see the quickstart README.
- The renderers need `recharts`, which is not in `frontend/package.json`. It resolves today only as a transitive dependency in the root `node_modules`.

## Open questions
- "Agent setup" says to tell the model when to call `generate_a2ui`, but gives no TypeScript code. The system prompt is the quickstart one plus one sentence that restates the docs' example: `Call generate_a2ui for any answer that needs a dashboard, a card layout, or a chart.`
- The docs say a provider catalog alone "auto-enables A2UI and injects the `generate_a2ui` tool". The demo's own runtime still sets `injectA2UITool: true` and `defaultCatalogId`. The docs version (no `a2ui` block) is used here, so the live test shows whether the tool is injected.

## Try these prompts (from the docs)
- `Show me my sales dashboard for this quarter`
