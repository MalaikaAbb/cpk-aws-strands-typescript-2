// Docs: frontend-tools -> "Nothing to wire on the agent" (src/agent/agent.ts), verbatim.
// Adaptation: name "chart_agent" -> "frontend-tools".
// Imports added: `createModel` (demo model-factory, see that file) and `SYSTEM_PROMPT`
// (./prompts.ts, the docs' next step); the snippet uses both without importing them.
import { Agent } from "@strands-agents/sdk";
import { StrandsAgent } from "@ag-ui/aws-strands";
import { createModel } from "./model-factory.ts";
import { SYSTEM_PROMPT } from "./prompts.ts";

const strandsAgent = new Agent({
  model: await createModel(),
  systemPrompt: SYSTEM_PROMPT,
  tools: [],
});

export const aguiAgent = new StrandsAgent({
  agent: strandsAgent,
  name: "frontend-tools",
  description: "Renders charts from data.",
});
