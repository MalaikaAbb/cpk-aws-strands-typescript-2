# hitl-governed-actions

**Docs:** https://docs.copilotkit.ai/strands-typescript/human-in-the-loop/governed-actions
**Route:** http://localhost:3000/hitl-governed-actions
**Status:** ❌ / ✅
- ✅ The frontend snippets are complete, and no demo code was needed. The `useHumanInTheLoop` sample (`approve_governed_action`) can run against the quickstart agent.
- ❌ The only backend on the page is **Python** (LangGraph `send_email` + `interrupt()`), with no TypeScript or Strands version. The agent is therefore the quickstart agent. It never interrupts, so the `useInterrupt` sample (`GovernedActionApproval`) can't fire. There is also one type error in the `useInterrupt` sample (see below).

## Files
| File | Docs step |
|---|---|
| `_components/governed-action-approval.tsx` | Action envelope (`GovernedAction`) + Inline approval with `useInterrupt` |
| `_components/governed-action-tool.tsx` | Tool-call approval with `useHumanInTheLoop` |
| `page.tsx` | Not given by the docs. A minimal page that mounts both components and a `<CopilotChat />` |
| `providers.tsx`, `layout.tsx` | Provider, from quickstart. The page doesn't show it |
| `agent/sections/hitl-governed-actions.ts` | No TypeScript backend in the docs, so this is the quickstart agent |
| `frontend/app/api/copilotkit/hitl-governed-actions/[[...slug]]/route.ts` | Quickstart runtime |

## Adaptations
- The agent is `hitl-governed-actions` and the runtime URL is `/api/copilotkit/hitl-governed-actions`. The provider sits in the section layout, as in quickstart.
- The `GovernedAction` type from "Action envelope" is placed in the same file as the `useInterrupt` sample, which uses it without importing it.
- `export` was added to `GovernedAction`, `GovernedActionApproval`, `GovernedActionCard` and `GovernedActionTool`. `"use client"` was added to both component files. The tool sample imports `GovernedActionCard`, which it uses but doesn't import.
- The hooks have no `agentId`, so they use the provider's agent. Nothing to rename.

## Demo code / stubs
None. There is no governed-actions demo in the showcase. The Python `deliver_email` ("your own email client") belongs to the skipped Python backend.

## Known issues
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error (see the quickstart README).
- `governed-action-approval.tsx(22,5)`: `Type '({ event, interrupt, resolve, cancel }: InterruptRenderProps<any, null>) => Element | null' is not assignable to type '(props: InterruptRenderProps<any, null>) => ReactElement<...>'. Type 'null' is not assignable to type 'ReactElement<...>'.` The docs' `render` returns `null` when there is no action, but `useInterrupt`'s `render` type doesn't allow `null`. This is a docs bug. It works at runtime.
- No interrupt backend: the quickstart agent never pauses, so the inline `useInterrupt` approval card never shows. The Python backend would need a TypeScript/Strands port (a tool calling `context.interrupt({ name, reason: { action } })`), and the docs don't give one. Note also that on the Strands TS bridge, `reason` arrives JSON-encoded in `interrupt.message`, not in `interrupt.metadata.action` (see the `useInterrupt` page). So even with a Strands backend, this sample's `interrupt?.metadata?.action ?? parseInterruptValue(event.value)?.action` would likely find no action.

## Open questions
- For "Ask the agent to send an email", the docs expect the model to call `approve_governed_action` on its own, filling in `id`, `reference`, `verdict` and so on. Nothing on the agent side (prompt or tool) tells it to. With the quickstart prompt it might just answer in text. The docs give nothing more, so nothing was added.

## Try these prompts (from the docs)
- `Send an email to alice@example.com saying the report is ready.` ("Ask the agent to send an email.") The approval card should show the tool, the reference and the arguments. Click **Reject**, and the agent should reply that it did not send the email. The card shows approve/reject buttons only for `verdict: "require_approval"`. `allow` and `deny` auto-respond.
