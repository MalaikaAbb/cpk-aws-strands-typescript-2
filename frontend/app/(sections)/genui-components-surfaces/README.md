# genui-components-surfaces

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/components/surfaces
**Route:** http://localhost:3000/genui-components-surfaces
**Status:** 🧩 The page imports `shopUI` from `./catalog` and uses `Product` / `ProductRow` without giving them. `shopUI` is copied from the sibling Catalogs docs page; `Product`/`ProductRow` are minimal additions. ⚠️ One type error, the known docs issue.

## Files
| File | Docs step |
|---|---|
| `agent/sections/genui-components-surfaces.ts` | No backend code on the page: shared quickstart Strands agent |
| `frontend/app/api/copilotkit/genui-components-surfaces/[[...slug]]/route.ts` | No runtime code on the page: quickstart route |
| `page.tsx` | "Add a page target" (`FeaturedProducts`), "Limit the components" (same props), "Scroll to the surface" (`sidebar-notes`), "One target for each item" |
| `surfaces.css` (imported by `layout.tsx`) | "Scroll to the surface" CSS (`scroll-margin-top`) |
| `providers.tsx`, `layout.tsx` | "When a component fails" (`generativeUI` with `ui: shopUI` + `errorBoundary`) |
| `catalog.tsx` | Not on this page: `app/catalog.tsx` from the Catalogs page |
| `_components/ProductRow.tsx` | Minimal addition: `Product`, `ProductRow`, one sample product |

## Adaptations
- Agent `default` (implicit) -> `genui-components-surfaces` (`agentId` on the provider, runtime key). `runtimeUrl`/`basePath` -> `/api/copilotkit/genui-components-surfaces`.
- The page's `app/page.tsx` snippet is a fragment. It is merged into the `app/page.tsx` of the "Try it" page (`"use client"` + `<CopilotChat />`), and a default export renders `FeaturedProducts` plus the two other targets.
- The docs CSS goes into a section CSS file imported by the section layout (root `globals.css` is shared).

## Demo code / stubs
- `catalog.tsx`: not in the demo source. Copied verbatim from generative-ui/components/catalogs -> "Create a catalog" (React).
- `_components/ProductRow.tsx` (needed: the fallback renders `<ProductRow products={products} />`): `type Product = { id, name }`, one sample product, and a plain `<div>` that lists the names. `id`/`name` are needed because the "One target for each item" snippet reads `product.id` and `product.name`.
- The `product` used by the "One target for each item" snippet is that sample product.

## Removed (not needed for functionality)
- `price` on `Product`, two of the three sample products, and the `<ul>/<li>` markup of `ProductRow`.
- The `<main>` wrapper in `page.tsx` (now a fragment).

## Known issues
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` mismatch (see the quickstart README).
- The docs put `export function FeaturedProducts` in `app/page.tsx`. `tsc` accepts it, but `next build` rejects a page that has extra named exports. `next dev` is fine.

## Open questions
- `ProductCard`'s description says "Copy every value from a product of a tool result", but this page (and the Strands quickstart agent) has no product tool. The agent has to invent products, `imageUrl` included, so the images will probably be broken.
- Without the `"use client"` from the "Try it" page.tsx, the snippet's server page would call the client-only `createGenerativeUI` (through `./catalog`) on the server. Merging into the Try-it page is my reading of the docs.
- `sidebar-notes` has no `description`, so the agent gets no hint about what it is for.

## Try these prompts (from the docs)
- `show me cheap running shoes` (the Featured row swaps to a ProductGrid)
- `show the featured products again` (the surface is deleted and the fallback row comes back)
- Inspector -> Generative UI -> **Surfaces** shows the targets, surfaces and rejected operations.
