// Allowed minimal addition: the docs use `Product` and `<ProductRow products={...} />`
// (the fallback of the "featured" target) without defining them, and the demo has neither.
export type Product = { id: string; name: string; price: number };

export const sampleProducts: Product[] = [
  { id: "p1", name: "Trail Runner", price: 120 },
  { id: "p2", name: "Road Racer", price: 95 },
  { id: "p3", name: "Daily Trainer", price: 80 },
];

export function ProductRow({ products }: { products: Product[] }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          {product.name} (${product.price})
        </li>
      ))}
    </ul>
  );
}
