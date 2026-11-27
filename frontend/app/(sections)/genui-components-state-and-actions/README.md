# genui-components-state-and-actions

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/components/state-and-actions
**Route:** http://localhost:3000/genui-components-state-and-actions
**Status:** 🧩 Every snippet type-checks. The page uses `Cart` and has no component for its `onChoose` event, so a minimal cart (with a readout) and a minimal `PlanCard` were added. The page gives no provider or page; those come from the Catalogs / "Try it" pages. ⚠️ One type error, the known docs issue.

## Files
| File | Docs step |
|---|---|
| `agent/sections/genui-components-state-and-actions.ts` | No backend code on the page: shared quickstart Strands agent |
| `frontend/app/api/copilotkit/genui-components-state-and-actions/[[...slug]]/route.ts` | No runtime code on the page: quickstart route |
| `catalog.tsx` | `app/catalog.tsx` of "Show live app state", "Run your code on a click", "Keep what the user types" and "Send a click to the agent", merged into one `shopUI`. Also the `ProductCard` ("In the component") and `CheckoutForm` components |
| `_components/cart.tsx` | `CartState` ("Then give the state its value") and `CartActions` ("Run your code on a click"), plus the `CartSummary` addition |
| `_lib/cart.ts` | Addition: `Cart` type and `useCart` |
| `providers.tsx`, `layout.tsx` | Not on this page: `generativeUI={{ ui: shopUI }}` as on the Catalogs page |
| `page.tsx` | Not on this page: "Try it" `<CopilotChat />`, plus the mounted `CartState`/`CartActions` |

## Adaptations
- Agent `default` (implicit) -> `genui-components-state-and-actions` (`agentId`, runtime key). `runtimeUrl`/`basePath` -> `/api/copilotkit/genui-components-state-and-actions`.
- The page defines `export const shopUI` twice in `app/catalog.tsx` (once with `state`/`bind`, once with `functions`/`events`) and gives `CheckoutForm` and `onChoose` as fragments. They are merged into one catalog. `ProductCard` takes the state snippet's props (`productId`, `name`, `inCart`) with its `bind`, plus the click snippet's `events`.

## Demo code / stubs
None from the demo (the demo has none of this). Minimal additions:
- `_lib/cart.ts`: `Cart` (`items`, `addItem`) and a `useState`-backed `useCart()`.
- `CartSummary`: a `<pre>` of the cart items. The docs' `ProductCard` never renders `inCart`, so without it a click on "Add to cart" can't be seen.
- `PlanCard` (`props: { plan }`) in the catalog, to carry the docs' `onChoose` events fragment verbatim. It renders a button that calls `onChoose({ plan })`.

Added imports: `z`, `useState`, `createGenerativeUI`, `GenerativeUIComponentProps`, `useGenerativeUIState`, `useGenerativeUIFunction`.

## Known issues
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` mismatch (see the quickstart README).

## Open questions
- I merged the two `shopUI` snippets into one catalog. The page's last line says one card does all three, so I read it as one catalog.
- The docs' `ProductCard` doesn't display `inCart`, so the "live cart data" can only be seen in Inspector (Surfaces -> component props), not on the card.
- The prose says to also give the cart to the agent with `useAgentContext` so it can answer "what is in my cart?". No code is given, so it is not added. The agent therefore can't see the cart.

## Try these prompts
Docs give no prompts as such. The page's own examples suggest:
- Ask for a product card for some product, then click **Add to cart**. The cart readout should update, with no message to the agent.
- Ask for a plan picker with `PlanCard`s, then click one. A user message such as "Show me the Team plan" should appear, and the agent answers.
- Ask for a checkout form with an email, type into it, then ask the agent to change the email. Your typed value should stay.
