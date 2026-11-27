# headless-threads

**Docs:** https://docs.copilotkit.ai/strands-typescript/headless-threads (+ Intelligence from https://docs.copilotkit.ai/strands-typescript/intelligence/quickstart)
**Route:** http://localhost:3000/headless-threads (sub-routes `/pagination` and `/agent-per-thread`)
**Status:** 🧩 A stand-in was needed. `verifyAppSession` (in the docs' `server.ts`) is undefined and not in the demo, so a fixed local identity was written, following the Intelligence quickstart's prose. Everything else type-checks, apart from the usual `HttpAgent` error.

Needs `CPK_INTELLIGENCE_API_KEY` in the root `.env`.

## Routes
| Route | Docs section |
|---|---|
| `/headless-threads` | List and manage threads (`ThreadSidebar.tsx`) + Switch between threads (`App.tsx`) |
| `/headless-threads/pagination` | Add pagination for large thread lists |
| `/headless-threads/agent-per-thread` | Driving one agent per thread (`useAgent` with `agentId` + `runtimeAgentId` + `threadId`) |

## Files
| File | Docs step |
|---|---|
| `agent/sections/headless-threads.ts` | No agent code on the page: the quickstart agent |
| `frontend/app/api/copilotkit/headless-threads/[[...slug]]/route.ts` | Configure your Runtime with CopilotKit Intelligence (`server.ts`), mounted per the Intelligence quickstart (GET/POST/PATCH/DELETE) |
| `providers.tsx`, `layout.tsx` | Intelligence quickstart: Connect your frontend (`CopilotKitProvider`, `useSingleEndpoint={false}`) |
| `_components/ThreadSidebar.tsx` | List and manage threads with useThreads |
| `_components/App.tsx`, `page.tsx` | Switch between threads |
| `_components/PaginatedThreadSidebar.tsx`, `pagination/page.tsx` | Add pagination for large thread lists |
| `agent-per-thread/page.tsx` | Driving one agent per thread |

## Adaptations
- The agent key `default` and `useThreads({ agentId: "default" })` become `headless-threads`. So does `runtimeAgentId: "default"`. `agentId="headless-threads"` is set on `<CopilotKitProvider>`, because `<CopilotChat>` passes no agent.
- The runtime's undefined `agent` is the quickstart's `HttpAgent({ url: "http://localhost:8000/headless-threads" })`.
- The page gives no provider, so the Intelligence quickstart's `<CopilotKitProvider runtimeUrl useSingleEndpoint={false}>` is used, in the section layout.
- `ThreadSidebar` and `App` get `export` so they can be imported. `App.tsx` uses `<ThreadSidebar />` without importing it, so the import is completed. `page.tsx` (`"use client"`) renders `<App />`.
- Pagination: the docs give a fragment "for ThreadSidebar.tsx". It is merged into a copy of the step-2 `ThreadSidebar`: `limit: 20` plus the pagination fields, and the "Load more" button after the list.
- `agent-per-thread`: the docs give only the `useAgent` call. A `ThreadAgent` per listed thread runs it and renders `null`, because the docs give no UI. This route only shows that the matched-set shape compiles and mounts.

## Demo code / stubs
- The demo has no threads code.
- `verifyAppSession(request)` is not defined by the docs or the demo. It returns `{ user: { id: "local-user", name: "Local user" } }`, following the Intelligence quickstart's "A fixed identity is suitable only for a local, single-user demo".

## Known issues (left as the docs have them)
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error. See the quickstart README.
- `ThreadSidebar` destructures `deleteThread` but never uses it. There is no Delete button, although the prose talks about `deleteThread`.
- The `className="flex"` in `App.tsx` makes the sidebar and chat sit side by side with no sizing. Left as written.

## Open questions
- The identity for `identifyUser`: a fixed local user, written from prose because no code is given.
- Pagination: there is no complete file in the docs. The fragment was merged into the step-2 sidebar, which is the most literal reading.

## Try these prompts (from the docs)
Docs give no prompts. To test ("Check the thread list"): open the app in two browser tabs and send a message in one. The new thread appears in the other tab's sidebar. Click it, and the chat loads that conversation. Also try Rename (sets the name to "Renamed") and Archive (hides the thread).
