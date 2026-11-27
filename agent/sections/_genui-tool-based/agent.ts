// Docs: generative-ui/tool-based -> "Nothing to wire on the agent" (src/agent/agent.ts), verbatim.
// Adaptation: name "chart_agent" -> "genui-tool-based".
// Added (needed): the docs call `createModel()` and use `SYSTEM_PROMPT` without defining or
// importing them. `createModel` returns the quickstart OpenAIModel; SYSTEM_PROMPT is the
// docs' ./prompts.ts.
import { Agent } from "@strands-agents/sdk";
import { OpenAIModel } from "@strands-agents/sdk/models/openai";
import { StrandsAgent } from "@ag-ui/aws-strands";
import { SYSTEM_PROMPT } from "./prompts.ts";

const createModel = async () =>
  new OpenAIModel({ apiKey: process.env.OPENAI_API_KEY ?? "", modelId: "gpt-6-luna" });

const strandsAgent = new Agent({
  model: await createModel(),
  systemPrompt: SYSTEM_PROMPT,
  tools: [],
});

export const aguiAgent = new StrandsAgent({
  agent: strandsAgent,
  name: "genui-tool-based",
  description: "Renders charts from data.",
});
