// Minimal addition: the docs use `Product` and `<ProductRow products={...} />` (the fallback
// of the "featured" target) without defining them, and the demo has neither.
export type Product = { id: string; name: string };

export const sampleProducts: Product[] = [{ id: "p1", name: "Trail Runner" }];

export function ProductRow({ products }: { products: Product[] }) {
  return <div>{products.map((product) => product.name).join(", ")}</div>;
}
