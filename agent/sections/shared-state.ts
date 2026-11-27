// Docs: shared-state -> "Reading agent state" steps, on the quickstart main.ts shape.
// "Pass `config` to `ShowcaseStrandsAgent` with your Strands `Agent`." -> ShowcaseStrandsAgent replaces
// the quickstart's StrandsAgent wrapper. The `set_notes` tool (demo code) is attached as `tools`.
// The system prompt stays the quickstart's: the docs say to describe the copied state in it but
// give no prompt.
// Adaptations: name "strands_agent" -> "shared-state"; `app.listen(8000)` -> `export default app`.
import { Agent } from "@strands-agents/sdk";
import { OpenAIModel } from "@strands-agents/sdk/models/openai";
import { createStrandsApp } from "@ag-ui/aws-strands/server";
import { ShowcaseStrandsAgent, config } from "./_shared-state/agent.ts";
import { setNotes } from "./_shared-state/tools.ts";

// Setup your Strands agent
const model = new OpenAIModel({
  apiKey: process.env.OPENAI_API_KEY ?? "",
  modelId: "gpt-6-luna",
});

const agent = new Agent({
  model,
  systemPrompt: "You are a helpful AI assistant.",
  tools: [setNotes],
});

await agent.initialize();

// Wrap with AG-UI integration
const aguiAgent = new ShowcaseStrandsAgent({
  agent,
  name: "shared-state",
  config,
});

// Create the Express app
const app = await createStrandsApp(aguiAgent, { path: "/" });

export default app;
