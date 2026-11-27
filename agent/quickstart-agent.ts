/**
 * SHARED — do not edit on section branches.
 *
 * The quickstart agent from
 * https://docs.copilotkit.ai/strands-typescript/quickstart?agent=bring-your-own
 * ("Expose your agent via AG-UI", TypeScript tab), wrapped in a function so
 * every section without its own backend code can reuse it under its own name.
 * Only changes from the docs: `name` is the section slug, and the app is
 * returned instead of `app.listen(8000)` (agent/server.ts mounts it).
 */
import { Agent } from "@strands-agents/sdk";
import { OpenAIModel } from "@strands-agents/sdk/models/openai";
import { StrandsAgent } from "@ag-ui/aws-strands";
import { createStrandsApp } from "@ag-ui/aws-strands/server";

export async function createQuickstartApp(name: string) {
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
    name,
  });

  // Create the Express app
  const app = await createStrandsApp(aguiAgent, { path: "/" });

  return app;
}
