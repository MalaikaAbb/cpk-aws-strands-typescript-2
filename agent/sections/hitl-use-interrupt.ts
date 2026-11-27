// Docs: human-in-the-loop/useInterrupt -> "The backend: pause the run in your agent".
// The docs give only the `scheduleMeeting` tool (./_hitl-use-interrupt/interrupt-agent.ts) and say
// the showcase mounts a dedicated interrupt agent for it. The agent around the tool is the
// quickstart main.ts shape plus `tools: [scheduleMeeting]`; name -> "hitl-use-interrupt".
// No SessionManager: "Pause and resume on the same running process need no extra wiring."
import { Agent } from "@strands-agents/sdk";
import { OpenAIModel } from "@strands-agents/sdk/models/openai";
import { StrandsAgent } from "@ag-ui/aws-strands";
import { createStrandsApp } from "@ag-ui/aws-strands/server";
import { scheduleMeeting } from "./_hitl-use-interrupt/interrupt-agent.ts";

const model = new OpenAIModel({
  apiKey: process.env.OPENAI_API_KEY ?? "",
  modelId: "gpt-6-luna",
});

const agent = new Agent({
  model,
  systemPrompt: "You are a helpful AI assistant.",
  tools: [scheduleMeeting],
});

await agent.initialize();

const aguiAgent = new StrandsAgent({
  agent,
  name: "hitl-use-interrupt",
});

const app = await createStrandsApp(aguiAgent, { path: "/" });

export default app;
