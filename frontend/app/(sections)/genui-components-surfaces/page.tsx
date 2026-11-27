"use client";
// Docs: surfaces -> "Add a page target" (app/page.tsx, React tab): `FeaturedProducts`, verbatim.
// The snippet is a part of app/page.tsx; "use client" and <CopilotChat /> come from the
// app/page.tsx of generative-ui/components ("Try it"), which this page builds on.
// Also on the page: the "Scroll to the surface" target (`sidebar-notes`, autoScroll off) and
// the "One target for each item" target, verbatim.
// Additions (minimal, to exercise it): the default export, `Product`/`ProductRow` and sample
// products (see _components/ProductRow.tsx), and `product` for the per-item target.
import { CopilotChat } from "@copilotkit/react-core/v2";
import { GenerativeUISurface } from "@copilotkit/react-core/v2/generative-ui";
import { shopUI } from "./catalog";
import { ProductRow, sampleProducts, type Product } from "./_components/ProductRow";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <GenerativeUISurface
      id="featured"
      ui={shopUI}
      description="The Featured Products row of the home page. When the customer asks to see products here, show them as a ProductGrid with one ProductCard for each product. When they ask for the featured products again, delete this surface."
      components={["ProductGrid", "ProductCard"]}
      fallback={<ProductRow products={products} />}
    />
  );
}

export default function Page() {
  const product = sampleProducts[0];
  return (
    <>
      <FeaturedProducts products={sampleProducts} />
      <GenerativeUISurface id="sidebar-notes" autoScroll={false} />
      <GenerativeUISurface
        key={product.id}
        id={`recommendations-${product.id}`}
        description={`The "You might also like" row under ${product.name}. Show related products here. Never include ${product.name} itself.`}
      />
      <CopilotChat />
    </>
  );
}
