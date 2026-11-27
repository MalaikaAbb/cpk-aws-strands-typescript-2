# genui-reasoning

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/reasoning
**Routes:**
- http://localhost:3000/genui-reasoning: Default reasoning rendering (zero-config)
- http://localhost:3000/genui-reasoning/custom: Custom reasoning rendering (`ReasoningBlock`)

**Status:** 🧩 The frontend code is given. Only the default page's imports came from the demo. The docs' suggestions-hook calls were removed. ⚠️ The page gives no backend code, so this is the plain quickstart agent. It may not stream reasoning (see Open questions). Type-check is clean apart from the known route error.

## Files
| File | Docs step |
|---|---|
| `agent/sections/genui-reasoning.ts` | No backend code in the docs: the quickstart agent |
| `frontend/app/api/copilotkit/genui-reasoning/[[...slug]]/route.ts` | Quickstart runtime (the page doesn't change it) |
| `page.tsx` | Default reasoning rendering (`src/app/demos/reasoning-default/page.tsx`) |
| `custom/page.tsx` | Custom reasoning rendering: the import block + the `page.tsx` tab |
| `_components/reasoning-block.tsx` | Custom reasoning rendering: the `reasoning-block.tsx` tab (verbatim) |

## Adaptations
- `AGENT_ID` `"reasoning-default"` and `"reasoning-custom"` both become `"genui-reasoning"`. `runtimeUrl` becomes `/api/copilotkit/genui-reasoning`.
- Both docs pages put `<CopilotKit>` in the page, so it stays there. There is no section layout provider.
- `./reasoning-block` is imported as `../_components/reasoning-block`.
- Intelligence is not used (as in quickstart).

## Demo code / stubs
- The default page's imports (`CopilotKit`, `CopilotChat`) come from showcase `reasoning-default/page.tsx`. The docs give none, and the page doesn't compile without them. The custom page uses the docs' own import block.

## Removed (not needed for functionality)
- `useReasoningDefaultSuggestions()` / `useReasoningCustomSuggestions()`: the docs' snippets call them, but they only add suggestion pills. The calls and the demo `suggestions.ts` files were deleted.

## Known issues
- `route.ts`: the known `HttpAgent is missing ... _threadId, _maxEnforcedEntries` error (see the quickstart README). There are no other type errors.

## Open questions
- **Backend.** The page says "if your model emits reasoning tokens, the card appears automatically", but gives no agent code or model setting. Following the guide, this is the quickstart agent unchanged (`OpenAIModel`, `gpt-6-luna`, default Responses API, no `params.reasoning`). If no reasoning card appears, that's the docs gap. The sibling page custom-look-and-feel/reasoning-messages hints at `reasoning: { effort: "high", summary: "auto" }`, and the demo passes it as `params: { reasoning: ... }`.
- The docs list an `isLatest` prop for the slot component, but `ReasoningBlock` ignores it and computes `isLatest` itself from `messages`.

## Try these prompts
Docs give no prompts. A question that needs reasoning, for example:
- `Explain step by step why the sky appears blue during the day but red at sunset.`
