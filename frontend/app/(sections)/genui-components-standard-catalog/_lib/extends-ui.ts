// Docs: standard-catalog -> "Add your own components" (React tab), verbatim.
// NOT wired into the provider: `ProductCard` and `productSchema` are never defined on the
// page (it points to Catalogs, whose ProductCard is a module-local function with an inline
// schema) and are not in the demo source. Importing this module would throw a
// ReferenceError and take the whole section down, so it is only type-checked.
import { createGenerativeUI, standardUI } from "@copilotkit/react-core/v2/generative-ui";

export const appUI = createGenerativeUI({
  id: "acme/app@1",
  extends: [standardUI],
  components: {
    ProductCard: { component: ProductCard, props: productSchema },
  },
});
