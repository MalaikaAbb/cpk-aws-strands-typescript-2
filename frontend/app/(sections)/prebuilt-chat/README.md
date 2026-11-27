# prebuilt-chat

**Docs:** https://docs.copilotkit.ai/strands-typescript/prebuilt-components/chat
**Route:** http://localhost:3000/prebuilt-chat
**Status:** ✅ The chat works with the docs' code. One docs line, a call to a demo suggestions hook, was removed (see below). ⚠️ One type error, caused by the docs (see below).

## Files
| File | Docs step |
|---|---|
| `agent/sections/prebuilt-chat.ts` | No backend code on this page: the shared quickstart agent |
| `frontend/app/api/copilotkit/prebuilt-chat/[[...slug]]/route.ts` | No runtime changes on this page: the quickstart runtime route |
| `page.tsx` | Basic setup (imports, `<CopilotKit>` + `<Chat />`) and Code example (`Chat`) |

## Adaptations
- The agent name is `prebuilt-chat`, not `agentic_chat` (provider `agent` and `CopilotChat` `agentId`). The runtime URL is `/api/copilotkit/prebuilt-chat`, and the agent is at `http://localhost:8000/prebuilt-chat`.
- The docs put `<CopilotKit>` inside the page, so it stays in `page.tsx`. There is no section `layout.tsx`.
- The docs give the provider as a JSX fragment. It is returned from a default-export `Page` component.
- The docs' provider has no `useSingleEndpoint`, so it is left out (the client uses its `"auto"` transport).
- Intelligence is not used (as quickstart).

## Demo code / stubs
None.

## Removed (not needed for functionality)
- The docs' `useAgenticChatSuggestions();` line in `Chat`. The docs call it "a demo hook that wraps `useConfigureSuggestions`" to add starter suggestions, and never define it. It was deleted together with its demo copy (`_lib/suggestions.ts`).

## Known issues (left as the docs have them)
- **Type error in `route.ts`:** `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` version mismatch. See the quickstart README.

## Try these prompts
Docs give no prompts. Any message works, for example `Please tell me a joke.`
