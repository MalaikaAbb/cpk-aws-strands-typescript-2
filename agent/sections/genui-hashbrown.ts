// Docs: hashbrown -> Backend gives no agent code, only an example message and "The bundled agents
// use this envelope". This is the quickstart main.ts with the demo's hashbrown system
// prompt (./_genui-hashbrown/prompts.ts) in place of "You are a helpful AI assistant.".
// Adaptations: name -> "genui-hashbrown"; `app.listen(8000)` -> `export default app`.
import { Agent } from "@strands-agents/sdk";
import { OpenAIModel } from "@strands-agents/sdk/models/openai";
import { StrandsAgent } from "@ag-ui/aws-strands";
import { createStrandsApp } from "@ag-ui/aws-strands/server";
import { BYOC_HASHBROWN_SYSTEM_PROMPT } from "./_genui-hashbrown/prompts.ts";

// Setup your Strands agent
const model = new OpenAIModel({
  apiKey: process.env.OPENAI_API_KEY ?? "",
  modelId: "gpt-6-luna",
});

const agent = new Agent({
  model,
  systemPrompt: BYOC_HASHBROWN_SYSTEM_PROMPT,
});

await agent.initialize();

// Wrap with AG-UI integration
const aguiAgent = new StrandsAgent({
  agent,
  name: "genui-hashbrown",
});

// Create the Express app
const app = await createStrandsApp(aguiAgent, { path: "/" });

export default app;
