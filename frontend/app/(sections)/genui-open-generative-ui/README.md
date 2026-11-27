# genui-open-generative-ui

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/open-generative-ui
**Routes:** http://localhost:3000/genui-open-generative-ui (minimal setup) and http://localhost:3000/genui-open-generative-ui/advanced (sandbox functions)
**Status:** 🧩 Demo code was needed. The minimal page uses `VISUALIZATION_DESIGN_SKILL` and `Chat`, and the docs give neither. The advanced page snippet is cut off before its closing `);` and `}`, renders an undefined `<Chat />`, and imports a `./suggestions` file the docs don't give.

## Files
| File | Docs step |
|---|---|
| `frontend/app/api/copilotkit/genui-open-generative-ui/[[...slug]]/route.ts` | Enable it in the runtime (`openGenerativeUI.agents`), on top of the quickstart route |
| `agent/sections/genui-open-generative-ui.ts` | No backend code in the docs. Quickstart agent, two instances (minimal + `-advanced` mount) |
| `page.tsx` | Drop `<CopilotChat />` into the page (`src/app/demos/open-gen-ui/page.tsx`) |
| `_components/design-skill.ts`, `_components/chat.tsx`, `_components/suggestions.ts` | Demo code (see below) |
| `advanced/page.tsx` | Register sandbox functions on the provider (`src/app/demos/open-gen-ui-advanced/page.tsx`) |
| `advanced/_components/sandbox-functions.ts` | `sandbox-functions.ts` snippet |
| `advanced/_components/suggestions.ts` | Demo code (see below) |

## Adaptations
- The runtime URL is `/api/copilotkit/genui-open-generative-ui`, not `/api/copilotkit-ogui`. Both pages share this one runtime, as the docs' two pages share `copilotkit-ogui`.
- The agents are `genui-open-generative-ui`, not `open-gen-ui`, and `genui-open-generative-ui-advanced`, not `open-gen-ui-advanced`. The names are changed in the provider, in `CopilotChat agentId`, in the runtime `agents` map and in `openGenerativeUI.agents`. The agent server serves them at `:8000/genui-open-generative-ui` and `:8000/genui-open-generative-ui-advanced`, the second through `mounts.advanced`.
- `<CopilotKit>` stays inside each page, as the docs have it. There is no `layout.tsx` or `providers.tsx`.
- The page has two independent examples, so the advanced one is a sub-route (`advanced/`). Its `./sandbox-functions` and `./suggestions` imports become `./_components/...`.
- The minimal snippet is only a function body. `"use client"`, the `CopilotKit` import and an `export default function Page()` wrapper were added. `"use client"` was also added to the advanced page.
- The docs runtime snippet is a fragment (`runtime: new CopilotRuntime({...})` inside a handler). It is placed in the quickstart route's `createCopilotRuntimeHandler` call, with the docs' `// @ts-ignore -- see main route.ts` kept. `intelligence` and `identifyUser` are dropped, as in quickstart.

## Demo code / stubs
All of it is from `showcase/integrations/strands-typescript/src/app/demos/`:
- `open-gen-ui/design-skill.ts`: `VISUALIZATION_DESIGN_SKILL`, which the docs pass to the provider but never define.
- `open-gen-ui/chat.tsx`: the `Chat` component. The docs describe it ("renders `<CopilotChat agentId="open-gen-ui" />` and adds suggestion pills") but don't give it. `agentId` was adapted.
- `open-gen-ui/suggestions.ts`: `useOpenGenUISuggestions`, which `chat.tsx` uses.
- `open-gen-ui-advanced/page.tsx`: the closing `);` + `}` of `OpenGenUiAdvancedDemo` (the docs snippet stops before them) and the `Chat` function, with `agentId` adapted.
- `open-gen-ui-advanced/suggestions.ts`: `openGenUiSuggestions`, which the docs import but don't give.

## Known issues
- Type check: there are no errors in this section's files. The runtime route has no `HttpAgent ... _threadId, _maxEnforcedEntries` error only because the docs' `// @ts-ignore` covers `agents`. The underlying version mismatch is the same one described in the quickstart README.
- Docs rendering bug: the advanced `page.tsx` code block is cut off at the end of `</CopilotKit>`. The same block then holds a second, longer `sandbox-functions.ts` (with `evaluateExpression` + `notifyHost`), with no title or separator.

## Open questions
- **Which `sandbox-functions.ts`?** The block titled `sandbox-functions.ts` defines only `notifyHost`. The untitled copy appended to the page block also defines `evaluateExpression`. The most literal reading was used: the titled block. As a result, `ADVANCED_DESIGN_SKILL` and the demo suggestion "Calculator (calls evaluateExpression)" mention an `evaluateExpression` bridge that doesn't exist here. Expect the calculator prompt to fail. "Ping the host (calls notifyHost)" should work.
- Strands TS gets no specific instructions in the "Your agent must pass frontend tools to its model" callout, only "Other agents forward the frontend tools from the run input". No backend change was made. If nothing renders, the `StrandsAgent` adapter is not forwarding `generateSandboxedUi`.

## Try these prompts
- From the docs: `build me a simple greeting card` (minimal page).
- Advanced page: the docs give no prompts. The demo suggestion pills are present, for example "Ping the host (calls notifyHost)". After the UI renders, the browser console should log `notifyHost: ...`.
