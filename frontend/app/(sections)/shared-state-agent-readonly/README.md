# shared-state-agent-readonly

**Docs:** https://docs.copilotkit.ai/strands-typescript/shared-state/agent-readonly
**Route:** http://localhost:3000/shared-state-agent-readonly
**Status:** 🧩 Demo code was needed. The docs' `page.tsx` imports `ACTIVITIES` (from the demo's `demo-layout`) and stops partway through `DemoContent`. Only `ACTIVITIES` is kept, and the component is closed with a plain name input. Type-checks apart from the usual `HttpAgent` error.

## Files
| File | Docs step |
|---|---|
| `agent/sections/shared-state-agent-readonly.ts` | No backend code on the page: the quickstart agent |
| `frontend/app/api/copilotkit/shared-state-agent-readonly/[[...slug]]/route.ts` | The quickstart runtime (this page doesn't change it) |
| `page.tsx` | "Wire it to your own state" (`page.tsx` up to the `useState` hooks) + "How it works in code" (the 3 `useAgentContext` calls) |
| `_components/demo-layout.tsx` | Demo code: only `ACTIVITIES` |

## Adaptations
- The agent is `shared-state-agent-readonly`, replacing `readonly-state-agent-context` in `agent=` and `agentId=`. The runtime URL is `/api/copilotkit/shared-state-agent-readonly`.
- `<CopilotKit>` and `<CopilotPopup>` stay in the page, as the docs have them. `./demo-layout` becomes `./_components/demo-layout`.
- `"use client"` is added, because the page uses `useState`.
- `DemoContent` is closed with `return <input value={userName} onChange={...} />`. That is the minimum UI needed to change the name, as the docs' "Try it" asks.

## Demo code / stubs
- `ACTIVITIES` (from the demo's `demo-layout.tsx`): the docs' `useState` uses it as the initial `recentActivity`.

## Removed (not needed for functionality)
- From the docs snippet: the `DemoLayout` import (a demo layout component) and the `useReadonlyStateAgentContextSuggestions` import (a suggestions hook).
- The demo's `DemoLayout` (identity, activity and JSON cards), `TIMEZONES`, `ContextStat`, `suggestions.ts`, the six shadcn UI components (`badge`, `card`, `checkbox`, `input`, `label`, `select`), and the demo's `toggleActivity`, suggestions call and `<DemoLayout>` return.
- Because of that, the timezone and recent-activity values are still published to the agent, but have no UI to change them.

## Known issues (left as the docs have them)
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error. See the quickstart README.
- The docs say "The setup above shows the code for your framework", but the Strands page shows no agent-side setup for context. The quickstart agent is used as-is. Per the shared-state page, the Strands adapter passes `inputData.context` to the model. Whether the agent actually sees the entries needs a live check.

## Open questions
- Is a Strands-specific backend step missing from this page? It refers to "the setup above", but no setup is shown.

## Try these prompts (from the docs)
- `What is my name?`: the agent should answer with `userName` (`Atai`). Change the name in the input and ask again: the answer should change.
