// Docs: catalogs -> "Combine catalogs" (React tab), verbatim. Not used by the provider (the
// page gives the provider `shopUI`). `cartUI` and `Hero` are never defined on the page and
// are not in the demo source, so they stay undefined.
// Added import: `z` from "zod" (well-known package, missing from the snippet).
import { z } from "zod";
import { createGenerativeUI, standardUI } from "@copilotkit/react-core/v2/generative-ui";

export const appUI = createGenerativeUI({
  id: "acme/app@1",
  extends: [standardUI, cartUI],
  components: { Hero: { component: Hero, props: z.object({ title: z.string() }) } },
});
