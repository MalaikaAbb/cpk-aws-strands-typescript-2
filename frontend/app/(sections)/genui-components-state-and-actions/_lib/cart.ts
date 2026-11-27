// Minimal addition: the docs use `Cart` (`cart.items`, `cart.addItem(productId, quantity)`)
// without defining it, and the demo has none.
import { useState } from "react";

export type Cart = {
  items: { productId: string; quantity: number }[];
  addItem: (productId: string, quantity: number) => void;
};

export function useCart(): Cart {
  const [items, setItems] = useState<Cart["items"]>([]);
  return {
    items,
    addItem: (productId, quantity) => setItems((current) => [...current, { productId, quantity }]),
  };
}
