# CopilotKit × AWS Strands (TypeScript): docs section test bed

There is one git branch per docs page. Each branch holds only that page's integration code. `main` merges all of them, so every section is available at its own route.

## Run (same on `main` and on any section branch)
```bash
cp .env.example .env      # once: set OPENAI_API_KEY (+ CPK_INTELLIGENCE_API_KEY for threads, OPENAI_TRANSCRIPTION_API_KEY for voice)
npm install               # once (every branch shares the same lockfile)
npm run dev               # agent on :8000, frontend on :3000
```
Open http://localhost:3000. The index lists the sections on the current branch. `.env` is untracked, so it stays in place when you run `git switch <slug>`.

## Sections
Each section's README lists its status, adaptations, demo code or stubs, known issues and the prompts to try.

| Route | Docs | Notes |
|---|---|---|
| [/quickstart](http://localhost:3000/quickstart) | [quickstart?agent=bring-your-own](https://docs.copilotkit.ai/strands-typescript/quickstart?agent=bring-your-own) | [README](frontend/app/(sections)/quickstart/README.md) |
| [/prebuilt-chat](http://localhost:3000/prebuilt-chat) | [prebuilt-components/chat](https://docs.copilotkit.ai/strands-typescript/prebuilt-components/chat) | [README](frontend/app/(sections)/prebuilt-chat/README.md) |
| [/prebuilt-sidebar](http://localhost:3000/prebuilt-sidebar) | [prebuilt-components/sidebar](https://docs.copilotkit.ai/strands-typescript/prebuilt-components/sidebar) | [README](frontend/app/(sections)/prebuilt-sidebar/README.md) |
| [/prebuilt-popup](http://localhost:3000/prebuilt-popup) | [prebuilt-components/popup](https://docs.copilotkit.ai/strands-typescript/prebuilt-components/popup) | [README](frontend/app/(sections)/prebuilt-popup/README.md) |
| [/prebuilt-chat-controls](http://localhost:3000/prebuilt-chat-controls) | [prebuilt-components/chat-controls](https://docs.copilotkit.ai/strands-typescript/prebuilt-components/chat-controls) | [README](frontend/app/(sections)/prebuilt-chat-controls/README.md) |
| [/look-css](http://localhost:3000/look-css) | [custom-look-and-feel/css](https://docs.copilotkit.ai/strands-typescript/custom-look-and-feel/css) | [README](frontend/app/(sections)/look-css/README.md) |
| [/look-slots](http://localhost:3000/look-slots) | [custom-look-and-feel/slots](https://docs.copilotkit.ai/strands-typescript/custom-look-and-feel/slots) | [README](frontend/app/(sections)/look-slots/README.md) |
| [/look-markdown](http://localhost:3000/look-markdown) | [custom-look-and-feel/markdown](https://docs.copilotkit.ai/strands-typescript/custom-look-and-feel/markdown) | [README](frontend/app/(sections)/look-markdown/README.md) |
| [/look-headless-ui](http://localhost:3000/look-headless-ui) | [custom-look-and-feel/headless-ui](https://docs.copilotkit.ai/strands-typescript/custom-look-and-feel/headless-ui) | [README](frontend/app/(sections)/look-headless-ui/README.md) |
| [/look-reasoning-messages](http://localhost:3000/look-reasoning-messages) | [custom-look-and-feel/reasoning-messages](https://docs.copilotkit.ai/strands-typescript/custom-look-and-feel/reasoning-messages) | [README](frontend/app/(sections)/look-reasoning-messages/README.md) |
| [/multimodal-attachments](http://localhost:3000/multimodal-attachments) | [multimodal-attachments](https://docs.copilotkit.ai/strands-typescript/multimodal-attachments) | [README](frontend/app/(sections)/multimodal-attachments/README.md) |
| [/voice](http://localhost:3000/voice) | [voice](https://docs.copilotkit.ai/strands-typescript/voice) | [README](frontend/app/(sections)/voice/README.md) |
| [/genui-reasoning](http://localhost:3000/genui-reasoning) | [generative-ui/reasoning](https://docs.copilotkit.ai/strands-typescript/generative-ui/reasoning) | [README](frontend/app/(sections)/genui-reasoning/README.md) |
| [/prebuilt-threads-drawer](http://localhost:3000/prebuilt-threads-drawer) | [prebuilt-components/copilot-threads-drawer](https://docs.copilotkit.ai/strands-typescript/prebuilt-components/copilot-threads-drawer) | [README](frontend/app/(sections)/prebuilt-threads-drawer/README.md) |
| [/headless-threads](http://localhost:3000/headless-threads) | [headless-threads](https://docs.copilotkit.ai/strands-typescript/headless-threads) | [README](frontend/app/(sections)/headless-threads/README.md) |
| [/frontend-tools](http://localhost:3000/frontend-tools) | [frontend-tools](https://docs.copilotkit.ai/strands-typescript/frontend-tools) | [README](frontend/app/(sections)/frontend-tools/README.md) |
| [/genui-tool-based](http://localhost:3000/genui-tool-based) | [generative-ui/tool-based](https://docs.copilotkit.ai/strands-typescript/generative-ui/tool-based) | [README](frontend/app/(sections)/genui-tool-based/README.md) |
| [/genui-tool-rendering](http://localhost:3000/genui-tool-rendering) | [generative-ui/tool-rendering](https://docs.copilotkit.ai/strands-typescript/generative-ui/tool-rendering) | [README](frontend/app/(sections)/genui-tool-rendering/README.md) |
| [/genui-components](http://localhost:3000/genui-components) | [generative-ui/components](https://docs.copilotkit.ai/strands-typescript/generative-ui/components) | [README](frontend/app/(sections)/genui-components/README.md) |
| [/genui-components-surfaces](http://localhost:3000/genui-components-surfaces) | [generative-ui/components/surfaces](https://docs.copilotkit.ai/strands-typescript/generative-ui/components/surfaces) | [README](frontend/app/(sections)/genui-components-surfaces/README.md) |
| [/genui-components-catalogs](http://localhost:3000/genui-components-catalogs) | [generative-ui/components/catalogs](https://docs.copilotkit.ai/strands-typescript/generative-ui/components/catalogs) | [README](frontend/app/(sections)/genui-components-catalogs/README.md) |
| [/genui-components-standard-catalog](http://localhost:3000/genui-components-standard-catalog) | [generative-ui/components/standard-catalog](https://docs.copilotkit.ai/strands-typescript/generative-ui/components/standard-catalog) | [README](frontend/app/(sections)/genui-components-standard-catalog/README.md) |
| [/genui-components-state-and-actions](http://localhost:3000/genui-components-state-and-actions) | [generative-ui/components/state-and-actions](https://docs.copilotkit.ai/strands-typescript/generative-ui/components/state-and-actions) | [README](frontend/app/(sections)/genui-components-state-and-actions/README.md) |
| [/genui-components-theming](http://localhost:3000/genui-components-theming) | [generative-ui/components/theming](https://docs.copilotkit.ai/strands-typescript/generative-ui/components/theming) | [README](frontend/app/(sections)/genui-components-theming/README.md) |
| [/genui-components-transports](http://localhost:3000/genui-components-transports) | [generative-ui/components/transports](https://docs.copilotkit.ai/strands-typescript/generative-ui/components/transports) | [README](frontend/app/(sections)/genui-components-transports/README.md) |
| [/genui-components-markdown-mode](http://localhost:3000/genui-components-markdown-mode) | [generative-ui/components/markdown-mode](https://docs.copilotkit.ai/strands-typescript/generative-ui/components/markdown-mode) | [README](frontend/app/(sections)/genui-components-markdown-mode/README.md) |
| [/genui-components-from-a2ui](http://localhost:3000/genui-components-from-a2ui) | [generative-ui/components/from-a2ui](https://docs.copilotkit.ai/strands-typescript/generative-ui/components/from-a2ui) | [README](frontend/app/(sections)/genui-components-from-a2ui/README.md) |
| [/genui-a2ui-dynamic-schema](http://localhost:3000/genui-a2ui-dynamic-schema) | [generative-ui/a2ui/dynamic-schema](https://docs.copilotkit.ai/strands-typescript/generative-ui/a2ui/dynamic-schema) | [README](frontend/app/(sections)/genui-a2ui-dynamic-schema/README.md) |
| [/genui-a2ui-fixed-schema](http://localhost:3000/genui-a2ui-fixed-schema) | [generative-ui/a2ui/fixed-schema](https://docs.copilotkit.ai/strands-typescript/generative-ui/a2ui/fixed-schema) | [README](frontend/app/(sections)/genui-a2ui-fixed-schema/README.md) |
| [/genui-json-render](http://localhost:3000/genui-json-render) | [generative-ui/json-render](https://docs.copilotkit.ai/strands-typescript/generative-ui/json-render) | [README](frontend/app/(sections)/genui-json-render/README.md) |
| [/genui-hashbrown](http://localhost:3000/genui-hashbrown) | [generative-ui/hashbrown](https://docs.copilotkit.ai/strands-typescript/generative-ui/hashbrown) | [README](frontend/app/(sections)/genui-hashbrown/README.md) |
| [/genui-mcp-apps](http://localhost:3000/genui-mcp-apps) | [generative-ui/mcp-apps](https://docs.copilotkit.ai/strands-typescript/generative-ui/mcp-apps) | [README](frontend/app/(sections)/genui-mcp-apps/README.md) |
| [/genui-open-generative-ui](http://localhost:3000/genui-open-generative-ui) | [generative-ui/open-generative-ui](https://docs.copilotkit.ai/strands-typescript/generative-ui/open-generative-ui) | [README](frontend/app/(sections)/genui-open-generative-ui/README.md) |
| [/shared-state](http://localhost:3000/shared-state) | [shared-state](https://docs.copilotkit.ai/strands-typescript/shared-state) | [README](frontend/app/(sections)/shared-state/README.md) |
| [/shared-state-rendering-in-app](http://localhost:3000/shared-state-rendering-in-app) | [shared-state/rendering-in-app](https://docs.copilotkit.ai/strands-typescript/shared-state/rendering-in-app) | [README](frontend/app/(sections)/shared-state-rendering-in-app/README.md) |
| [/shared-state-agent-readonly](http://localhost:3000/shared-state-agent-readonly) | [shared-state/agent-readonly](https://docs.copilotkit.ai/strands-typescript/shared-state/agent-readonly) | [README](frontend/app/(sections)/shared-state-agent-readonly/README.md) |
| [/hitl](http://localhost:3000/hitl) | [human-in-the-loop](https://docs.copilotkit.ai/strands-typescript/human-in-the-loop) | [README](frontend/app/(sections)/hitl/README.md) |
| [/hitl-use-interrupt](http://localhost:3000/hitl-use-interrupt) | [human-in-the-loop/useInterrupt](https://docs.copilotkit.ai/strands-typescript/human-in-the-loop/useInterrupt) | [README](frontend/app/(sections)/hitl-use-interrupt/README.md) |
| [/hitl-headless](http://localhost:3000/hitl-headless) | [human-in-the-loop/headless](https://docs.copilotkit.ai/strands-typescript/human-in-the-loop/headless) | [README](frontend/app/(sections)/hitl-headless/README.md) |
| [/hitl-governed-actions](http://localhost:3000/hitl-governed-actions) | [human-in-the-loop/governed-actions](https://docs.copilotkit.ai/strands-typescript/human-in-the-loop/governed-actions) | [README](frontend/app/(sections)/hitl-governed-actions/README.md) |
| [/webmcp](http://localhost:3000/webmcp) | [webmcp](https://docs.copilotkit.ai/strands-typescript/webmcp) | [README](frontend/app/(sections)/webmcp/README.md) |
| [/multi-agent-subagents](http://localhost:3000/multi-agent-subagents) | [multi-agent/subagents](https://docs.copilotkit.ai/strands-typescript/multi-agent/subagents) | [README](frontend/app/(sections)/multi-agent-subagents/README.md) |

## Layout and git workflow
- A section owns only these paths: `agent/sections/<slug>.ts` (+ `agent/sections/_<slug>/`), `frontend/app/(sections)/<slug>/`, and `frontend/app/api/copilotkit/<slug>/`. The agent server and the index page discover sections automatically, so merging never conflicts.
- **To update a section,** commit on its branch, then run `git switch main && git merge <slug>`. To merge every branch, run `scripts/merge-all.sh`.
- **To change shared code** (`agent/server.ts`, `agent/quickstart-agent.ts`, root layout, config, dependencies), change it on `main` only, then run `scripts/sync-branches.sh`.

## Scaffold notes
- `frontend/` is from `create-next-app@latest` (Next 16). **`cacheComponents` is disabled** in `next.config.ts` (along with `partialPrefetching`, which requires it). With it on, `<CopilotKit>` fails with "unstable value `randomUUID()` in a Client Component" on every page.
- The docs pin `@ag-ui/client@1.0.2`, but `@copilotkit/runtime@1.90.2` uses 1.0.5. Every runtime route therefore shows a type error (`HttpAgent` vs `AbstractAgent`), though it works at runtime. This is left as is; see the [quickstart README](frontend/app/(sections)/quickstart/README.md).
- `@hashbrownai/core` and `@hashbrownai/react` are pinned to `0.5.0-beta.4`, the version the hashbrown page names; the latest (0.8.x) removed APIs the snippets use. `recharts` and `radix-ui` are direct dependencies because the docs and the copied demo components import them.
- **On `main`, open each section by its URL (a full page load).** Two sections change global page state when you click from one section to the next: look-css loads unscoped CSS, and genui-components-theming puts a `dark` class on `<html>`. That state stays until you reload. Running a section on its own branch avoids this.
- **`/shared-state-rendering-in-app` breaks every route on `main` until you restart `npm run dev`.** Its docs code has a compile error, and Next then returns HTTP 500 for every route. Test it last, or on its own branch. The other broken routes fail at render time, which affects only their own route.
