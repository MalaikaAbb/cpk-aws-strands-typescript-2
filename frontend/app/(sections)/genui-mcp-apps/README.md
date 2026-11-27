# genui-mcp-apps

**Docs:** https://docs.copilotkit.ai/strands-typescript/generative-ui/mcp-apps
**Route:** http://localhost:3000/genui-mcp-apps
**Status:** 🧩 Demo code was needed. The runtime `mcpApps` config and the page are as the docs give them. The page snippet is only a function body, so `"use client"`, the imports and the function wrapper come from the demo file it was cut from. The runtime snippet uses an `agents` variable it never defines; it's defined as in quickstart. No type errors in this section.

## Files
| File | Docs step |
|---|---|
| `frontend/app/api/copilotkit/genui-mcp-apps/[[...slug]]/route.ts` | Wire the runtime to your MCP server(s) (`mcpApps.servers`, Excalidraw) |
| `page.tsx` | No frontend renderer needed (`<CopilotKit>` + a plain `<CopilotChat />`) |
| `agent/sections/genui-mcp-apps.ts` | No backend code in the docs: quickstart agent |

## Adaptations
- `runtimeUrl` `/api/copilotkit-mcp-apps` → `/api/copilotkit/genui-mcp-apps`; `agent` `mcp-apps` → `genui-mcp-apps`. The provider stays in `page.tsx`, as the docs show it.
- The demo's `<Chat />` is replaced with `<CopilotChat />`, as the docs say ("In your app, render `<CopilotChat />` in its place").
- The runtime snippet is wrapped in the quickstart route: its imports, `const agents = { "genui-mcp-apps": new HttpAgent(...) }`, and the handler with `basePath: "/api/copilotkit/genui-mcp-apps"`.
- `intelligence` / `identifyUser` dropped, so the "MCP Apps with Intelligence" variant is not used. It also uses a `BuiltInAgent`, which the rules exclude.
- The optional provider options (`allowSameOriginFallback`, `hostContext.availableDisplayModes`, `modelContext`) and the transport examples (`localhost:3101`, `mcp.example.com/sse`) are not wired in. They are optional settings or placeholder servers.

## Demo code / stubs
- `page.tsx`: from `showcase/integrations/strands-typescript/src/app/demos/mcp-apps/page.tsx`, the `"use client"` directive, the `React` / `CopilotKit` imports (plus `CopilotChat`) and the `export default function MCPAppsDemo() { ... }` wrapper that the docs snippet (a function body) leaves out.

## Known issues (left as the docs have them)
- None from type-check. The docs' `// @ts-ignore` above `agents` hides the known `HttpAgent is missing ... _threadId, _maxEnforcedEntries` error (see the quickstart README), which would otherwise show here.

## Open questions
- The first runtime snippet uses `https://mcp.excalidraw.com` as the server URL. The Intelligence snippet on the same page uses `https://mcp.excalidraw.com/mcp`. The first one is used, as written (`process.env.MCP_SERVER_URL` can override it). If the widget fails to load, the `/mcp` path is the first thing to try.

## Try these prompts (from the docs)
- "ask the agent to draw a flowchart with Excalidraw", for example `Draw a flowchart with Excalidraw`
