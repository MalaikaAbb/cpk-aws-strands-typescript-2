# genui-open-generative-ui

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/open-generative-ui
**Routes:** http://localhost:3000/genui-open-generative-ui (minimal setup) and http://localhost:3000/genui-open-generative-ui/advanced (sandbox functions)
**Status:** 🧩 Both pages render a `<Chat />` that the docs never define, so a one-line `Chat` was added to each. The advanced snippet is cut off before its closing `);` and `}`. The minimal snippet uses `VISUALIZATION_DESIGN_SKILL`, which is demo-only. It was dropped, because the docs say the prop is optional.

## Files
| File | Docs step |
|---|---|
| `frontend/app/api/copilotkit/genui-open-generative-ui/[[...slug]]/route.ts` | Enable it in the runtime (`openGenerativeUI.agents`), on top of the quickstart route |
| `agent/sections/genui-open-generative-ui.ts` | No backend code in the docs. Quickstart agent, two instances (minimal + `-advanced` mount) |
| `page.tsx` | Drop `<CopilotChat />` into the page |
| `advanced/page.tsx` | Register sandbox functions on the provider |
| `advanced/_components/sandbox-functions.ts` | `sandbox-functions.ts` snippet |

## Adaptations
- The runtime URL is `/api/copilotkit/genui-open-generative-ui`, used by both pages. The agents are `genui-open-generative-ui` and `genui-open-generative-ui-advanced`, the second served at `:8000/genui-open-generative-ui-advanced` through `mounts.advanced`.
- `<CopilotKit>` stays inside each page, as the docs have it. The advanced example is a sub-route, and its `./sandbox-functions` becomes `./_components/sandbox-functions`.
- The minimal snippet is only a return statement. `"use client"`, the imports and `export default function Page()` were added.
- The runtime fragment is placed in the quickstart route's handler, with the docs' `// @ts-ignore` kept. `intelligence` and `identifyUser` are dropped.

## Demo code / stubs
- `Chat` (in both pages): `function Chat() { return <CopilotChat agentId="..." />; }`. The docs render `<Chat />` and describe it as rendering `<CopilotChat agentId="open-gen-ui" />`. Without it the pages don't render.
- `advanced/page.tsx`: the closing `);` + `}` that the docs snippet is missing.

## Removed (not needed for functionality)
- `VISUALIZATION_DESIGN_SKILL` (demo `design-skill.ts`) and the docs line `openGenerativeUI={{ designSkill: VISUALIZATION_DESIGN_SKILL }}` on the minimal page. The docs call it optional, and the provider falls back to its built-in `DEFAULT_DESIGN_SKILL`.
- The suggestion pills: the demo `chat.tsx`, `suggestions.ts` (both pages), and on the advanced page the docs' `useConfigureSuggestions` import and `./suggestions` import.
- The demo `Chat` wrappers' `className`s and wrapper `div`.

## Known issues
- Type check: no errors in this section. The route's `HttpAgent ... _threadId` mismatch (see the quickstart README) is hidden by the docs' `// @ts-ignore`.
- Docs rendering bug: the advanced `page.tsx` code block is cut off after `</CopilotKit>`. The same block then holds a second, longer `sandbox-functions.ts` (with `evaluateExpression` + `notifyHost`).

## Open questions
- **Which `sandbox-functions.ts`?** The titled block (`notifyHost` only) was used. `ADVANCED_DESIGN_SKILL` still mentions an `evaluateExpression` bridge, which doesn't exist here.
- The docs' own `ADVANCED_DESIGN_SKILL` comment says that without a design skill, the default "never tells the model to CALL `generateSandboxedUi`, so the shared chat agent answers in plain text". With `VISUALIZATION_DESIGN_SKILL` dropped, the minimal page might get a plain-text reply instead of a sandboxed UI. If so, that is the cost of the docs depending on a constant they don't give.
- The Strands TS backend gets no specific instructions in the "pass frontend tools to the model" callout. No backend change was made.

## Try these prompts
- Minimal page, from the docs: `build me a simple greeting card`.
- Advanced page: the docs give no prompts. Try `Make a button that pings the host with notifyHost`. The browser console should log `notifyHost: ...`.
