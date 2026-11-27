# genui-components-standard-catalog

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/components/standard-catalog
**Routes:**
- http://localhost:3000/genui-components-standard-catalog: "Use it as it is" (`standardUI`)
- http://localhost:3000/genui-components-standard-catalog/omit: "Drop components" (no `Map`, `Video`, `HtmlView`)
- http://localhost:3000/genui-components-standard-catalog/overrides: "Replace a component" (`Card` -> `MyCard`)

**Status:** ❌ partly broken. "Use it as it is", "Drop components" and "Replace a component" are complete and wired up. "Add your own components" uses `ProductCard` and `productSchema`, which the page never defines and the demo does not have. It is kept in `_lib/extends-ui.ts` and not wired up.

## Files
| File | Docs step |
|---|---|
| `agent/sections/genui-components-standard-catalog.ts` | No backend code on the page: shared quickstart Strands agent |
| `frontend/app/api/copilotkit/genui-components-standard-catalog/[[...slug]]/route.ts` | No runtime code on the page: quickstart route |
| `providers.tsx`, `layout.tsx` | "Use it as it is" (`generativeUI={{ ui: standardUI }}`), plus the catalog chosen by sub-route |
| `_lib/omit-ui.ts` | "Drop components" |
| `_lib/overrides-ui.tsx` | "Replace a component" |
| `_lib/extends-ui.ts` | "Add your own components" (type-checked only, not imported) |
| `page.tsx`, `omit/page.tsx`, `overrides/page.tsx` | Not on this page: the "Try it" `app/page.tsx` (`<CopilotChat />`) |

## Adaptations
- Agent `default` (implicit) -> `genui-components-standard-catalog` (`agentId`, runtime key). `runtimeUrl`/`basePath` -> `/api/copilotkit/genui-components-standard-catalog`.
- Several independent catalogs on one page, so each is a sub-route. The one provider in `providers.tsx` picks `ui` from the pathname. It is keyed by pathname, so a new catalog gives a fresh provider.

## Demo code / stubs
None. Added import: `createGenerativeUI, standardUI` in `_lib/omit-ui.ts` (the snippet has no imports).

## Known issues
- `_lib/extends-ui.ts`: `Cannot find name 'ProductCard'.` and `Cannot find name 'productSchema'.` These are never defined in the docs. The page says "See Catalogs for how to declare a component". The Catalogs `ProductCard` is a module-local function, and its schema is inline, not a `productSchema`.
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` mismatch (see the quickstart README).

## Open questions
- `MyCard` renders only `children`. The Vue tab of the same page says "`Card` has two slots: `child` and `children`", and the Angular `MyCard` renders both. The React `MyCard` drops `child`, so a Card the agent fills through `child` would render empty under `/overrides`.
- `Map` needs `maplibre-gl` ("Run `npm install maplibre-gl`"). It is present in the root `node_modules` (hoisted), so maps should draw. Nothing was installed.

## Try these prompts
Docs give no prompts. To exercise each route, try the "Try it" prompt `Compare the Starter, Team, and Enterprise plans in a table`. On `/omit`, a map request should not use `Map`. On `/overrides`, ask for a card. Inspector -> Generative UI -> **Catalog** shows which components each route sends.
