# look-slots

**Docs:** https://docs.copilotkit.ai/strands-typescript/custom-look-and-feel/slots
**Route:** http://localhost:3000/look-slots (plus the sub-routes below)
**Status:** ❌ Partly broken. "Two levels deep" uses `CustomToolbar` and `CustomCopyButton`, which neither the docs nor the demo define, so `/look-slots/nested` throws `ReferenceError` on render. 🧩 The "What it looks like in code" snippet only `declare`s its three slot components, so minimal plain-JSX versions were written (based on the demo). The other examples were provided in full. There are type errors from the docs code (see below).

## Routes (one per independent example)
| Route | Docs section |
|---|---|
| `/look-slots` | What it looks like in code: welcome screen, assistant message and disclaimer slots (`ChatSlotsTeachingExtracts`) |
| `/look-slots/tailwind` | Tailwind Classes |
| `/look-slots/props-override` | Props Override |
| `/look-slots/custom-components` | Custom Components (`CustomMessageView`) |
| `/look-slots/nested` | Nested Slots → Two levels deep |
| `/look-slots/toolbar-button` | Nested Slots → One toolbar button |
| `/look-slots/tool-calls` | Nested Slots → Tool calls (`CustomToolCallsView`) |
| `/look-slots/labels` | Labels |

## Files
| File | Docs step |
|---|---|
| `agent/sections/look-slots.ts` | No backend code on this page: the shared quickstart agent |
| `frontend/app/api/copilotkit/look-slots/[[...slug]]/route.ts` | No runtime changes on this page: the quickstart runtime route |
| `layout.tsx`, `providers.tsx` | No provider code on this page: the quickstart provider |
| `_components/slot-overrides.tsx` | What it looks like in code (`src/app/demos/chat-slots/slot-overrides.tsx`) |
| `page.tsx` | Minimal page passing the three extracted slots to `<CopilotChat>` |
| `_components/slot-wrappers.tsx` | Minimal slot components the docs use but don't define (see below) |
| `_components/tailwind-chat.tsx` | Tailwind Classes (verbatim) |
| `props-override/page.tsx` | Props Override |
| `_components/custom-components-chat.tsx` | Custom Components (verbatim) |
| `_components/nested-chat.tsx` | Two levels deep |
| `toolbar-button/page.tsx` | One toolbar button |
| `_components/tool-calls-chat.tsx` | Tool calls (verbatim) |
| `labels/page.tsx` | Labels |
| `tailwind/`, `custom-components/`, `nested/`, `tool-calls/` `page.tsx` | One-line re-exports of the docs' `Chat` component as the route's default export |

## Adaptations
- The agent name is `look-slots`. The runtime URL is `/api/copilotkit/look-slots`, and the agent is at `http://localhost:8000/look-slots`. The docs' components pass no `agentId`, so they use the provider's agent.
- The provider is in this section's `layout.tsx` (via `providers.tsx`), as quickstart does.
- Each snippet is a separate example, so each one gets its own sub-route.
- The docs' `page.tsx` snippets that `export function Chat()` live in `_components/<example>-chat.tsx`, and the route's `page.tsx` re-exports `Chat` as its default. This keeps non-Next.js named exports out of page files.
- JSX-only snippets ("Props Override", "Two levels deep", "One toolbar button", "Labels") get the `CopilotChat` import and a minimal component around them.
- Intelligence is not used (as quickstart).

