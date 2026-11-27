# quickstart

**Docs:** https://docs.copilotkit.ai/strands-typescript/quickstart?agent=bring-your-own
**Route:** http://localhost:3000/quickstart
**Status:** ✅ Everything was provided by the docs. Chat works end to end. ⚠️ There is one type error, caused by the docs (see below).

## Files
| File | Docs step |
|---|---|
| `agent/sections/quickstart.ts` | Expose your agent via AG-UI (TypeScript `main.ts`) |
| `frontend/app/api/copilotkit/quickstart/[[...slug]]/route.ts` | Setup Copilot Runtime |
| `providers.tsx`, `layout.tsx` | Configure CopilotKit Provider |
| `page.tsx` | Add the chat interface |

## Adaptations (the same structural changes as every section)
- The agent name is `quickstart`, not `strands_agent`. The runtime URL is `/api/copilotkit/quickstart`, and the agent is at `http://localhost:8000/quickstart`.
- `app.listen(8000)` is replaced with `export default app`. The shared `agent/server.ts` mounts the app.
- `Providers` is rendered in this section's `layout.tsx`, not in the root layout.
- Intelligence is not used. `intelligence` and `identifyUser` are dropped, as the docs callout "Running without the Intelligence Platform?" describes. The runtime runs in SSE mode with an in-memory runner.

## Demo code / stubs
None.

## Known issues (left as the docs have them)
- **Type error in `route.ts`:** `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. The docs pin `@ag-ui/client@1.0.2`, but `@copilotkit/runtime@1.90.2` depends on `@ag-ui/client@1.0.5`. It works at runtime (`next dev` doesn't type-check), so chat is not affected.

## Try these prompts (from the docs)
- `What can you do?`
- `Please tell me a joke.`
- `What do you think about React?`

Also: click the **Inspector** button in the corner, then open **Inspect → Agent** (the agent is listed) and **Inspect → AG-UI Events** (events appear as you chat). **Rich Threads** shows as locked, because Intelligence is off.
