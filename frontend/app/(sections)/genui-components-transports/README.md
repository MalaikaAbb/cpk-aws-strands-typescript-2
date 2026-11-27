# genui-components-transports

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/components/transports
**Routes:**
- http://localhost:3000/genui-components-transports: "Tool transport" (`generativeUI={{ ui: standardUI }}`)
- http://localhost:3000/genui-components-transports/markdown: "Markdown transport" (`transport: "markdown"`)
- http://localhost:3000/genui-components-transports/agent-ids: "Only some agents" (`agentIds`)

**Status:** ✅ Everything the React tabs need was provided. The "Try it" chat page is reused, since this page has none. ⚠️ One type error, the known docs issue.

## Files
| File | Docs step |
|---|---|
| `agent/sections/genui-components-transports.ts` | No Strands backend code on the page: shared quickstart Strands agent |
| `frontend/app/api/copilotkit/genui-components-transports/[[...slug]]/route.ts` | "Tool transport": runtime `generativeUI: true` (`app/api/copilotkit/route.ts`) |
| `providers.tsx`, `layout.tsx` | "Tool transport", "Markdown transport" and "Only some agents" provider configs, chosen by sub-route |
| `page.tsx`, `markdown/page.tsx`, `agent-ids/page.tsx` | Not on this page: "Try it" `<CopilotChat />` |

## Adaptations
- Agent `default` -> `genui-components-transports` (runtime key, provider `agentId`). The docs' `agent` is the quickstart `HttpAgent`. `runtimeUrl`/`basePath` -> `/api/copilotkit/genui-components-transports`.
- `agentIds: ["shop"]` -> `agentIds: ["genui-components-transports"]` (agent-name rule).
- Three independent provider configs, so there are three sub-routes. `providers.tsx` picks the config by pathname and keys the provider by it.

## Demo code / stubs
None.

## Known issues
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` mismatch (see the quickstart README).

## Open questions
- The runtime uses `generativeUI: true` ("for every run"), as the docs snippet does. All three sub-routes share this runtime. So `/markdown` runs may also get the `render_ui` tool, if the runtime adds it whenever it sees a catalog. The docs don't say how `generativeUI: true` and `transport: "markdown"` interact. If `/markdown` replies with tool calls instead of `a2ui` blocks, this is the likely cause.
- With the agent-name rule, `agentIds` lists the only agent, so `/agent-ids` behaves like `/`. Only a second agent would show "The other agents get no catalog".

## Try these prompts
Docs give no prompts. Use the "Try it" prompt `Compare the Starter, Team, and Enterprise plans in a table` on each route. On `/` and `/agent-ids` the UI arrives as `render_ui` tool calls, with the text in a separate message. On `/markdown` it is an `a2ui` code block inside the reply, with text before and after it. Inspector -> Generative UI -> **Prompt** shows what each run carries.
