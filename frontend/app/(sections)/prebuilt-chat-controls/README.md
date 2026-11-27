# prebuilt-chat-controls

**Docs:** https://docs.copilotkit.ai/strands-typescript/prebuilt-components/chat-controls
**Route:** http://localhost:3000/prebuilt-chat-controls (plus the sub-routes below)
**Status:** ❌ Partly broken. The toggle snippet uses `config` without a null check (a type error, and a crash wherever the hook returns `null`). The feedback example's undefined `analytics.track(...)` placeholder is replaced with `console.log(...)`, at the user's request. The other examples were provided in full. There is no demo for this page.

## Routes (one per independent example)
| Route | Docs section |
|---|---|
| `/prebuilt-chat-controls` | Control the open state from your own UI (`Layout`: nav button + `<CopilotSidebar open onOpenChange>`) |
| `/prebuilt-chat-controls/open-button` | Programmatically open or close the chat: `OpenChatButton` next to `<CopilotSidebar />` |
| `/prebuilt-chat-controls/toggle` | "To toggle, read `config.isModalOpen` and flip it": the toggle button next to `<CopilotSidebar />` |
| `/prebuilt-chat-controls/with-provider` | Callout: wrap the button and the chat in one `<CopilotChatConfigurationProvider isModalDefaultOpen={false}>` |
| `/prebuilt-chat-controls/default-open` | `<CopilotSidebar defaultOpen={false} />` |
| `/prebuilt-chat-controls/feedback` | Capture message feedback (thumbs up / down) |

## Files
| File | Docs step |
|---|---|
| `agent/sections/prebuilt-chat-controls.ts` | No backend code on this page: the shared quickstart agent |
| `frontend/app/api/copilotkit/prebuilt-chat-controls/[[...slug]]/route.ts` | No runtime changes on this page: the quickstart runtime route |
| `layout.tsx`, `providers.tsx` | No provider code on this page: the quickstart provider |
| `page.tsx` | Control the open state from your own UI (verbatim, plus `export default Layout`) |
| `_components/open-chat-button.tsx` | `OpenChatButton` (verbatim, plus `export`) |
| `_components/toggle-chat-button.tsx` | The toggle `<button>` snippet, wrapped in a minimal `ToggleChatButton` component |
| `open-button/page.tsx`, `toggle/page.tsx`, `with-provider/page.tsx` | Minimal pages that render the buttons next to a `<CopilotSidebar />` |
| `default-open/page.tsx` | `defaultOpen` snippet |
| `feedback/page.tsx` | Thumbs up / down snippet |

## Adaptations
- The agent name is `prebuilt-chat-controls`. The runtime URL is `/api/copilotkit/prebuilt-chat-controls`, and the agent is at `http://localhost:8000/prebuilt-chat-controls`. The docs' components pass no `agentId`, so they use the provider's agent.
- The provider is in this section's `layout.tsx` (via `providers.tsx`), as quickstart does.
- Each snippet is a separate example, so each one gets its own sub-route.
- Intelligence is not used (as quickstart).

## Demo code / stubs
None. There is no demo for this page. Minimal additions to exercise the snippets:
- `ToggleChatButton`: the docs give only the button JSX, which reads `config`. The component gets `config` from `useCopilotChatConfiguration()`, as the `OpenChatButton` snippet does. No null check was added.
- The sub-route pages, which only place the docs' buttons next to a `<CopilotSidebar />`.
- `with-provider/page.tsx`: the docs describe the `CopilotChatConfigurationProvider` wrapper in prose only. It was written exactly as the callout says.

## Known issues (left as the docs have them)
- **`analytics` replaced with `console.log`** (`feedback/page.tsx`): the docs use an undefined `analytics.track("feedback", { messageId, value })` placeholder for your own analytics client. At the user's request it is now `console.log("feedback", { messageId, value })`, so clicking a thumb logs to the browser console instead of throwing.
- **Toggle snippet has no null check** (`_components/toggle-chat-button.tsx`): `error TS18047: 'config' is possibly 'null'.` (three times). `useCopilotChatConfiguration()` returns `CopilotChatConfigurationValue | null`. If it returns `null` where the button is rendered, the page crashes on render (`Cannot read properties of null (reading 'isModalOpen')`).
- **Type error in `route.ts`:** `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` version mismatch. See the quickstart README.

## Open questions
- **Where to render `OpenChatButton` and the toggle button.** The docs say "from anywhere inside the provider", but the callout says the prebuilt surfaces create modal state "inside the chat only", so a button outside the chat gets no `setModalOpen`. The most literal reading was used: the buttons sit outside the sidebar, next to it (`open-button`, `toggle`). Per the callout, `OpenChatButton` is then expected to render nothing. The `with-provider` route tests the callout's fix.
- **The toggle snippet's `config`.** The docs never say where `config` comes from in that snippet. It is assumed to be the same `useCopilotChatConfiguration()` value as in `OpenChatButton`.

## Try these prompts
Docs give no prompts. What to check, from the prose:
- `/prebuilt-chat-controls`: the sidebar starts closed. **Ask the assistant** in the nav opens it. Closing it from the sidebar's own toggle goes through `onOpenChange`.
- `/prebuilt-chat-controls/open-button` and `/toggle`: does a button render, and does it open the sidebar?
- `/prebuilt-chat-controls/with-provider`: **Ask the assistant** and **Open chat / Close chat** should open and close the sidebar.
- `/prebuilt-chat-controls/default-open`: the sidebar starts closed and can be opened with its launcher.
- `/prebuilt-chat-controls/feedback`: send any message (for example `Please tell me a joke.`). Thumbs-up and thumbs-down buttons ("Good response" / "Bad response") should appear on the assistant reply. Clicking one logs `feedback { messageId, value: "up" | "down" }` to the browser console.
