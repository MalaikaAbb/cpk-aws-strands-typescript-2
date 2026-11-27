# genui-components-markdown-mode

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/components/markdown-mode
**Route:** http://localhost:3000/genui-components-markdown-mode
**Status:** 🧩 Everything the page gives was integrated (the provider config), plus a minimal page. The page gives no page component and no backend code, so the section uses a bare `<CopilotChat />` and the quickstart agent. ⚠️ The only type error is the known docs `HttpAgent` one.

## Files
| File | Docs step |
|---|---|
| `agent/sections/genui-components-markdown-mode.ts` | No backend code in the docs: quickstart agent |
| `frontend/app/api/copilotkit/genui-components-markdown-mode/[[...slug]]/route.ts` | Quickstart runtime. The page says "The runtime adds no `render_ui` tool to these runs", so nothing changes |
| `providers.tsx`, `layout.tsx` | Turn it on (React tab, `app/providers.tsx`) |
| `page.tsx` | Not in the docs: a minimal `<CopilotChat />` to chat with |

## Adaptations
- `runtimeUrl` is `/api/copilotkit/genui-components-markdown-mode`. The docs snippet names no agent (so it uses `"default"`); `agentId="genui-components-markdown-mode"` was added to `CopilotKitProvider`.
- The bare JSX snippet is wrapped in a `Providers` component, rendered from the section `layout.tsx` (as in quickstart).
- `intelligence` / `identifyUser` dropped from the runtime.
- The "Build your own prompt" variant (`sendContext: false`) is not wired in: it is for backends that build their own prompt, and its backend example is Python only.

## Demo code / stubs
None. The showcase has no markdown-mode demo.

## Known issues (left as the docs have them)
- `route.ts`: `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries` — the known `@ag-ui/client` 1.0.2 vs 1.0.5 issue, see the quickstart README.

## Open questions
- The page says a non-built-in, non-LangGraph agent "needs one thing: put the run's context entries into its system prompt", but gives no Strands code for it. The quickstart Strands agent is used unchanged. The `@ag-ui/aws-strands` adapter appears to forward the run's context to the model itself (it prepends it to the prompt), so the schema and guide may reach the model anyway; whether the agent actually writes `a2ui` blocks is for the live test.
- The page gives no page/chat component. A plain `<CopilotChat />` is used.

## Try these prompts
Docs give no prompts. (The page's example reply is a plan estimator with a "Seats" slider and a price text, so something like "Show me an estimate I can play with" exercises it.)
