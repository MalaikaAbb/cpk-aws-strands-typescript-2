// Docs: quickstart?agent=bring-your-own -> "Expose your agent via AG-UI" (TypeScript, main.ts)
// Adaptations: name "strands_agent" -> "quickstart"; `app.listen(8000)` -> `export default app`
// (agent/server.ts mounts it at http://localhost:8000/quickstart).
import { Agent } from "@strands-agents/sdk";
import { OpenAIModel } from "@strands-agents/sdk/models/openai";
import { StrandsAgent } from "@ag-ui/aws-strands";
import { createStrandsApp } from "@ag-ui/aws-strands/server";

// Setup your Strands agent
const model = new OpenAIModel({
  apiKey: process.env.OPENAI_API_KEY ?? "",
  modelId: "gpt-6-luna",
});

const agent = new Agent({
  model,
  systemPrompt: "You are a helpful AI assistant.",
});

await agent.initialize();

// Wrap with AG-UI integration
const aguiAgent = new StrandsAgent({
  agent,
  name: "quickstart",
});

// Create the Express app
const app = await createStrandsApp(aguiAgent, { path: "/" });

export default app;
