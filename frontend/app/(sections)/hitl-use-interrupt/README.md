# hitl-use-interrupt

**Docs:** https://docs.copilotkit.ai/strands-typescript/human-in-the-loop/useInterrupt
**Routes:**
- http://localhost:3000/hitl-use-interrupt: main walkthrough (time picker)
- http://localhost:3000/hitl-use-interrupt/approve-cancel: "Approve / Cancel example"
- http://localhost:3000/hitl-use-interrupt/multi-interrupt: "Multi-interrupt behavior"
- http://localhost:3000/hitl-use-interrupt/multiple-interrupts: "Multiple interrupts? ... gate with `enabled`" (❌ broken)
- http://localhost:3000/hitl-use-interrupt/handler: "Preprocess with `handler`" (❌ broken)

**Status:** 🧩 Missing pieces were needed for the main walkthrough. The docs don't give `ResumeEnvelope`/`readResume` (backend), `TimePickerCard`, `generateFallbackSlots`, or the end of `InterruptChat`. ❌ The `enabled` and `handler` reference snippets use components and functions that exist nowhere (`AskCard`, `ApproveCard`, `lookupUserDepartment`, `RequestAccessCard`).

## Files
| File | Docs step |
|---|---|
| `agent/sections/_hitl-use-interrupt/interrupt-agent.ts` | The backend: Step "Pause a tool with Strands' native interrupt" (`scheduleMeeting`). The same tool is shown twice on the page. |
| `agent/sections/hitl-use-interrupt.ts` | The dedicated interrupt agent (Step "Keep the pausing tool off a client-executed name"), in the quickstart `main.ts` shape plus `tools: [scheduleMeeting]` |
| `frontend/app/api/copilotkit/hitl-use-interrupt/[[...slug]]/route.ts` | Quickstart runtime (this page doesn't change it) |
| `page.tsx` | The frontend: `useInterrupt` render prop (`src/app/demos/gen-ui-interrupt/page.tsx`) |
| `_components/time-picker-card.tsx`, `_lib/interrupt-fallback-slots.ts` | Minimal versions of pieces the docs import but don't give (see below) |
| `approve-cancel/page.tsx` | Approve / Cancel example (`ApprovalInterrupt`, verbatim) |
| `multi-interrupt/page.tsx` | Multi-interrupt behavior |
| `multiple-interrupts/page.tsx` | Multiple interrupts? Add a type and gate with `enabled` |
| `handler/page.tsx` | Preprocess with `handler` |
| `_components/example-shell.tsx` | Not from the docs. A bare `CopilotKit` + `CopilotChat` (no styling) that the four reference sub-routes mount their hooks in. |

## Adaptations
- The agent is `hitl-use-interrupt`, not `gen-ui-interrupt`, in the provider, the `agentId`s, the runtime key and the `StrandsAgent` name. The runtime URL is `/api/copilotkit/hitl-use-interrupt`.
- `<CopilotKit>` stays in the main page, as the docs have it. `"use client"` was added. Import path changed: `../_shared/interrupt-fallback-slots` becomes `./_lib/...`.
- Backend: the docs show only the tool. The agent around it uses the quickstart model (`gpt-6-luna`) and system prompt (`You are a helpful AI assistant.`), with `tools: [scheduleMeeting]`. There is no `SessionManager`, because same-process resume "needs no extra wiring".
- The reference snippets (bare hook calls) are each wrapped in a small component that returns `null`, and rendered inside `ExampleShell`. `useInterrupt`'s default `renderInChat: true` puts their UI into the chat.

## Demo code / stubs
- `agent/sections/_hitl-use-interrupt/interrupt-agent.ts`: `MeetingChoice`, `ResumeEnvelope` and `readResume`, from the demo `src/agent/interrupt-agent.ts`. The docs' tool calls `readResume`.
- `_components/time-picker-card.tsx`: a minimal, unstyled `TimePickerCard` + `TimeSlot`, with the demo's props. It shows one button per slot that calls `onSubmit({ chosen_time, chosen_label })`, plus "None of these work", which calls `onSubmit({ cancelled: true })`. The docs page imports and renders it.
- `_lib/interrupt-fallback-slots.ts`: a minimal `generateFallbackSlots()` with four upcoming slots. The page imports it, and it is needed because the Strands interrupt payload carries no slots.
- `page.tsx`: `return <CopilotChat agentId="hitl-use-interrupt" />;` and the closing `}` of `InterruptChat`.
- Added well-known imports: `useState` from `react` (main page), `tool` from `@strands-agents/sdk` and `z` from `zod` (agent tool), and `useInterrupt` in the sub-routes.

## Removed (not needed for functionality)
- The docs snippet's `import { useGenUiInterruptSuggestions } from "./suggestions"` and its `useGenUiInterruptSuggestions()` call, along with the demo `suggestions.ts` (suggestion pills).
- The demo's `card.tsx`, `button.tsx` and `badge.tsx`, plus all styling, test IDs and picked/cancelled badge states in `TimePickerCard`.
- The demo's date-math `generateFallbackSlots` ("Tomorrow"/"Monday" labels), replaced by a short version.
- The wrapper `div`s and `className`s in `ExampleShell` and on the final `<CopilotChat>`.

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
- For example: `Book an intro call with the sales team to discuss pricing.`
- On `/approve-cancel` and `/multi-interrupt`, use the same booking prompt. Approve sends `{ approved: true }` or `{ ok: true }` as the resume payload. The tool sees no `chosen_label`, so it should reply "User did not pick a time". Cancel should reply "User cancelled".
