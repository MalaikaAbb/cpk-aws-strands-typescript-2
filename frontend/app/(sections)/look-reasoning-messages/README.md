# look-reasoning-messages

**Docs:** https://docs.copilotkit.ai/strands-typescript/custom-look-and-feel/reasoning-messages
**Routes:**
- http://localhost:3000/look-reasoning-messages: Default Behavior
- http://localhost:3000/look-reasoning-messages/header: Custom Header
- http://localhost:3000/look-reasoning-messages/content: Custom Content
- http://localhost:3000/look-reasoning-messages/custom: Fully Custom Reasoning Message (`ReasoningBlock`)
- http://localhost:3000/look-reasoning-messages/render-prop: Render-Prop Children

**Status:** 🧩 The frontend code is given. The suggestion hooks and the page imports came from the demo. ⚠️ The page gives no backend code, so this is the plain quickstart agent. It may not stream reasoning at all (see Open questions). Type-check is clean apart from the known route error.

## Files
| File | Docs step |
|---|---|
| `agent/sections/look-reasoning-messages.ts` | No backend code in the docs: the quickstart agent |
| `frontend/app/api/copilotkit/look-reasoning-messages/[[...slug]]/route.ts` | Quickstart runtime (the page doesn't change it) |
| `page.tsx` | Default Behavior (`reasoning-default/page.tsx`, with `<CopilotKit>` in the page) |
| `custom/page.tsx` | Fully Custom Reasoning Message (`reasoning-custom/page.tsx`, with `<CopilotKit>` in the page) |
| `_components/reasoning-block.tsx` | `ReasoningBlock` (`reasoning-custom/reasoning-block.tsx`, verbatim) |
| `header/page.tsx` | Custom Header |
| `content/page.tsx` | Custom Content |
| `render-prop/page.tsx` | Render-Prop Children |
| `providers.tsx`; `header/`, `content/`, `render-prop/` `layout.tsx` | Quickstart provider, for the three snippets that show only `<CopilotChat>` |
| `_components/default-suggestions.ts`, `_components/custom-suggestions.ts` | Demo: the suggestion hooks |

## Adaptations
- `AGENT_ID` `"reasoning-default"` and `"reasoning-custom"` both become `"look-reasoning-messages"`. `runtimeUrl` becomes `/api/copilotkit/look-reasoning-messages`.
- The two `src/app/demos/...` examples put `<CopilotKit>` in the page, so they keep it there. The three bare `<CopilotChat messageView=... />` snippets get the quickstart provider from a layout in their sub-route, and their JSX is returned from a `Page` component.
- The intro snippet (`messageView={{ reasoningMessage: { header: CustomHeader, contentView: CustomContent } }}`) is not a separate route. Its two halves are the Custom Header and Custom Content routes.
- Intelligence is not used (as in quickstart).

## Demo code / stubs
- `useReasoningDefaultSuggestions` and `useReasoningCustomSuggestions` come from showcase `reasoning-default/suggestions.ts` and `reasoning-custom/suggestions.ts`. The docs call them but don't define them.
- The import lines of both demo pages (`CopilotKit`, `CopilotChat`, the `CopilotChatReasoningMessage` type, `ReasoningBlock`, the suggestion hooks) come from showcase `reasoning-default/page.tsx` and `reasoning-custom/page.tsx`. The docs snippets have none.
- `content/page.tsx`: the docs' Custom Content snippet has no imports, so `import { CopilotChat } from "@copilotkit/react-core/v2"` was added (as the Custom Header snippet shows it).

## Known issues
- `route.ts`: the known `HttpAgent is missing ... _threadId, _maxEnforcedEntries` error (see the quickstart README). There are no other type errors.

## Open questions
- **Backend.** The page has no agent code. It only says: "If no card appears, your agent does not stream reasoning. For OpenAI models, ask for a reasoning summary in the model options, for example `reasoning: { effort: "high", summary: "auto" }`." It doesn't say where that goes for a Strands `OpenAIModel` (in the demo it is `params: { reasoning: ... }` on a Responses-API model). Following the guide, this section uses the quickstart agent unchanged. If no reasoning card appears, that is the docs gap. The fix the docs hint at would be `params: { reasoning: { effort: "high", summary: "auto" } }` on the `OpenAIModel`.

## Try these prompts
The docs say "ask the agent a question that needs reasoning". The demo suggestion (shown as a suggestion pill on `/` and `/custom`):
- `Explain step by step why the sky appears blue during the day but red at sunset.`

What to look for: on `/header`, 🧠 + "Thinking…" while streaming, then 💡 + "Thought for N seconds". On `/content`, monospace grey text with a ▊ cursor. On `/custom`, the amber "Reasoning" banner. On `/render-prop`, a yellow bordered box.
