# shared-state-agent-readonly

**Docs:** https://docs.copilotkit.ai/strands-typescript/shared-state/agent-readonly
**Route:** http://localhost:3000/shared-state-agent-readonly
**Status:** 🧩 Demo code was needed. The docs' `page.tsx` imports `DemoLayout`, `ACTIVITIES` and `useReadonlyStateAgentContextSuggestions` without giving them, and stops partway through `DemoContent`. The missing parts come from the demo. Type-checks apart from the usual `HttpAgent` error.

## Files
| File | Docs step |
|---|---|
| `agent/sections/shared-state-agent-readonly.ts` | No backend code on the page: the quickstart agent |
| `frontend/app/api/copilotkit/shared-state-agent-readonly/[[...slug]]/route.ts` | The quickstart runtime (this page doesn't change it) |
| `page.tsx` | "Wire it to your own state" (`page.tsx` up to the `useState` hooks) + "How it works in code" (the 3 `useAgentContext` calls) |
| `_components/demo-layout.tsx`, `_components/suggestions.ts` | Demo code: the files the docs' `page.tsx` imports |
| `_components/{badge,card,checkbox,input,label,select}.tsx` | Demo code used by `DemoLayout` |

## Adaptations
- The agent is `shared-state-agent-readonly`, replacing `readonly-state-agent-context` in `agent=` and `agentId=`. The runtime URL is `/api/copilotkit/shared-state-agent-readonly`.
- `<CopilotKit>` stays in the page, as the docs have it.
- `./demo-layout` and `./suggestions` move to `./_components/`. In `demo-layout.tsx`, `./_components/*` becomes `./*`.

## Demo code / stubs
All from `showcase/integrations/strands-typescript/src/app/demos/readonly-state-agent-context/`:
- `page.tsx`: the `"use client"` directive and the end of `DemoContent` after the `useAgentContext` calls (`useReadonlyStateAgentContextSuggestions()`, `toggleActivity`, and the `<DemoLayout ... />` return). The docs snippet ends after the `useState` hooks.
- `demo-layout.tsx` (`ACTIVITIES`, `TIMEZONES`, `DemoLayout`, `ContextStat`) and `suggestions.ts`. The docs import both.
- `_components/{badge,card,checkbox,input,label,select}.tsx`, which `DemoLayout` imports.

This is close to the whole demo. The docs import these modules, and `DemoContent` cannot be completed without them.

## Known issues (left as the docs have them)
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error. See the quickstart README.
- The docs say "The setup above shows the code for your framework", but the Strands page shows no agent-side setup for context. The quickstart agent is used as-is. Per the shared-state page, the Strands adapter passes `inputData.context` to the model. Whether the agent actually sees the entries needs a live check.

## Open questions
- Is a Strands-specific backend step missing from this page? It refers to "the setup above", but no setup is shown.

## Try these prompts (from the docs)
- `What is my name?`: the agent should answer with `userName` (`Atai`). Change the name in the Identity card and ask again: the answer should change.
- Demo suggestions (from the copied `suggestions.ts`): `What do you know about me from my context?`, `Based on my recent activity, what should I try next?`.
