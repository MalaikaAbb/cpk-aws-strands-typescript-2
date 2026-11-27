// Docs: standard-catalog -> "Drop components", verbatim.
// Added import (the snippet has none): createGenerativeUI, standardUI.
import { createGenerativeUI, standardUI } from "@copilotkit/react-core/v2/generative-ui";

export const appUI = createGenerativeUI({
  id: "acme/app@1",
  extends: [standardUI.omit(["Map", "Video", "HtmlView"])],
  components: {},
});
