// Docs: generative-ui/tool-rendering -> "The backend tool definition" (src/agent/tools.ts),
// wired into the quickstart main.ts agent (quickstart?agent=bring-your-own, TypeScript).
// Adaptations: name "strands_agent" -> "genui-tool-rendering"; `app.listen(8000)` -> `export default app`.
// The docs don't show how tools are attached: `tools: [getWeather, searchFlights]` (search_flights is not in the docs).
import { Agent } from "@strands-agents/sdk";
import { OpenAIModel } from "@strands-agents/sdk/models/openai";
import { StrandsAgent } from "@ag-ui/aws-strands";
import { createStrandsApp } from "@ag-ui/aws-strands/server";
import { getWeather, searchFlights } from "./_genui-tool-rendering/tools.ts";

// Setup your Strands agent
const model = new OpenAIModel({
  apiKey: process.env.OPENAI_API_KEY ?? "",
  modelId: "gpt-6-luna",
});

const agent = new Agent({
  model,
  systemPrompt: "You are a helpful AI assistant.",
  tools: [getWeather, searchFlights],
});

await agent.initialize();

// Wrap with AG-UI integration
const aguiAgent = new StrandsAgent({
  agent,
  name: "genui-tool-rendering",
});

// Create the Express app
const app = await createStrandsApp(aguiAgent, { path: "/" });

export default app;
