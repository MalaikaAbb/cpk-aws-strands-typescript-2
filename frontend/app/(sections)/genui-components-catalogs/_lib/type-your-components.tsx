// Docs: catalogs -> "Type your components" (React tab), verbatim. Not rendered: it is here
// to check the documented typing (`props.color` should be a type error).
// Added imports (the snippet has none): the type, and `shopUI` from ../catalog.
import type { GenerativeUIComponentProps } from "@copilotkit/react-core/v2/generative-ui";
import { shopUI } from "../catalog";

function ProductCard(props: GenerativeUIComponentProps<typeof shopUI, "ProductCard">) {
  props.price; // number
  props.color; // type error: not a prop of ProductCard
}
