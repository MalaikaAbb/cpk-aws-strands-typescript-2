// Docs: generative-ui/open-generative-ui -> "Register sandbox functions on the provider"
// (sandbox-functions.ts), verbatim.
import { z } from "zod";

export const openGenUiSandboxFunctions = [
  {
    name: "notifyHost",
    description: "Send a short notification message from the sandboxed UI to the host page.",
    parameters: z.object({
      message: z.string().describe("A short status message."),
    }),
    handler: async ({ message }: { message: string }) => {
      console.log("notifyHost:", message);
      return { ok: true, message };
    },
  },
];
