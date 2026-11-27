// Docs: fixed-schema -> "Nothing about A2UI depends on how the agent itself is built ... the tool
// drops into whatever agent you already have": the quickstart main.ts with `tools: [displayFlight]`.
// The tool and the schema loading are in ./_genui-a2ui-fixed-schema/agent.ts.
// Adaptations: name -> "genui-a2ui-fixed-schema"; `app.listen(8000)` -> `export default app`.
import { Agent } from "@strands-agents/sdk";
import { OpenAIModel } from "@strands-agents/sdk/models/openai";
import { StrandsAgent } from "@ag-ui/aws-strands";
import { createStrandsApp } from "@ag-ui/aws-strands/server";
import { displayFlight } from "./_genui-a2ui-fixed-schema/agent.ts";

// Setup your Strands agent
const model = new OpenAIModel({
  apiKey: process.env.OPENAI_API_KEY ?? "",
  modelId: "gpt-6-luna",
});

const agent = new Agent({
  model,
  systemPrompt: "You are a helpful AI assistant.",
  tools: [displayFlight],
});

await agent.initialize();

// Wrap with AG-UI integration
const aguiAgent = new StrandsAgent({
  agent,
  name: "genui-a2ui-fixed-schema",
});

// Create the Express app
const app = await createStrandsApp(aguiAgent, { path: "/" });

export default app;
