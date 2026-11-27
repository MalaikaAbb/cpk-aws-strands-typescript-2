# Plan: Branch-per-docs-section test repo for CopilotKit + AWS Strands (TypeScript)

## Context
You test CopilotKit's framework integrations, starting with `strands-typescript`. The goal:
- **One branch per docs page**, holding only that page's integration code. A page without backend code uses the quickstart agent. Every branch runs on its own and you can chat with its agent.
- **`main` = every branch merged together.** Each section is at its own route. Testing a section on `main` or on its own branch gives the same result, because the code is identical. `main` just contains all of the sections.
- Re-merging an updated branch updates that section on `main`.

**Verdict: this is feasible.** The only real risk is merge conflicts, which happen when two branches edit the same file. The design removes that risk: **each section owns files that no other branch touches, and all shared code lives once in `main` and is then left alone.** New sections are found automatically from the filesystem, so no shared list needs editing.

The workspace `/workspace/copilotkit/cpk-test` is empty and not a git repo yet.

## Integration rules (from you, applied to every branch)
1. Follow the docs strictly. Integrate the code given and use the prose for guidance.
2. Don't fix anything broken, and don't add UI, information or features that the docs don't include. If something is unclear, ask.
3. The only allowed additions are the minimal components needed to test a feature (a product row, a card, and so on) when the docs reference them without providing them.
5. **When a snippet is incomplete** (a missing import, or a function that is called but never defined, such as `getWeatherImpl`), check the page's **demo source code**. The docs show demo paths like `src/app/demos/<name>/...`; the demo repo is found from the page's demo/source links during implementation.
   - If the missing piece is in the demo, copy **only that piece** (the import, function or component), adjusted to the section's paths.
   - If it isn't in the demo, leave it broken and note it in the section's README.
   - Never copy whole demo files or any extra demo code. Only what the section's functionality needs.
4. **READMEs.** The root README stays short: how to run, plus a table of each section's route, docs link and a link to its own README. No per-section details go there.
   Each section has its own `frontend/app/(sections)/<slug>/README.md`, owned by its branch. It states:
   - The status: everything was provided, or a stub or demo code was needed, or the section is broken.
   - What was taken from the demo.
   - Any stubs, and what they mock.
   - What is broken, and why.
   - The prompts from the docs to test the section with.

**The only allowed structural adaptations** (needed so the branches merge cleanly, and the same in every branch):
- The `<CopilotKit>` provider goes in the section's own `layout.tsx` (or its page, if the docs put it there), not in the root layout.
- `runtimeUrl` becomes `/api/copilotkit/<slug>`. The runtime `basePath` matches it.
- The agent name / `agentId` becomes `<slug>`, replacing the docs' `strands_agent`, `default`, `agentic_chat` and so on.
- Docs file paths are moved under the section folder, and relative imports are adjusted to match.

## Repo layout (on `main`)
```
cpk-test/
  package.json        # root: npm workspaces; "dev" = concurrently(agent, frontend)
  .env.example        # OPENAI_API_KEY, CPK_INTELLIGENCE_API_KEY (only threads sections need it)
  README.md           # short: how to run + route table linking each section's README
  agent/              # Strands TS agent server, port 8000
    server.ts         # SHARED. Auto-imports sections/*.ts; each default-exports
                      #   one or more {name, agent}; mounts each at /<name>
    quickstart-agent.ts   # SHARED. The docs' quickstart main.ts agent as makeQuickstartAgent(name)
    sections/<slug>.ts    # OWNED. Docs backend code, or `makeQuickstartAgent("<slug>")`
  frontend/           # Next.js app router, port 3000
    app/layout.tsx    # SHARED. Root HTML, v2 styles.css, NO provider
    app/page.tsx      # SHARED. Index: lists sections automatically (reads app/(sections)/ at build)
    app/(sections)/<slug>/     # OWNED. page.tsx, layout/providers, _components/, _lib/, README.md
    app/api/copilotkit/<slug>/[[...slug]]/route.ts   # OWNED. Docs runtime-route code verbatim,
                               #   except basePath + HttpAgent URL http://localhost:8000/<slug>
```
- The runtime route belongs to each section. Pages that change the runtime (Intelligence, A2UI, MCP Apps, open generative UI, and so on) do it in their own route file, without touching shared code. Only the two threads sections enable `CopilotKitIntelligence`.
- Components and helpers go in `_components/` and `_lib/` inside the section folder. The `_` prefix keeps Next.js from treating them as routes. If two sections need the same component, each keeps its own copy.
- Multi-agent pages (subagents) export several agents from a single section file, named `<slug>`, `<slug>-<sub>` and so on.

