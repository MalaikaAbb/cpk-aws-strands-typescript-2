# prebuilt-threads-drawer

**Docs:** https://docs.copilotkit.ai/strands-typescript/prebuilt-components/copilot-threads-drawer (+ Intelligence from https://docs.copilotkit.ai/strands-typescript/intelligence/quickstart)
**Route:** http://localhost:3000/prebuilt-threads-drawer (with sub-routes, see below)
**Status:** 🧩 A stand-in was needed. The Intelligence quickstart's `authenticateApplicationUser` is undefined (and not in the demo), so a fixed local identity was written, following the docs' prose. A `YourMainContent` placeholder was also needed. ❌ The header-slot example does not type-check: `CopilotThreadsDrawer` accepts no `children`.

Needs `CPK_INTELLIGENCE_API_KEY` in the root `.env`.

## Routes
| Route | Docs section |
|---|---|
| `/prebuilt-threads-drawer` | Set up the Threads Drawer |
| `/prebuilt-threads-drawer/sidebar` | Use the Drawer with a sidebar chat |
| `/prebuilt-threads-drawer/new-conversation-button` | Add your own "New conversation" button |
| `/prebuilt-threads-drawer/own-button-only` | The same page plus the docs' CSS that hides the Drawer's own new-conversation controls |
| `/prebuilt-threads-drawer/controlled` | The controlled `ControlledChat` example (`threadId` + `onThreadSelect`/`onNewThread`) |
| `/prebuilt-threads-drawer/header-slot` | Customization → Slots (`<span slot="header">`) |

## Files
| File | Docs step |
|---|---|
| `agent/sections/prebuilt-threads-drawer.ts` | No backend code on the page: the quickstart agent |
| `frontend/app/api/copilotkit/prebuilt-threads-drawer/[[...slug]]/route.ts` | Intelligence quickstart: "Connect your runtime" + "Mount the TypeScript handler" (GET/POST/PATCH/DELETE) |
| `page.tsx`, `sidebar/`, `new-conversation-button/`, `controlled/`, `header-slot/` | One per snippet, as listed under Routes |
| `own-button-only/page.tsx`, `_components/hide-new-thread-controls.css` | The CSS `::part()` snippet |
| `_components/your-main-content.tsx` | Placeholder for `<YourMainContent />` |

## Adaptations
- The runtime agent key is `prebuilt-threads-drawer`, and the runtime URL is `/api/copilotkit/prebuilt-threads-drawer`. The docs pass no agent anywhere, so the drawer and chat would resolve to `"default"`. `agentId="prebuilt-threads-drawer"` is set on `<CopilotKitProvider>`, which is step 3 of the docs' "Which agent's threads the drawer shows".
- `useSingleEndpoint={false}` is added to every `<CopilotKitProvider>`, per the Intelligence quickstart's "Connect your frontend" step.
- `<CopilotKitProvider>` stays inside each page, because the docs put it there. There is no section layout.
- The runtime keeps `intelligence` + `identifyUser` (threads section). The key is read from `CPK_INTELLIGENCE_API_KEY` in the root `.env`.
- `controlled/page.tsx`: the docs give only `ControlledChat`. It is wrapped in the same provider. `useState` is imported from `react`, and `"use client"` is added because it uses state.
- `own-button-only` re-exports the `new-conversation-button` page and imports the CSS. Next.js keeps imported CSS loaded after client navigation, so open this route directly (full reload) to compare.
- The `<CopilotThreadsDrawer agentId="research_agent" />` example is not implemented. With only one agent, renamed to the slug, it would be the same as the default page.

## Demo code / stubs
- The demo has no Intelligence/threads code.
- `authenticateApplicationUser(request)` (in `route.ts`) is not defined by the docs. It "represents your server-side authentication function". Following the docs' line "A fixed identity is suitable only for a local, single-user demo", it returns `{ id: "local-user", name: "Local user" }`.
- `YourMainContent` (sidebar example) is a placeholder that renders `<h1>Your App</h1>`.
- Imports completed: `useState` from `react` and the v2 components in `controlled/page.tsx`.

## Known issues (left as the docs have them)
- `header-slot/page.tsx`: `error TS2559: Type '{ children: Element; }' has no properties in common with type 'IntrinsicAttributes & CopilotThreadsDrawerProps'.` The docs' slot example passes children, which the React wrapper's props type doesn't declare. It may still work at runtime (or the children may be dropped).
- `route.ts`: the usual `HttpAgent is missing ... _threadId, _maxEnforcedEntries` type error. See the quickstart README.
- The docs' `app/page.tsx` files have no `"use client"`. The v2 package is `"use client"`, so the components work from a server page. But `new-conversation-button/page.tsx` (and `own-button-only`) calls `useCopilotChatConfiguration()` inside `NewConversationButton` in a server component. That is likely to fail at render time. It is left as written.

## Open questions
- The identity for `identifyUser`: a fixed local user, written from the docs' prose because no code is given. Is that the intended reading for a local test?
- The agent ID: set on `<CopilotKitProvider agentId>`. Alternatives would be the `<CopilotChatConfigurationProvider agentId>` or keeping the runtime key `"default"`.

## Try these prompts (from the docs)
Docs give no prompts. To test: send a message, and after the run the thread appears in the Drawer. Select "New Conversation", then the first thread, and its history shows again. Archive/Delete are in each row's menu.
