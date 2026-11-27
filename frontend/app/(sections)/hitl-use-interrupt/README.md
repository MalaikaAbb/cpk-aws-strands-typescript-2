# hitl-use-interrupt

**Docs:** https://docs.copilotkit.ai/strands-typescript/human-in-the-loop/useInterrupt
**Routes:**
- http://localhost:3000/hitl-use-interrupt: main walkthrough (time picker)
- http://localhost:3000/hitl-use-interrupt/approve-cancel: "Approve / Cancel example"
- http://localhost:3000/hitl-use-interrupt/multi-interrupt: "Multi-interrupt behavior"
- http://localhost:3000/hitl-use-interrupt/multiple-interrupts: "Multiple interrupts? ... gate with `enabled`" (❌ broken)
- http://localhost:3000/hitl-use-interrupt/handler: "Preprocess with `handler`" (❌ broken)

**Status:** 🧩 Demo code was needed for the main walkthrough. The docs don't give `ResumeEnvelope`/`readResume` (backend), `TimePickerCard`, `generateFallbackSlots`, `useGenUiInterruptSuggestions`, or the end of `InterruptChat`. ❌ The `enabled` and `handler` reference snippets use components and functions that exist nowhere (`AskCard`, `ApproveCard`, `lookupUserDepartment`, `RequestAccessCard`).

## Files
| File | Docs step |
|---|---|
| `agent/sections/_hitl-use-interrupt/interrupt-agent.ts` | The backend: Step "Pause a tool with Strands' native interrupt" (`scheduleMeeting`). The same tool is shown twice on the page. |
| `agent/sections/hitl-use-interrupt.ts` | The dedicated interrupt agent (Step "Keep the pausing tool off a client-executed name"), in the quickstart `main.ts` shape plus `tools: [scheduleMeeting]` |
| `frontend/app/api/copilotkit/hitl-use-interrupt/[[...slug]]/route.ts` | Quickstart runtime (this page doesn't change it) |
| `page.tsx` | The frontend: `useInterrupt` render prop (`src/app/demos/gen-ui-interrupt/page.tsx`) |
| `_components/time-picker-card.tsx`, `card.tsx`, `button.tsx`, `badge.tsx`, `suggestions.ts`, `_lib/interrupt-fallback-slots.ts` | Demo code (see below) |
| `approve-cancel/page.tsx` | Approve / Cancel example (`ApprovalInterrupt`, verbatim) |
| `multi-interrupt/page.tsx` | Multi-interrupt behavior |
| `multiple-interrupts/page.tsx` | Multiple interrupts? Add a type and gate with `enabled` |
| `handler/page.tsx` | Preprocess with `handler` |
| `_components/example-shell.tsx` | Not from the docs. A minimal `CopilotKit` + `CopilotChat` that the four reference sub-routes mount their hooks in. |

## Adaptations
- The agent is `hitl-use-interrupt`, not `gen-ui-interrupt`, in the provider, the `agentId`s, the runtime key and the `StrandsAgent` name. The runtime URL is `/api/copilotkit/hitl-use-interrupt`.
- `<CopilotKit>` stays in the main page, as the docs have it. `"use client"` was added. Import paths changed: `../_shared/interrupt-fallback-slots` becomes `./_lib/...`, and `./suggestions` becomes `./_components/suggestions`.
- Backend: the docs show only the tool. The agent around it uses the quickstart model (`gpt-6-luna`) and system prompt (`You are a helpful AI assistant.`), with `tools: [scheduleMeeting]`. There is no `SessionManager`, because same-process resume "needs no extra wiring".
- The reference snippets (bare hook calls) are each wrapped in a small component that returns `null`, and rendered inside `ExampleShell`. `useInterrupt`'s default `renderInChat: true` puts their UI into the chat.

## Demo code / stubs
From `showcase/integrations/strands-typescript/src/`:
- `agent/interrupt-agent.ts`: `MeetingChoice`, `ResumeEnvelope` and `readResume`.
- `app/demos/gen-ui-interrupt/_components/time-picker-card.tsx`, with its dependencies `card.tsx`, `button.tsx` and `badge.tsx`.
- `app/demos/gen-ui-interrupt/suggestions.ts`: `useGenUiInterruptSuggestions`.
- `app/demos/_shared/interrupt-fallback-slots.ts`: `generateFallbackSlots`.
- `app/demos/gen-ui-interrupt/page.tsx`: the final `return <CopilotChat ... />` and the closing `}` of `InterruptChat`.
- Added well-known imports: `useState` from `react` (main page), `tool` from `@strands-agents/sdk` and `z` from `zod` (agent tool), and `useInterrupt` in the sub-routes.

## Known issues
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error (see the quickstart README).
- `multiple-interrupts/page.tsx`: `error TS2304: Cannot find name 'AskCard'.` and `Cannot find name 'ApproveCard'.` They aren't in the docs or the demo, so they are left broken. The hooks run (the `enabled` predicates are evaluated), but rendering either card throws a `ReferenceError`. These interrupts also never match the Strands agent, because its interrupts have no `type` field and the snippet is written for LangGraph ("The LangGraph adapter sends `event.value` as a JSON string").
- `handler/page.tsx`: `error TS2304: Cannot find name 'lookupUserDepartment'.` and `Cannot find name 'RequestAccessCard'.` These aren't in the docs or the demo either, so they are left broken. The handler throws a `ReferenceError` on the first interrupt.
- The main page and the agent type-check cleanly. The agent module loads (`LOAD_OK`).

## Open questions
- The agent's system prompt isn't on the page. With the generic quickstart prompt, the model might ask for a time in plain text instead of calling `schedule_meeting`. The demo uses a scheduling prompt that says it "MUST call the `schedule_meeting` tool", but that is not in the docs, so it isn't used.
- On the Strands TypeScript bridge, the `reason` is JSON-encoded into `interrupt.message`. The Approve/Cancel and multi-interrupt examples render `interrupt.message` as-is, so they will show a raw JSON string like `{"topic":...}`. That matches the docs as written.

## Try these prompts
- From the docs: "Ask the agent to book a call." The time picker appears in the chat. Pick a slot, and the agent confirms the booked time.
- Suggestion pills: `Book an intro call with the sales team to discuss pricing.` and `Schedule a 1:1 with Alice next week to review Q2 goals.`
- On `/approve-cancel` and `/multi-interrupt`, use the same booking prompt. Approve sends `{ approved: true }` or `{ ok: true }` as the resume payload. The tool sees no `chosen_label`, so it should reply "User did not pick a time". Cancel should reply "User cancelled".
