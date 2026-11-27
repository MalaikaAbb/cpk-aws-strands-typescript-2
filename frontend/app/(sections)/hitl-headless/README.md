# hitl-headless

**Docs:** https://docs.copilotkit.ai/strands-typescript/human-in-the-loop/headless
**Routes:**
- http://localhost:3000/hitl-headless: "Subscribe to the interrupt yourself" (`interrupt-headless` page: app surface + chat)
- http://localhost:3000/hitl-headless/panel: "Use `useInterrupt` without the chat" (`HeadlessInterruptPanel`)
- http://localhost:3000/hitl-headless/panel-raw: `HeadlessInterruptPanelRaw` (❌ broken)

**Status:** ❌ / 🧩
- ❌ **The page gives no backend code**, so (following the section rules) the agent is the plain quickstart agent. It has no tool that pauses, so **no interrupt will ever arrive** and none of the three UIs can show a picker. The page assumes the `schedule_meeting` interrupt agent from the `useInterrupt` page but never says so or links to it.
- 🧩 The main page uses `AppSurface` and `TimeSlotPopup` without defining them, and imports `../_shared/interrupt-fallback-slots`. All of these are copied from the demo.
- ❌ `HeadlessInterruptPanelRaw` uses `useHeadlessInterrupt` "from the snippet", but the snippet doesn't define it, and neither does the demo.

## Files
| File | Docs step |
|---|---|
| `agent/sections/hitl-headless.ts` | No backend code in the docs, so this is the quickstart agent |
| `frontend/app/api/copilotkit/hitl-headless/[[...slug]]/route.ts` | Quickstart runtime (this page doesn't change it) |
| `page.tsx` | Subscribe to the interrupt yourself (`src/app/demos/interrupt-headless/page.tsx`), plus demo components |
| `_lib/interrupt-fallback-slots.ts` | Demo code |
| `panel/page.tsx` | Use `useInterrupt` without the chat (`HeadlessInterruptPanel`) |
| `panel-raw/page.tsx` | The same panel built on `useHeadlessInterrupt` (`HeadlessInterruptPanelRaw`) |
| `_lib/slots.ts` | `SLOTS` from the first sample, shared with the second ("SLOTS is the list from the previous sample") |
| `_components/provider-shell.tsx` | Not from the docs. A provider-only `<CopilotKit>` for the two panels (the docs say no chat is needed) |

## Adaptations
- The agent is `hitl-headless`, not `interrupt-headless`, in the provider, the `agentId`s and the runtime key. The runtime URL is `/api/copilotkit/hitl-headless`.
- `<CopilotKit>` stays in the main page, as the docs have it. `"use client"` was added.
- The panel snippets have no imports or provider. `useCopilotKit`, `useAgent` and `useInterrupt` are imported from `@copilotkit/react-core/v2`, and each panel is rendered as the only child of a provider-only shell.

## Demo code / stubs
From `showcase/integrations/strands-typescript/src/app/demos/`:
- `_shared/interrupt-fallback-slots.ts`: `generateFallbackSlots` and `TimeSlot`.
- `interrupt-headless/page.tsx`: `AppSurface` (with `ResolvingState` and `EmptyState`) and `TimeSlotPopup`, appended below the docs snippet in `page.tsx`.

## Known issues
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error (see the quickstart README).
- `panel/page.tsx` and `panel-raw/page.tsx`, at `copilotkit.runAgent({ agent })`: `Type '.../@copilotkit/runtime/node_modules/@ag-ui/client/dist/index").AbstractAgent' is not assignable to type '.../@copilotkit/shared/node_modules/@ag-ui/client/dist/index").AbstractAgent'. Types have separate declarations of a private property '_threadId'.` This is the same duplicated-`@ag-ui/client` version problem as the route error. It is a type-only problem and should work at runtime.
- `panel-raw/page.tsx`: `error TS2304: Cannot find name 'useHeadlessInterrupt'.` This route throws a `ReferenceError` when rendered.
- Behaviour: the quickstart agent never pauses, so "Book call" or "Book an intro call..." just gets a text reply. The picker can't appear on any route.

## Open questions
- **Which backend?** The page gives none. It says only that AWS Strands "finishes the run with a standard AG-UI interrupt outcome", and the demo backs `interrupt-headless` with the dedicated `schedule_meeting` interrupt agent (the one the `useInterrupt` page builds). The section rules ("no backend code in the docs means quickstart") were followed literally. If this page is meant to build on the `useInterrupt` backend, swap `agent/sections/hitl-headless.ts` for the `hitl-use-interrupt` agent.
- The prose after the main snippet describes a "hand-rolled variant" (a staged ref, `onRunFinalized`, `onRunStartedEvent`, `onRunFailed`) and then a `useHeadlessInterrupt` hook "from the snippet". For Strands, the snippet is the `useInterrupt` version, so that variant and the hook don't exist on this page.

## Try these prompts (from the docs)
- `/panel` and `/panel-raw`: click **Book call** (sends "Book a call with sales."). The docs expect slot buttons to replace it while the agent waits.
- `/` (main): the suggestion pills `Book an intro call with the sales team to discuss pricing.` and `Schedule a 1:1 with Alice next week to review Q2 goals.`. The docs expect a time-slot popup on the left app surface.