## Naming
Each section's slug is its docs path flattened with `-`. The slug is also its **branch name**, **route** and **agent name**. Slashes can't be used: git can't have both a `generative-ui-components` branch and a `generative-ui-components/surfaces` branch nested under it.

## Sections (42 branches)
| # | Branch / route slug | Docs path | Backend |
|---|---|---|---|
| 1 | quickstart | quickstart?agent=bring-your-own | docs main.ts |
| 2 | prebuilt-chat | prebuilt-components/chat | quickstart |
| 3 | prebuilt-sidebar | prebuilt-components/sidebar | quickstart |
| 4 | prebuilt-popup | prebuilt-components/popup | quickstart |
| 5 | prebuilt-chat-controls | prebuilt-components/chat-controls | quickstart |
| 6 | look-css | custom-look-and-feel/css | quickstart |
| 7 | look-slots | custom-look-and-feel/slots | quickstart |
| 8 | look-markdown | custom-look-and-feel/markdown | quickstart |
| 9 | look-headless-ui | custom-look-and-feel/headless-ui | quickstart |
| 10 | look-reasoning-messages | custom-look-and-feel/reasoning-messages | per docs (reasoning model) |
| 11 | multimodal-attachments | multimodal-attachments | per docs |
| 12 | voice | voice | per docs (likely runtime transcription config) |
| 13 | genui-reasoning | generative-ui/reasoning | per docs |
| 14 | prebuilt-threads-drawer | prebuilt-components/copilot-threads-drawer | quickstart + **Intelligence** (intelligence/quickstart) |
| 15 | headless-threads | headless-threads | quickstart + **Intelligence** |
| 16 | frontend-tools | frontend-tools | quickstart |
| 17 | genui-tool-based | generative-ui/tool-based | per docs |
| 18 | genui-tool-rendering | generative-ui/tool-rendering | own agent: `get_weather`, `search_flights` tools (zod). `getWeatherImpl` and any other undefined tool backends come from the demo if they're defined there. **Exception to rule 5:** if the demo doesn't define them, write a minimal stub that returns mock data with the shape the renderer expects, and list each stub in the section's README |
| 19 | genui-components | generative-ui/components | **Strands agent, not BuiltInAgent** |
| 20 | genui-components-surfaces | …/components/surfaces | per docs |
| 21 | genui-components-catalogs | …/components/catalogs | per docs |
| 22 | genui-components-standard-catalog | …/components/standard-catalog | per docs |
| 23 | genui-components-state-and-actions | …/components/state-and-actions | per docs |
| 24 | genui-components-theming | …/components/theming | per docs |
| 25 | genui-components-transports | …/components/transports | per docs |
| 26 | genui-components-markdown-mode | …/components/markdown-mode | per docs |
| 27 | genui-components-from-a2ui | …/components/from-a2ui | per docs |
| 28 | genui-a2ui-dynamic-schema | generative-ui/a2ui/dynamic-schema | per docs |
| 29 | genui-a2ui-fixed-schema | generative-ui/a2ui/fixed-schema | per docs |
| 30 | genui-json-render | generative-ui/json-render | per docs |
| 31 | genui-hashbrown | generative-ui/hashbrown | per docs |
| 32 | genui-mcp-apps | generative-ui/mcp-apps | per docs (MCP server/middleware) |
| 33 | genui-open-generative-ui | generative-ui/open-generative-ui | per docs |
| 34 | shared-state | shared-state | per docs (agent state) |
| 35 | shared-state-rendering-in-app | shared-state/rendering-in-app | per docs |
| 36 | shared-state-agent-readonly | shared-state/agent-readonly | per docs |
| 37 | hitl | human-in-the-loop | per docs |
| 38 | hitl-use-interrupt | human-in-the-loop/useInterrupt | per docs |
| 39 | hitl-headless | human-in-the-loop/headless | per docs |
| 40 | hitl-governed-actions | human-in-the-loop/governed-actions | per docs |
| 41 | webmcp | webmcp | per docs |
| 42 | multi-agent-subagents | multi-agent/subagents | several agents (supervisor + subagents) |

