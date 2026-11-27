# look-headless-ui

**Docs:** https://docs.copilotkit.ai/strands-typescript/custom-look-and-feel/headless-ui
**Routes:** http://localhost:3000/look-headless-ui (Minimal example) and http://localhost:3000/look-headless-ui/complete (Complete example)
**Status:** ❌ Broken. Both examples are snippets, so the glue (imports, wrappers, `generateMessageId`, the simple bubbles, `Avatar`, `cn`, `AttachmentChip`, `ActivityWrapper`) is demo code (🧩). The demo's `Avatar` and `Button` import the `radix-ui` package, which is not installed, so both pages fail to build. The docs' `ToolMessage` import (from the demo) doesn't exist in the installed `@copilotkit/shared`.

## Files
| File | Docs step |
|---|---|
| `agent/sections/look-headless-ui.ts` | No backend code in the docs: the quickstart agent |
| `frontend/app/api/copilotkit/look-headless-ui/[[...slug]]/route.ts` | Quickstart runtime (the page doesn't change it) |
| `providers.tsx`, `layout.tsx` | Quickstart provider |
| `page.tsx` | Renders the Minimal example's `Chat` |
| `_components/headless-simple/chat.tsx` | Minimal example: both snippets (`useAgent` + `useCopilotKit` + `send`; the `visible.map`) |
| `_components/headless-simple/message-bubble.tsx` | Demo: bubbles for the Minimal example |
| `complete/page.tsx` | Harness for the Complete example (see below) |
| `_components/headless-complete/chat/message-list.tsx` | The `MessageList` component, Per-role dispatch, Tool-call composition |
| `_components/headless-complete/chat/message-assistant.tsx` | Bubble chrome (`AssistantBubble`, `UserBubble`, `splitContent`, verbatim) |
| `_components/headless-complete/chat/message-activity.tsx` | Demo: `ActivityWrapper` |
| `_components/headless-complete/attachments/attachment-preview.tsx` | Demo: `AttachmentChip` |
| `_components/ui/avatar.tsx`, `_components/ui/button.tsx`, `_lib/utils.ts` | Demo: shadcn `Avatar`/`AvatarFallback`, `Button`, `cn` |

## Adaptations
- `agentId: "headless-simple"` becomes `"look-headless-ui"`. The provider (quickstart's) is in `layout.tsx`, with `runtimeUrl="/api/copilotkit/look-headless-ui"`.
- Docs paths `src/app/demos/headless-simple/...` and `.../headless-complete/...` are moved to `_components/headless-simple/` and `_components/headless-complete/`. The two examples are separate routes (`/` and `/complete`).
- Intelligence is not used (as in quickstart).

## Demo code / stubs
From `showcase/integrations/strands-typescript/src/`:
- `app/demos/headless-simple/chat.tsx`: imports, the `Chat()` wrapper, the `visible` computation (the docs' `.map()` uses `visible` without defining it) and `generateMessageId()`.
- `app/demos/headless-simple/message-bubble.tsx`: `UserBubble` / `AssistantBubble` for the Minimal example (used but not defined in that section).
- `app/demos/headless-complete/chat/message-list.tsx`: imports and the `MessageList({ messages }: { messages: Message[] })` signature.
- `app/demos/headless-complete/chat/message-user.tsx`: the `MultimodalPart` type (used by the docs' `UserBubble`).
- `app/demos/headless-complete/chat/message-activity.tsx`: `ActivityWrapper`.
- `app/demos/headless-complete/attachments/attachment-preview.tsx`: `AttachmentChip` + `attachmentSrc` + `prettyBytes`.
- `components/ui/avatar.tsx` (`Avatar`, `AvatarFallback` only), `components/ui/button.tsx`, `lib/utils.ts` (`cn`).
- Well-known imports added: `useState` / `React` / `useMemo` (react), `react-markdown`, `remark-gfm`, `lucide-react`.

Harness (not in the docs or the demo, only to exercise the code): a plain `<form>` with an `<input>` and a Send button in `chat.tsx` (the docs define `input` / `setInput` / `send` but no composer), and `complete/page.tsx`, which passes `agent.messages` to `MessageList` and sends with the same `addMessage` + `runAgent` pattern. The demo's own shells (Card, ScrollArea, Composer, suggestions, attachments, typing indicator) were not copied.

## Known issues (left as the docs / demo have them)
- **Missing package `radix-ui`:** `Cannot find module 'radix-ui' or its corresponding type declarations.` in `_components/ui/avatar.tsx` and `_components/ui/button.tsx`. The docs' bubbles use `Avatar` / `AvatarFallback` without giving them, and the demo's shadcn versions import `radix-ui`, which isn't in `package.json`. Both routes fail to build with "Module not found".
- `message-list.tsx`: `Module '"@copilotkit/shared"' has no exported member 'ToolMessage'.` The docs' snippet uses `ToolMessage`. The demo imports it from `@copilotkit/shared`, and the installed `@copilotkit/shared@1.90.x` doesn't export it (type-only, so it does not break the build by itself).
- `chat.tsx` and `complete/page.tsx`, on `copilotkit.runAgent({ agent })`: `Type '...@copilotkit/runtime/node_modules/@ag-ui/client...AbstractAgent' is not assignable to type '...@copilotkit/shared/node_modules/@ag-ui/client...AbstractAgent'. Types have separate declarations of a private property '_threadId'.` This is the same `@ag-ui/client` version split as the route error below (type-only).
- `route.ts`: the known `HttpAgent is missing ... _threadId, _maxEnforcedEntries` error (see the quickstart README).
- The docs' check ("ask the agent for the weather in Tokyo, so that it calls a tool ... the tool card renders inside it") can't work as written. The page gives no backend code (so this is the quickstart agent, with no tools) and registers no tool renderers (`useRenderTool` / `useDefaultRenderTool`). So no tool card is expected.

## Open questions
- The Minimal example uses `UserBubble` / `AssistantBubble` without defining them. The Complete example's docs-given bubbles could also have served. The literal reading taken: the minimal example's own demo file (`headless-simple/message-bubble.tsx`).
- The docs title the bubble block `message-assistant.tsx`, but it contains `UserBubble` as well. It was kept in that single file (in the demo, `UserBubble` is in `message-user.tsx`).
- Does the "weather in Tokyo" check assume a weather tool on the agent and a registered renderer, neither of which the page provides?

## Try these prompts (from the docs)
- `What's the weather in Tokyo?` (the docs expect a tool call with a tool card inside your assistant bubble; see Known issues)
