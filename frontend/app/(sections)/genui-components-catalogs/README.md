# genui-components-catalogs

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/components/catalogs
**Route:** http://localhost:3000/genui-components-catalogs
**Status:** ❌ partly broken. The main path (`shopUI` catalog -> provider -> chat) is complete. The "Combine catalogs" and "Positional parameter order" snippets use `cartUI`, `Hero` and `Panel`, which the page never defines and the demo does not have, so they stay undefined. They live in `_lib/` and the running page does not import them.

## Files
| File | Docs step |
|---|---|
| `agent/sections/genui-components-catalogs.ts` | No backend code on the page: shared quickstart Strands agent |
| `frontend/app/api/copilotkit/genui-components-catalogs/[[...slug]]/route.ts` | No runtime code on the page: quickstart route |
| `catalog.tsx` | "Create a catalog" (`app/catalog.tsx`) |
| `providers.tsx`, `layout.tsx` | "Then give it to the provider" |
| `page.tsx` | Not on this page: the `app/page.tsx` (`<CopilotChat />`) of generative-ui/components "Try it" |
| `_lib/type-your-components.tsx` | "Type your components" (not rendered) |
| `_lib/app-ui.tsx` | "Combine catalogs" (not used) |
| `_lib/export-catalog.ts` | "Export the catalog for other A2UI tools" (a Node script, not run) |
| `_lib/panel.tsx` | "Positional parameter order" (not used) |

Skipped: the Valibot tab of "Pick a schema library" (the zod tab is the catalog itself). Also skipped: the `functions: { ... }` fragment of "Who may call a function", an object fragment with nothing on the page to put it in.

## Adaptations
- Agent `default` (implicit) -> `genui-components-catalogs` (`agentId` on the provider, runtime key). `runtimeUrl`/`basePath` -> `/api/copilotkit/genui-components-catalogs`.
- `app/catalog.tsx` -> section `catalog.tsx`.

## Demo code / stubs
None. The demo has no catalog code. The page component is the docs' own "Try it" `app/page.tsx`.
Added imports (well-known packages / the snippet's own siblings): `z` from "zod" in `app-ui.tsx` and `panel.tsx`; `createGenerativeUI` in `panel.tsx`; `GenerativeUIComponentProps` + `shopUI` in `type-your-components.tsx`; `fs` from "node:fs" + `appUI` in `export-catalog.ts`.

## Known issues
- `_lib/app-ui.tsx`: `Cannot find name 'cartUI'.` and `Cannot find name 'Hero'.` These are never defined in the docs.
- `_lib/panel.tsx`: `Cannot find name 'Panel'.` This is never defined in the docs.
- `_lib/type-your-components.tsx`: `Property 'color' does not exist on type '{ name: string; price: number; imageUrl: string; }'.` This one is **expected**: the docs say `props.color` is a type error, and it is.
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` mismatch (see the quickstart README).

## Open questions
- `ProductCard`'s description says "Copy every value from a product of a tool result", but the agent has no product tool. The agent will invent the products and their `imageUrl`, so the images are likely broken.
- The page has no page component. I used the "Try it" `<CopilotChat />` page, as the smallest way to ask the agent to render.

## Try these prompts
Docs give no prompts. Something like "show me some products" should render a `ProductGrid` of `ProductCard`s. Inspector -> Generative UI -> **Catalog** lists the components, grouped by catalog.
