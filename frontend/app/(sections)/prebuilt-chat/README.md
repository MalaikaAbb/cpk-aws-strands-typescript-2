# prebuilt-chat

**Docs:** https://docs.copilotkit.ai/strands-typescript/prebuilt-components/chat
**Route:** http://localhost:3000/prebuilt-chat
**Status:** 🧩 The docs call a demo hook (`useAgenticChatSuggestions`) without defining it. It was copied from the demo. ⚠️ One type error, caused by the docs (see below).

## Files
| File | Docs step |
|---|---|
| `agent/sections/prebuilt-chat.ts` | No backend code on this page: the shared quickstart agent |
| `frontend/app/api/copilotkit/prebuilt-chat/[[...slug]]/route.ts` | No runtime changes on this page: the quickstart runtime route |
| `page.tsx` | Basic setup (imports, `<CopilotKit>` + `<Chat />`) and Code example (`Chat`) |
| `_lib/suggestions.ts` | `useAgenticChatSuggestions` (demo code) |

## Adaptations
- The agent name is `prebuilt-chat`, not `agentic_chat` (provider `agent` and `CopilotChat` `agentId`). The runtime URL is `/api/copilotkit/prebuilt-chat`, and the agent is at `http://localhost:8000/prebuilt-chat`.
- The docs put `<CopilotKit>` inside the page (`src/app/demos/agentic-chat/page.tsx`), so it stays in `page.tsx`. There is no section `layout.tsx`.
- The docs give the provider as a JSX fragment. It is returned from a default-export `Page` component.
- The docs' provider has no `useSingleEndpoint`, so it is left out (the client uses its `"auto"` transport).
- Intelligence is not used (as quickstart).

## Demo code / stubs
- `useAgenticChatSuggestions()` from `showcase/integrations/strands-typescript/src/app/demos/agentic-chat/suggestions.ts`, copied to `_lib/suggestions.ts`. The docs only describe it as "a demo hook that wraps `useConfigureSuggestions`". The import line in `page.tsx` was added to match.

## Known issues (left as the docs have them)
- **Type error in `route.ts`:** `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` version mismatch. See the quickstart README.

## Try these prompts
Docs give no prompts. The demo hook adds three suggestion pills: **Write a sonnet**, **Tell me a joke**, **Is 17 prime?**