"Per docs" means the page's backend code is read during implementation. If a page has none, the section uses the quickstart agent.

## Dependencies
- **Dependencies only change on `main`.** Before implementing, read all 42 pages, collect every package they install (for example zod, A2UI, json-render, hashbrown, MCP SDK, and shadcn `Card`/`Badge` if a page uses them), and install them all in the scaffold. If a page needs a new package later, add it on `main` and merge `main` into that branch. This prevents lockfile conflicts.
- shadcn components go in `frontend/components/ui/` (shared), and are only added when a docs page imports them.

## Running (same on every branch and on main)
1. Run `cp .env.example .env` once and fill in `OPENAI_API_KEY`. Add `CPK_INTELLIGENCE_API_KEY` from `npx copilotkit@latest project select` for the threads sections. `.env` is gitignored and untracked, so **it stays in place when you switch branches.**
2. Run `npm install`, then `npm run dev`. This starts the agent on :8000 and Next.js on :3000.
3. Open `http://localhost:3000`. The index lists the sections on the current branch. Click one and chat.
- Switching branches: run `git switch <slug>`, then `npm run dev`. Every branch has the same lockfile, so there's nothing to reinstall.
- Use `next dev` to test. A section whose docs code fails at **render time** only breaks its own route. A **compile** error (only `shared-state-rendering-in-app` has one) stops the whole dev server until it restarts, on both Turbopack and webpack. That is recorded in that section's README and in the root README.

## Git workflow
1. Commit the scaffold (all the shared files plus all dependencies) to `main`, and tag it `scaffold`.
2. For each section, run `git switch -c <slug> main`, add only the files that section owns, and commit.
3. On `main`, run `scripts/merge-all.sh`, which runs `git merge --no-edit` for each section branch. File sets don't overlap, so there are no conflicts.
4. To update a section, commit on its branch, then merge it into `main` again.
5. A change to shared code goes on `main`. Then run `git merge main` in each section branch (`scripts/sync-branches.sh`).

## Implementation order
1. Scaffold `main` and check that `createStrandsApp` works when mounted under a path. Fallback if it doesn't: one port per agent, assigned from the sorted list of section files.
2. Do `quickstart` first to check the full path from the page to the agent and back.
3. Do the remaining sections in batches, in table order, reading each page's code and prose. If a snippet is incomplete, fill the gap from the demo source (rule 5). Anything still missing is left broken and recorded in that section's README. Ask you when the docs are ambiguous; don't invent anything.
4. Merge everything into `main` and write the short root README route table, linking each section's README.

## Verification
- On each branch: run `npm run dev`, open `/<slug>`, send the docs' example prompt, and confirm the behaviour the docs describe.
- On `main`: open every route in the README and get the same result as on that section's branch.
- Merge test: change one section on its branch, re-merge it into `main`, and confirm there are no conflicts and the change shows up.
- Run `git diff scaffold..<slug> --stat` for each branch. It should list only that section's files.
- A section that is broken because the docs' code is broken is reported in its own README and not fixed.
