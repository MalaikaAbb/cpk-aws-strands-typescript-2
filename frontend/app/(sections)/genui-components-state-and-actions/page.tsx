"use client";
// The state-and-actions page gives no page. The "Try it" app/page.tsx (<CopilotChat />) of
// generative-ui/components, plus the docs' `CartState` and `CartActions` mounted with a
// minimal cart (addition) and its readout.
import { CopilotChat } from "@copilotkit/react-core/v2";
import { CartActions, CartState, CartSummary } from "./_components/cart";
import { useCart } from "./_lib/cart";

export default function Page() {
  const cart = useCart();
  return (
    <main>
      <CartState cart={cart} />
      <CartActions cart={cart} />
      <CartSummary cart={cart} />
      <CopilotChat />
    </main>
  );
}
