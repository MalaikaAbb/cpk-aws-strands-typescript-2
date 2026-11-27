// NOT on the surfaces page: the page imports `shopUI` from "./catalog" without giving it.
// It is not in the demo source either. Copied verbatim from the sibling docs page
// generative-ui/components/catalogs -> "Create a catalog" (app/catalog.tsx, React tab),
// which defines exactly this `shopUI` (ProductGrid + ProductCard).
import { z } from "zod";
import {
  createGenerativeUI,
  type GenerativeUIComponentProps,
} from "@copilotkit/react-core/v2/generative-ui";

function ProductGrid({ title, children }: GenerativeUIComponentProps<typeof shopUI, "ProductGrid">) {
  return (
    <section>
      {title ? <h3>{title}</h3> : null}
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </section>
  );
}

function ProductCard({ name, price, imageUrl }: GenerativeUIComponentProps<typeof shopUI, "ProductCard">) {
  return (
    <article>
      <img src={imageUrl} alt={name} />
      <h4>{name}</h4>
      <p>${price}</p>
    </article>
  );
}

export const shopUI = createGenerativeUI({
  id: "acme/shop@1",
  components: {
    ProductGrid: {
      component: ProductGrid,
      description: "A grid of products. Put the ids of ProductCard components in children.",
      props: z.object({ title: z.string().optional() }),
      slots: { children: "multiple" },
    },
    ProductCard: {
      component: ProductCard,
      description: "One product. Copy every value from a product of a tool result.",
      props: z.object({ name: z.string(), price: z.number(), imageUrl: z.string() }),
    },
  },
});
