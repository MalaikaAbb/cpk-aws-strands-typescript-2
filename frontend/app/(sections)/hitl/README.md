# hitl

**Docs:** https://docs.copilotkit.ai/strands-typescript/human-in-the-loop
**Route:** http://localhost:3000/hitl
**Status:** 🧩 Demo code was needed. The Pattern 1 page snippet stops before `Chat`'s `return` and `}`. `TimePickerCard` is given only as a props interface. The backend tool uses `ResumeEnvelope` and `readResume`, and the docs don't define them.

## Files
| File | Docs step |
|---|---|
| `page.tsx` | Pattern 1: `useHumanInTheLoop` (`src/app/demos/hitl-in-chat/page.tsx`), including the `DEFAULT_SLOTS` snippet |
| `_components/time-picker-card.tsx` | `TimePickerCard` (props shown in the docs, full file from the demo) |
| `agent/sections/_hitl/interrupt-agent.ts` | Step "Pause a tool with Strands' native interrupt" (`scheduleMeeting`) |
| `agent/sections/hitl.ts` | Default export: the quickstart agent for Pattern 1. `mounts.interrupt`: the dedicated interrupt agent (Step "Keep the pausing tool off a client-executed name") |
| `frontend/app/api/copilotkit/hitl/[[...slug]]/route.ts` | Quickstart runtime (this page doesn't change it) |

## Adaptations
- The agent is `hitl`, not `hitl-in-chat`, in `agent`, `agentId` (both hooks and `CopilotChat`) and the runtime key. The runtime URL is `/api/copilotkit/hitl`.
- `<CopilotKit>` stays in the page, as the docs have it. `"use client"` was added.
- `./time-picker-card` becomes `./_components/time-picker-card`.
- Backend: the docs give only the `scheduleMeeting` tool. Step 2 says it lives on a dedicated interrupt agent, not on the agent behind the `useHumanInTheLoop` page. It is mounted at `:8000/hitl-interrupt` with the quickstart `main.ts` agent shape (same model and system prompt) plus `tools: [scheduleMeeting]`. It isn't registered in the runtime, because this page wires no frontend to it. Pattern 2 points to the `useInterrupt` page.
- `intelligence` and `identifyUser` are dropped from the runtime, as in quickstart.

## Demo code / stubs
- `src/app/demos/hitl-in-chat/page.tsx`: `return <CopilotChat agentId="hitl-in-chat" className="h-full rounded-2xl" />;` and the closing `}` of `Chat`, with `agentId` adapted.
- `src/app/demos/hitl-in-chat/time-picker-card.tsx`: the whole file (`TimeSlot`, `TimePickerStatus`, `TimePickerCardProps`, `TimePickerCard`). The docs say "The full file is in the Code view of the demo".
- `src/agent/interrupt-agent.ts`: `MeetingChoice`, `ResumeEnvelope` and `readResume`.
- Added well-known imports: `tool` from `@strands-agents/sdk` and `z` from `zod` (in `interrupt-agent.ts`).

## Known issues
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error (see the quickstart README).
- There are no other type errors. The agent module loads (`LOAD_OK`).

## Open questions
- The page shows a backend interrupt tool (in Steps) but runs only a frontend-tool example. It is unclear whether the docs mean the interrupt tool to be part of the overview setup. Here it is mounted as its own agent and is unused by this page's UI.
- The `book_call` description says "ALWAYS prefer this tool over `schedule_meeting`". The agent behind this page has no `schedule_meeting`, because Step 2 keeps it on the interrupt agent, so the sentence has no effect here.

## Try these prompts (from the docs' suggestions)
- `Please book an intro call with the sales team to discuss pricing.`
- `Schedule a 1:1 with Alice next week to review Q2 goals.`

Expected result: a time picker card appears in the chat. Pick a slot, or click "None of these work", and the agent continues with that result. Inspector → **Inspect → Frontend Tools** should list `book_call` and its schema.
