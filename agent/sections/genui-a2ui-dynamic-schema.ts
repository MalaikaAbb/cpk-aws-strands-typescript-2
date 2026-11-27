// Docs: dynamic-schema gives no TypeScript agent code, so this is the quickstart main.ts.
// The one change is the "Agent setup" prose: "Tell the model in its instructions when to call
// generate_a2ui, for example for any answer that needs a dashboard, a card layout, or a chart.
// A model with no instruction about the tool answers in prose and never calls it."
// The systemPrompt below says exactly that, and nothing more.
// Adaptations: name -> "genui-a2ui-dynamic-schema"; `app.listen(8000)` -> `export default app`.
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
  systemPrompt:
    "You are a helpful AI assistant. Call generate_a2ui for any answer that needs a dashboard, a card layout, or a chart.",
});

await agent.initialize();

// Wrap with AG-UI integration
const aguiAgent = new StrandsAgent({
  agent,
  name: "genui-a2ui-dynamic-schema",
});

// Create the Express app
const app = await createStrandsApp(aguiAgent, { path: "/" });

export default app;
