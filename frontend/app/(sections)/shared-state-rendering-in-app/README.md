# shared-state-rendering-in-app

**Docs:** https://docs.copilotkit.ai/strands-typescript/shared-state/rendering-in-app
**Route:** http://localhost:3000/shared-state-rendering-in-app (sub-route `/write-back`)
**Status:** ❌ Likely broken as written. `components/Canvas.tsx` uses `useEffect` and `app/page.tsx` has no `"use client"`, so Next.js should reject the page as a Server Component that uses a client hook. Beyond that, the page gives no agent-side state code, so "Ask the agent to add a task" can't work with the quickstart agent. Everything else was provided.

> ⚠️ **This route breaks every route on `main` until the dev server restarts.** The missing `"use client"` is a *compile* error (`You're importing a module that depends on useEffect into a React Server Component module`). Next keeps the error and returns HTTP 500 for every route, on both Turbopack and webpack, until `npm run dev` is restarted. On `main`, test this section last, or test it on its own branch.

## Routes
| Route | Docs section |
|---|---|
| `/shared-state-rendering-in-app` | The pattern (`Canvas`) + Put it anywhere in your layout (`app/page.tsx`) |
| `/shared-state-rendering-in-app/write-back` | Writing back from the main view (`toggleItem`) |

## Files
| File | Docs step |
|---|---|
| `agent/sections/shared-state-rendering-in-app.ts` | No backend code on the page: the quickstart agent |
| `frontend/app/api/copilotkit/shared-state-rendering-in-app/[[...slug]]/route.ts` | The quickstart runtime (this page doesn't change it) |
| `_components/Canvas.tsx` | The pattern (`components/Canvas.tsx`), verbatim |
| `page.tsx` | Put it anywhere in your layout (`app/page.tsx`) |
| `_components/CanvasWithToggle.tsx`, `write-back/page.tsx` | Writing back from the main view |

## Adaptations
- `runtimeUrl` becomes `/api/copilotkit/shared-state-rendering-in-app`. `agent="shared-state-rendering-in-app"` is added to `<CopilotKit>`, because the docs pass no agent (`"default"`). `useAgent()` stays without arguments: it resolves through the provider's chat configuration to that agent. (The docs comment "No agentId means the "default" agent" is not true under `<CopilotKit agent>`.)
- `<CopilotKit>` stays in the page, as the docs have it. `../components/Canvas` becomes `./_components/Canvas`.
- `write-back`: the docs' `toggleItem` uses `agent`, so it is placed inside a copy of `Canvas` (`CanvasWithToggle`) and wired to each `<li>`'s `onClick`. The docs don't say how `toggleItem` is triggered. The click wiring is the only addition.

## Demo code / stubs
None. (The demo has no rendering-in-app page for strands-typescript.)

## Known issues (left as the docs have them)
- **No `"use client"`:** `Canvas.tsx` (`useEffect`, `useAgent`) and `app/page.tsx` have none. The page is a Server Component importing a hook component. Next.js should fail with a "useEffect only works in Client Components" error. `tsc` doesn't catch this.
- `CanvasWithToggle.tsx`: `error TS7006: Parameter 'it' implicitly has an 'any' type.` The docs' `toggleItem` maps `agent.state?.items` (untyped) without a type.
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error. See the quickstart README.
- The page gives no backend. The quickstart agent has no tool or state handling, so it can't add a task to `state.items`. It also never sees the UI state: the Strands agent only knows the state your code copies into context (see the shared-state page). So "ask the agent which tasks are done" can't work either.
- The `app-shell` and `canvas` class names have no CSS in the docs.

## Open questions
- Should the page work with the quickstart agent, or does it assume the shared-state page's backend (`withStateContext` + a state-writing tool)? The docs don't say. The quickstart agent was used, because this page has no backend code.

## Try these prompts (from the docs)
- `Add a task called "Write the launch post"`: a new item should appear in the canvas list.
- On `/write-back`, click an item to toggle it done, then ask `Which tasks are done?`: the agent should name the item you marked.
