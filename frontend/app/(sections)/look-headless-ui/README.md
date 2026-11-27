# look-headless-ui

**Docs:** https://docs.copilotkit.ai/strands-typescript/custom-look-and-feel/headless-ui
**Routes:** http://localhost:3000/look-headless-ui (Minimal example) and http://localhost:3000/look-headless-ui/complete (Complete example)
**Status:** 🧩 Both examples are fragments, so the glue they call is added in its simplest form: wrappers, `visible`, `generateMessageId`, the minimal bubbles, and unstyled stand-ins for `Avatar`, `cn`, `AttachmentChip` and `ActivityWrapper`. There are type errors only (see below). ⚠️ The docs' "weather in Tokyo" check can't show a tool card (see Known issues).

## Files
| File | Docs step |
|---|---|
| `agent/sections/look-headless-ui.ts` | No backend code in the docs: the quickstart agent |
| `frontend/app/api/copilotkit/look-headless-ui/[[...slug]]/route.ts` | Quickstart runtime |
| `providers.tsx`, `layout.tsx` | Quickstart provider |
| `page.tsx` | Renders the Minimal example's `Chat` |
| `_components/headless-simple/chat.tsx` | Minimal example (both snippets, verbatim) |
| `_components/headless-simple/message-bubble.tsx` | Minimal bubbles the Minimal example uses |
| `complete/page.tsx` | Minimal shell for the Complete example |
| `_components/headless-complete/chat/message-list.tsx` | The `MessageList` component, Per-role dispatch, Tool-call composition (verbatim) |
| `_components/headless-complete/chat/message-assistant.tsx` | Bubble chrome (verbatim) |
| `_components/headless-complete/chat/message-activity.tsx`, `attachments/attachment-preview.tsx`, `_components/ui/avatar.tsx`, `_lib/utils.ts` | Minimal stand-ins for pieces the docs' code uses |

## Adaptations
- `agentId: "headless-simple"` becomes `"look-headless-ui"`. The quickstart provider is in `layout.tsx`.
- The two examples are separate routes. Intelligence is not used.

## Demo code / stubs (kept because the docs' code calls them)
- `chat.tsx`: the `Chat()` wrapper and imports, `visible` (the docs' `.map()` uses it), `generateMessageId` (now just `crypto.randomUUID()`), and a plain `<input>` + Send button so `send` can run.
- `message-bubble.tsx`: `UserBubble` / `AssistantBubble` as `<div>You: …</div>` / `<div>Agent: …</div>`.
- `message-list.tsx`: the imports and the `MessageList({ messages })` signature, from the demo.
- `message-assistant.tsx`: the imports and the `MultimodalPart` type, from the demo.
- `Avatar` / `AvatarFallback` (plain `<div>`s), `cn` (joins class names), `AttachmentChip` (shows the filename), `ActivityWrapper` (a `<div>`). The docs' bubbles and list use them without defining them.
- `complete/page.tsx`: passes `agent.messages` to `MessageList`, with a plain input that uses `addMessage` + `runAgent`.

## Removed (not needed for functionality)
- The shadcn `Avatar` / `Button` (radix-ui), the `cva` button variants, `tailwind-merge`/`clsx` `cn`.
- The demo `AttachmentChip`'s thumbnail, icons, size formatting and remove button.
- The demo `ActivityWrapper` styling, the bubble styling and test IDs in the simple bubbles, the UUID fallback in `generateMessageId`, and the disabled-button logic.

## Known issues (left as the docs have them)
- `message-list.tsx`: `Module '"@copilotkit/shared"' has no exported member 'ToolMessage'.` The docs' snippet uses `ToolMessage`, and the import the demo uses doesn't exist in the installed package (type-only).
- `chat.tsx` and `complete/page.tsx`, on `copilotkit.runAgent({ agent })`: `Type '...@copilotkit/runtime/node_modules/@ag-ui/client...AbstractAgent' is not assignable to type '...@copilotkit/shared/node_modules/@ag-ui/client...AbstractAgent'.` This is the same `@ag-ui/client` version split as the route (type-only).
- `route.ts`: the known `HttpAgent is missing ... _threadId, _maxEnforcedEntries` error (see the quickstart README).
- The docs' check ("ask the agent for the weather in Tokyo ... the tool card renders inside it") can't work as written. The page gives no backend (so this is the quickstart agent, with no tools) and registers no tool renderers.

## Open questions
- The docs' "Bubble chrome" snippet keeps its own Tailwind classes, ReactMarkdown and lucide icons, because it is docs code. Only the pieces it depends on were reduced.
- The docs title the bubble block `message-assistant.tsx`, but it holds `UserBubble` as well. Both are kept in that one file.

## Try these prompts (from the docs)
- `What's the weather in Tokyo?` (the docs expect a tool card; see Known issues)
