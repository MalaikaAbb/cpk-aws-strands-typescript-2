// Docs: state-and-actions, app/catalog.tsx (React tabs). The page shows `shopUI` in pieces:
// "Show live app state" (state + bind), "Run your code on a click" (functions + events),
// "Keep what the user types" (CheckoutForm + writable), and "Send a click to the agent"
// (an `onChoose` event fragment). They are merged into one catalog, as the page's last line
// says ("the card shows live cart data, its button runs your code, and the form keeps the
// user's input"). Every snippet is kept as written; the merge is the only change.
// Added imports: `z` from "zod", `useState` from "react", `createGenerativeUI` and
// `GenerativeUIComponentProps` (the catalog snippets have none).
// Addition (minimal): `PlanCard`, a component to carry the `onChoose` event fragment, which
// the docs give without a component.
import { useState } from "react";
import { z } from "zod";
import {
  createGenerativeUI,
  type GenerativeUIComponentProps,
} from "@copilotkit/react-core/v2/generative-ui";

// Docs: "Run your code on a click" -> "In the component" (React tab), verbatim.
function ProductCard({ productId, name, onAddToCart }: GenerativeUIComponentProps<typeof shopUI, "ProductCard">) {
  const [error, setError] = useState<string>();
  return (
    <article>
      <h4>{name}</h4>
      <button
        onClick={async () => {
          const result = await onAddToCart?.({ productId });
          if (result) setError(result.ok ? undefined : result.error.message);
        }}
      >
        Add to cart
      </button>
      {error ? <p role="alert">{error}</p> : null}
    </article>
  );
}

// Docs: "Keep what the user types" (React tab), verbatim.
function CheckoutForm({ email, setEmail }: GenerativeUIComponentProps<typeof shopUI, "CheckoutForm">) {
  return <input value={email ?? ""} onChange={(event) => setEmail(event.target.value)} />;
}

// Addition: minimal component for the "Send a click to the agent" event.
function PlanCard({ plan, onChoose }: GenerativeUIComponentProps<typeof shopUI, "PlanCard">) {
  return <button onClick={() => onChoose?.({ plan })}>{plan}</button>;
}

// Docs: "Show live app state" (app/catalog.tsx), verbatim.
const cartSchema = z.object({
  items: z.array(z.object({ productId: z.string(), quantity: z.number() })),
});

export const shopUI = createGenerativeUI({
  id: "acme/shop@1",
  // "Show live app state"
  state: { cart: cartSchema },
  // "Run your code on a click"
  functions: {
    addToCart: {
      description: "Add a product to the cart",
      parameters: z.object({ productId: z.string(), quantity: z.number().default(1) }),
    },
  },
  components: {
    ProductCard: {
      component: ProductCard,
      // "Show live app state" props (the click snippet's props are the same minus `inCart`).
      props: z.object({ productId: z.string(), name: z.string(), inCart: z.number() }),
      bind: {
        inCart: (state, { productId }) =>
          state.cart.items.find((item) => item.productId === productId)?.quantity ?? 0,
      },
      // "Run your code on a click"
      events: { onAddToCart: {} },
    },
    // "Keep what the user types"
    CheckoutForm: {
      component: CheckoutForm,
      props: z.object({ email: z.string().optional() }),
      writable: ["email"],
    },
    // Addition: carries the "Send a click to the agent" `events` fragment, verbatim.
    PlanCard: {
      component: PlanCard,
      props: z.object({ plan: z.string() }),
      events: {
        onChoose: {
          description: "The user picked a plan",
          parameters: z.object({ plan: z.string() }),
        },
      },
    },
  },
});
