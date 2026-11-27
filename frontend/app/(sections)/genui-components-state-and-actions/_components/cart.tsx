"use client";
// Docs: state-and-actions -> "Then give the state its value from your app" (`CartState`) and
// "Run your code on a click" (`CartActions`), React tabs, verbatim.
// Added imports: the hooks, `shopUI`, `Cart`.
import {
  useGenerativeUIFunction,
  useGenerativeUIState,
} from "@copilotkit/react-core/v2/generative-ui";
import { shopUI } from "../catalog";
import type { Cart } from "../_lib/cart";

export function CartState({ cart }: { cart: Cart }) {
  useGenerativeUIState(shopUI, "cart", { items: cart.items });
  return null;
}

export function CartActions({ cart }: { cart: Cart }) {
  useGenerativeUIFunction(shopUI, "addToCart", ({ productId, quantity }) => {
    cart.addItem(productId, quantity);
    return { added: productId };
  });
  return null;
}
