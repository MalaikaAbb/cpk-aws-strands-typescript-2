// Docs: from-a2ui -> "Convert a custom catalog" ("After", React tab), verbatim.
// Added: the `z` import from "zod" (the snippet uses `z` without importing it) and the
// imports of Airport / Arrow (referenced, never given; see ../_components/flight.tsx).
import { z } from "zod";
import {
  createGenerativeUI,
  standardUI,
} from "@copilotkit/react-core/v2/generative-ui";
import { Airport, Arrow } from "../_components/flight";

export const appUI = createGenerativeUI({
  id: "acme/flights@1",
  extends: [standardUI],
  components: {
    Airport: {
      component: Airport,
      description: "An airport by IATA code, with its city under it.",
      props: z.object({ code: z.string(), city: z.string() }),
    },
    Arrow: { component: Arrow, description: "An arrow between two airports." },
  },
});
