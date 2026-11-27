// Docs: json-render -> Backend gives no agent code, only the expected output and "the agent
// prompts ask for plain JSON". This is the quickstart main.ts with the demo's json-render system
// prompt (./_genui-json-render/prompts.ts) in place of "You are a helpful AI assistant.".
// Adaptations: name -> "genui-json-render"; `app.listen(8000)` -> `export default app`.
import { Agent } from "@strands-agents/sdk";
import { OpenAIModel } from "@strands-agents/sdk/models/openai";
import { StrandsAgent } from "@ag-ui/aws-strands";
import { createStrandsApp } from "@ag-ui/aws-strands/server";
import { BYOC_JSON_RENDER_SYSTEM_PROMPT } from "./_genui-json-render/prompts.ts";

// Setup your Strands agent
const model = new OpenAIModel({
  apiKey: process.env.OPENAI_API_KEY ?? "",
  modelId: "gpt-6-luna",
});

const agent = new Agent({
  model,
  systemPrompt: BYOC_JSON_RENDER_SYSTEM_PROMPT,
});

await agent.initialize();

// Wrap with AG-UI integration
const aguiAgent = new StrandsAgent({
  agent,
  name: "genui-json-render",
});

// Create the Express app
const app = await createStrandsApp(aguiAgent, { path: "/" });

export default app;
