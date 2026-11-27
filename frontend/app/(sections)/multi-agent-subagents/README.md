# multi-agent-subagents

**Docs:** https://docs.copilotkit.ai/strands-typescript/multi-agent/subagents
**Route:** http://localhost:3000/multi-agent-subagents
**Status:** 🧩 Demo code was needed. The docs give the sub-agent tools, the state hook factory and the `DelegationLog` component. They don't give the supervisor agent, how `makeSubagentStateFromResult` is attached to it, a page, or several identifiers used in the snippets.

## Files
| File | Docs step |
|---|---|
| `agent/sections/_multi-agent-subagents/state.ts` | `src/agent/state.ts` (the first block on the page) |
| `agent/sections/_multi-agent-subagents/tools.ts` | Setting up sub-agents + Exposing sub-agents as tools (`src/agent/tools.ts`) |
| `agent/sections/multi-agent-subagents.ts` | Supervisor: the quickstart `main.ts` shape + the three delegation tools + `toolBehaviors` (demo) |
| `_components/delegation-log.tsx` | Rendering a live delegation log (`src/app/demos/subagents/delegation-log.tsx`) |
| `page.tsx` | Not given. A minimal page built from the prose (`useAgent` with `OnStateChanged`/`OnRunStatusChanged`, read `agent.state.delegations`, render the log) + `<CopilotChat />` |
| `providers.tsx`, `layout.tsx` | Provider, from quickstart. The page doesn't show it |
| `frontend/app/api/copilotkit/multi-agent-subagents/[[...slug]]/route.ts` | Quickstart runtime |

## Adaptations
- The agent is `multi-agent-subagents` (the `StrandsAgent` name, the provider, `useAgent`/`CopilotChat` `agentId` and the runtime key). The runtime URL is `/api/copilotkit/multi-agent-subagents`.
- `tools.ts`: removed `fetch: forwardingFetch` and its comment, as the docs say: "If the excerpt uses a header-forwarding helper, such as `forwardingFetch` ..., leave it out of your app."
- Added well-known imports: `tool` (`@strands-agents/sdk`), `OpenAI` (`openai`, already installed in `agent/`) and `z` (`zod`). Also added the in-section import of `SUBAGENT_FAILURE_MARKER` from `./state.ts`, which `runSubagent` uses.
- The supervisor's model and system prompt are the quickstart ones (`gpt-6-luna`, `You are a helpful AI assistant.`). Sub-agents use `SUBAGENT_MODEL_ID ?? "gpt-6-luna"`, as in the docs.

## Demo code / stubs
From `showcase/integrations/strands-typescript/src/`:
- `agent/state.ts`: `import type { ToolResultContext, StatePayload } from "@ag-ui/aws-strands"`. The docs use the types without importing them.
- `agent/model-factory.ts`: `AIMOCK_CONTEXT` (`process.env.AIMOCK_CONTEXT ?? "strands-typescript"`), used in `openaiClient()`'s `defaultHeaders`. It is aimock test-server plumbing, kept only because the docs code references it.
- `agent/agent.ts`: the `StrandsAgentConfig.toolBehaviors` entries that attach `makeSubagentStateFromResult(...)` to `research_agent`, `writing_agent` and `critique_agent`. Only those three entries were taken.
- `app/demos/subagents/delegation-log.tsx`: `SubAgentName`, `Delegation`, `DelegationLogProps` and `SUB_AGENT_STYLE`.
- Not taken: the demo page's `DemoLayout`, `SubAgentActivityCard`, `useRenderTool` renderers, `inferActiveSubAgent`, suggestions and supervisor prompt. The docs don't mention them.

## Known issues
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error (see the quickstart README).
- There are no other type errors. The agent module loads (`LOAD_OK`).
- `state.ts` also contains `salesStateFromResult` (a sales-todos hook from an unrelated demo). It is kept because the docs include it, but it is unused here.
- The frontend `Delegation.status` type (from the demo) is only `"completed"`, while the backend can also write `"failed"`. This is a type-only mismatch.

## Open questions
- **Supervisor prompt / wiring:** the page never shows the supervisor agent or its system prompt. With the generic quickstart prompt, the model might not delegate in the research → write → critique order, or might not delegate at all, unless asked explicitly. The demo's supervisor instructions live in a big shared `SYSTEM_PROMPT` and were not copied.
- The delegation-log hook wiring (`toolBehaviors.<tool>.stateFromResult`) is essential for the UI and is missing from this page. It was taken from the demo. It might be meant to come from the Shared State page.
- The Callout about merging by `id` refers to "the LangGraph excerpt above", which doesn't exist on the Strands page.

## Try these prompts
The docs give no literal prompts. Based on the prose ("Research → Write → Critique"), try for example: `Research the history of the bicycle, write a one-paragraph summary, then critique it. Use your sub-agents.` Each delegation should appear in the "Sub-agent delegations" log on the left as it happens, and the indicator chips should light up.
