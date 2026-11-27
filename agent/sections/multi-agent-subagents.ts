// Docs: multi-agent/subagents. The page gives the sub-agent tools (./_multi-agent-subagents/tools.ts)
// and the `stateFromResult` factory (./_multi-agent-subagents/state.ts), but not the supervisor
// agent. The supervisor is the quickstart main.ts shape plus the three delegation tools; name ->
// "multi-agent-subagents".
// Demo code: the `config.toolBehaviors` wiring of makeSubagentStateFromResult (the page says
// delegations are recorded into shared state but never shows how the hook is attached) is copied
// from showcase src/agent/agent.ts, only the three sub-agent entries.
import { Agent } from "@strands-agents/sdk";
import { OpenAIModel } from "@strands-agents/sdk/models/openai";
import { StrandsAgent } from "@ag-ui/aws-strands";
import type { StrandsAgentConfig } from "@ag-ui/aws-strands";
import { createStrandsApp } from "@ag-ui/aws-strands/server";
import { makeSubagentStateFromResult } from "./_multi-agent-subagents/state.ts";
import {
  researchAgent,
  writingAgent,
  critiqueAgent,
} from "./_multi-agent-subagents/tools.ts";

const model = new OpenAIModel({
  apiKey: process.env.OPENAI_API_KEY ?? "",
  modelId: "gpt-6-luna",
});

const agent = new Agent({
  model,
  systemPrompt: "You are a helpful AI assistant.",
  tools: [researchAgent, writingAgent, critiqueAgent],
});

await agent.initialize();

// --- demo code (showcase src/agent/agent.ts, sub-agent entries only) ---
const config: StrandsAgentConfig = {
  toolBehaviors: {
    // Sub-agents — append a delegation entry carrying the actual output.
    research_agent: {
      stateFromResult: makeSubagentStateFromResult("research_agent"),
    },
    writing_agent: {
      stateFromResult: makeSubagentStateFromResult("writing_agent"),
    },
    critique_agent: {
      stateFromResult: makeSubagentStateFromResult("critique_agent"),
    },
  },
};
// --- end demo code ---

const aguiAgent = new StrandsAgent({
  agent,
  name: "multi-agent-subagents",
  config,
});

const app = await createStrandsApp(aguiAgent, { path: "/" });

export default app;