## Demo code / stubs
- **`_components/slot-wrappers.tsx`**: `CustomWelcomeScreen`, `CustomAssistantMessage`, `CustomDisclaimer` and `CustomUserMessage`. The docs use them but never define them, so the slots have nothing to render without them. Each one is based on the demo's `chat-slots/slot-wrappers.tsx`, reduced to plain JSX: a short text label ("Custom welcome screen", "Custom assistant message", ...) plus the default component, or `input` and `suggestionView` for the welcome screen.
- **The closing `return { welcomeScreen, messageView, input };` and `}`**, from the demo's `chat-slots/slot-overrides.snippet.tsx`. The docs' longest snippet stops before the end of `ChatSlotsTeachingExtracts()`.
- In `slot-overrides.tsx`, the docs' `declare const CustomWelcomeScreen / CustomAssistantMessage / CustomDisclaimer: React.ComponentType;` lines are replaced by an import of those components. `declare` emits no JavaScript, so as written the three names are undefined at runtime and the page would throw `ReferenceError`.
- In `nested-chat.tsx`, `CustomUserMessage` is imported from `slot-wrappers.tsx`. `CustomToolbar` and `CustomCopyButton` are not in the demo, so they stay undefined.

## Removed (not needed for functionality)
- The demo's `SlotMarker` (`slot-marker.tsx`), with its color table, dashed outlines, copy-to-clipboard badges, Tailwind classes and test IDs.
- The demo's `CustomWelcomeMessage`, and all styling and `data-testid`s on the slot components.

## Known issues (left as the docs have them)
- **`CustomToolbar` and `CustomCopyButton` are undefined** (`_components/nested-chat.tsx`): `error TS2304: Cannot find name 'CustomToolbar'.` and `error TS2304: Cannot find name 'CustomCopyButton'.` At runtime `/look-slots/nested` throws `ReferenceError: CustomToolbar is not defined`.
- **`userMessage: CustomUserMessage` doesn't type-check** (`_components/nested-chat.tsx`): `error TS2322: Type '(props: CopilotChatUserMessageProps) => Element' is not assignable to type 'SlotValue<typeof CopilotChatUserMessage> | undefined'. Type '(props: CopilotChatUserMessageProps) => Element' is missing the following properties from type 'typeof CopilotChatUserMessage': Container, MessageRenderer, Toolbar, ToolbarButton, and 3 more.` The docs pass the component without the cast that "Custom Components" says is needed ("cast your component to that type"). The demo casts it with a `makeSlotOverride` helper.
- **`"data-testid"` isn't an accepted prop** (`props-override/page.tsx`): `error TS2353: Object literal may only specify known properties, and '"data-testid"' does not exist in type 'typeof CopilotChatMessageView | Partial<Omit<WithSlots<{ assistantMessage: typeof CopilotChatAssistantMessage; …`. The docs say data attributes are a use case for props overrides, but the slot type doesn't allow them. It may still reach the DOM at runtime.
- **Type error in `route.ts`:** `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` version mismatch. See the quickstart README.

## Open questions
- **The "What it looks like in code" snippet.** It is a teaching extract built on `declare const` placeholders, and it never shows the extracted locals passed to `<CopilotChat>`. The demo's real `page.tsx` uses other wrappers through a `makeSlotOverride` helper. The most literal working reading was used: the snippet's own code, with the placeholders backed by minimal components, and the three locals passed as `<CopilotChat>` props.

## Try these prompts
Docs give no prompts. What to check, from the prose (send any message, for example `What can you do?`):
- `/look-slots`: the welcome screen shows "Custom welcome screen" above the default input. Each assistant reply is labelled "Custom assistant message". "Custom disclaimer" stays below the input after the first message.
- `/look-slots/tailwind`: "The message list has a gray background and the input has a blue border."
- `/look-slots/props-override`: the message view has class `my-custom-messages` and `data-testid="message-view"`, and the input is autofocused.
- `/look-slots/custom-components`: plain messages, right-aligned for the user, and "Thinking..." while the agent runs.
- `/look-slots/nested`: expected to crash (undefined `CustomToolbar`).
- `/look-slots/toolbar-button`: assistant replies show a plain **Copy** button.
- `/look-slots/tool-calls`: tool calls get a dashed border. The quickstart agent has no tools, so there are no tool calls to show.
- `/look-slots/labels`: the placeholder "Ask your agent anything...", the welcome text "How can I help you today?" and the disclaimer "AI responses may be inaccurate."
