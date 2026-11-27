// Docs: catalogs -> "Positional parameter order", verbatim. Not used by the provider.
// `Panel` is never defined on the page and is not in the demo source, so it stays undefined.
// Added imports: `z` from "zod" and `createGenerativeUI` (missing from the snippet).
import { z } from "zod";
import { createGenerativeUI } from "@copilotkit/react-core/v2/generative-ui";

const ui = createGenerativeUI({
  id: "acme/panel@1",
  components: {
    Panel: {
      component: Panel,
      props: z.object({ title: z.string(), color: z.string().optional() }),
      slots: { children: "multiple" },
      parameterOrder: ["title", "children"],
    },
  },
});
