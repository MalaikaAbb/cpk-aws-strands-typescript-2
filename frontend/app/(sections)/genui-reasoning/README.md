# genui-reasoning

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/reasoning
**Routes:**
- http://localhost:3000/genui-reasoning: Default reasoning rendering (zero-config)
- http://localhost:3000/genui-reasoning/custom: Custom reasoning rendering (`ReasoningBlock`)

**Status:** 🧩 The frontend code is given. The suggestion hooks (and the default page's imports) came from the demo. ⚠️ The page gives no backend code, so this is the plain quickstart agent. It may not stream reasoning (see Open questions). Type-check is clean apart from the known route error.

## Files
| File | Docs step |
|---|---|
| `agent/sections/genui-reasoning.ts` | No backend code in the docs: the quickstart agent |
| `frontend/app/api/copilotkit/genui-reasoning/[[...slug]]/route.ts` | Quickstart runtime (the page doesn't change it) |
| `page.tsx` | Default reasoning rendering (`src/app/demos/reasoning-default/page.tsx`) |
| `custom/page.tsx` | Custom reasoning rendering: the import block + the `page.tsx` tab |
| `_components/reasoning-block.tsx` | Custom reasoning rendering: the `reasoning-block.tsx` tab (verbatim) |
| `_components/default-suggestions.ts`, `_components/custom-suggestions.ts` | Demo: the suggestion hooks |

## Adaptations
- `AGENT_ID` `"reasoning-default"` and `"reasoning-custom"` both become `"genui-reasoning"`. `runtimeUrl` becomes `/api/copilotkit/genui-reasoning`.
- Both docs pages put `<CopilotKit>` in the page, so it stays there. There is no section layout provider.
- `./reasoning-block` is imported as `../_components/reasoning-block`.
- Intelligence is not used (as in quickstart).

## Demo code / stubs
- `useReasoningDefaultSuggestions` and `useReasoningCustomSuggestions` come from showcase `reasoning-default/suggestions.ts` and `reasoning-custom/suggestions.ts`. The docs call them but don't define them.
- The default page's imports (`CopilotKit`, `CopilotChat`, the suggestions hook) and the custom page's suggestions-hook import come from the showcase pages. The custom page's other imports are the docs' own import block.

## Known issues
- `route.ts`: the known `HttpAgent is missing ... _threadId, _maxEnforcedEntries` error (see the quickstart README). There are no other type errors.

## Open questions
- **Backend.** The page says "if your model emits reasoning tokens, the card appears automatically", but gives no agent code or model setting. Following the guide, this is the quickstart agent unchanged (`OpenAIModel`, `gpt-6-luna`, default Responses API, no `params.reasoning`). If no reasoning card appears, that's the docs gap. The sibling page custom-look-and-feel/reasoning-messages hints at `reasoning: { effort: "high", summary: "auto" }`, and the demo passes it as `params: { reasoning: ... }`.
- The docs list an `isLatest` prop for the slot component, but `ReasoningBlock` ignores it and computes `isLatest` itself from `messages`.

## Try these prompts
Docs give no prompts. The demo suggestion pill (on both routes) is:
- `Explain step by step why the sky appears blue during the day but red at sunset.`
