# webmcp

**Docs:** https://docs.copilotkit.ai/strands-typescript/webmcp
**Route:** http://localhost:3000/webmcp (sub-route `/webmcp/core-only`)
**Status:** ❌ Partly broken. `searchOrders` is called in both snippets but never defined, and it is not in the demo either. The tool registers and appears in WebMCP, but calling it throws `ReferenceError: searchOrders is not defined`. The `webmcp` option itself type-checks.

Needs Chrome 149+ with the WebMCP origin trial or `chrome://flags/#enable-webmcp-testing`. Use the Model Context Tool Inspector extension to see and call the tool.

## Routes
| Route | Docs section |
|---|---|
| `/webmcp` | React frontend tool (`OrderSearch.tsx`, `useFrontendTool` with `webmcp.annotations`) |
| `/webmcp/core-only` | WebMCP only, with no agent (`webmcp.ts`, `CopilotKitCore` with `tools`) |

## Files
| File | Docs step |
|---|---|
| `agent/sections/webmcp.ts` | No backend code on the page: the quickstart agent |
| `frontend/app/api/copilotkit/webmcp/[[...slug]]/route.ts` | The quickstart runtime (this page doesn't change it) |
| `layout.tsx`, `providers.tsx` | The quickstart provider ("your existing CopilotKitProvider") |
| `_components/OrderSearch.tsx` | React frontend tool, verbatim |
| `page.tsx` | Host: renders `<OrderSearch />` |
| `_lib/webmcp.ts` | WebMCP only, with no agent, verbatim |
| `core-only/page.tsx` | Host: imports `webmcp.ts` (creates the core) and renders nothing |

## Adaptations
- The agent is `webmcp`, and the runtime URL is `/api/copilotkit/webmcp`.
- The docs give no page. `page.tsx` only mounts `OrderSearch` under the provider.
- `core-only/page.tsx` only imports `copilotkit` from `_lib/webmcp.ts`, which keeps it alive. It still sits under the section layout's `<CopilotKit>`, which this path doesn't need. The second provider-side core may also register tools, but `OrderSearch` is not mounted on this route.

## Demo code / stubs
None. The demo has no WebMCP code. `searchOrders` is left undefined.

## Removed (not needed for functionality)
- From `page.tsx`: the `<main>`/`<h1>Your App</h1>` wrapper and `<CopilotSidebar />`. WebMCP calls come from the browser agent, not from the CopilotKit chat.

## Known issues (left as the docs have them)
- `_components/OrderSearch.tsx(15,28): error TS2304: Cannot find name 'searchOrders'.`
- `_lib/webmcp.ts(14,30): error TS2304: Cannot find name 'searchOrders'.`
  Both handlers throw `ReferenceError` when the tool is called (by the browser agent).
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error. See the quickstart README.

## Open questions
- `/core-only` renders an empty page. The docs give no UI for the "no agent" path. Is that the intended test surface (Inspector only)?

## Try these prompts
Docs give no chat prompts. "Test the complete path" says: in Chrome with WebMCP enabled, check that `document.modelContext` exists. Open the Model Context Tool Inspector and check that `searchOrders` appears with its `status` enum schema. Call it with `{"status": "open"}` (expected to fail with the `searchOrders` ReferenceError). Then ask the inspector's agent something like "find my open orders".
