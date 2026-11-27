// Addition (minimal): the docs use `Cart` (`cart.items`, `cart.addItem(productId, quantity)`)
// without defining it, and the demo has none. A small React-state cart.
import { useState } from "react";

export type Cart = {
  items: { productId: string; quantity: number }[];
  addItem: (productId: string, quantity: number) => void;
};

export function useCart(): Cart {
  const [items, setItems] = useState<Cart["items"]>([]);
  return {
    items,
    addItem: (productId, quantity) =>
      setItems((current) => {
        const found = current.find((item) => item.productId === productId);
        return found
          ? current.map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
            )
          : [...current, { productId, quantity }];
      }),
  };
}
