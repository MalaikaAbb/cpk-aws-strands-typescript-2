// Docs: generative-ui/open-generative-ui has no backend code; it only says the agent must
// forward the run's frontend tools (Strands: "Other agents forward the frontend tools from the
// run input"). So this is the quickstart agent, under this section's names.
// Two agents, as the docs runtime lists two: the minimal one at /genui-open-generative-ui and
// the sandbox-functions one at /genui-open-generative-ui-advanced.
import { createQuickstartApp } from "../quickstart-agent.ts";

export const mounts = {
  advanced: await createQuickstartApp("genui-open-generative-ui-advanced"),
};

export default await createQuickstartApp("genui-open-generative-ui");
