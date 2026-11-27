// Docs: human-in-the-loop.
// - Pattern 1 (useHumanInTheLoop) is frontend-only, so the agent the page talks to
//   (default export, http://localhost:8000/hitl) is the quickstart agent.
// - Steps "Pause a tool with Strands' native interrupt" + "Keep the pausing tool off a
//   client-executed name": the docs' `scheduleMeeting` interrupt tool goes on a *dedicated*
//   interrupt agent, mounted at http://localhost:8000/hitl-interrupt. The docs give only the
//   tool, so the agent around it is the quickstart main.ts shape plus `tools: [scheduleMeeting]`.
//   This page wires no frontend to it (Pattern 2 points to the useInterrupt page).
import { Agent } from "@strands-agents/sdk";
import { OpenAIModel } from "@strands-agents/sdk/models/openai";
import { StrandsAgent } from "@ag-ui/aws-strands";
import { createStrandsApp } from "@ag-ui/aws-strands/server";
import { createQuickstartApp } from "../quickstart-agent.ts";
import { scheduleMeeting } from "./_hitl/interrupt-agent.ts";

const model = new OpenAIModel({
  apiKey: process.env.OPENAI_API_KEY ?? "",
  modelId: "gpt-6-luna",
});

const interruptAgent = new Agent({
  model,
  systemPrompt: "You are a helpful AI assistant.",
  tools: [scheduleMeeting],
});

await interruptAgent.initialize();

const interruptAguiAgent = new StrandsAgent({
  agent: interruptAgent,
  name: "hitl-interrupt",
});

export const mounts = {
  interrupt: await createStrandsApp(interruptAguiAgent, { path: "/" }),
};

export default await createQuickstartApp("hitl");
