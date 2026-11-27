# look-markdown

**Docs:** https://docs.copilotkit.ai/strands-typescript/custom-look-and-feel/markdown
**Route:** http://localhost:3000/look-markdown (plus `/look-markdown/block` and `/look-markdown/replace`)
**Status:** ✅ Everything was provided by the docs. ⚠️ One type error, caused by the docs (see below). There is no demo for this page.

## Routes (one per independent example)
| Route | Docs section |
|---|---|
| `/look-markdown` | Restyle individual HTML tags (Streamdown `components` map for `a` and `h2`) |
| `/look-markdown/block` | Restyle the whole markdown block (`markdownRenderer: "text-sm leading-7"`) |
| `/look-markdown/replace` | Replace the renderer (`PlainText`) |

## Files
| File | Docs step |
|---|---|
| `agent/sections/look-markdown.ts` | No backend code on this page: the shared quickstart agent |
| `frontend/app/api/copilotkit/look-markdown/[[...slug]]/route.ts` | No runtime changes on this page: the quickstart runtime route |
| `layout.tsx`, `providers.tsx` | No provider code on this page: the quickstart provider |
| `_components/restyle-tags-chat.tsx` | Restyle individual HTML tags (verbatim) |
| `page.tsx` | One-line re-export of that `Chat` as the route's default export |
| `block/page.tsx` | Restyle the whole markdown block |
| `replace/page.tsx` | Replace the renderer |

## Adaptations
- The agent name is `look-markdown`. The runtime URL is `/api/copilotkit/look-markdown`, and the agent is at `http://localhost:8000/look-markdown`. The docs' components pass no `agentId`, so they use the provider's agent.
- The provider is in this section's `layout.tsx` (via `providers.tsx`), as quickstart does.
- Each snippet is a separate example, so each one gets its own route.
- The docs' `export function Chat()` lives in `_components/restyle-tags-chat.tsx`, and `page.tsx` re-exports it as its default. This keeps non-Next.js named exports out of page files.
- The JSX-only snippets get the `CopilotChat` import and a default-export page wrapper.
- Intelligence is not used (as quickstart).

Not implemented:
- The intro skeleton `markdownRenderer: { /* ... */ }`, which is only a placeholder.
- The "Custom tags are not supported" section, which shows an expected compile error (`'"reference-chip"' does not exist in type 'Components'`), not code to use.
- "Other frontends" (Vue / Angular).

## Demo code / stubs
None.

## Known issues (left as the docs have them)
- **Type error in `route.ts`:** `Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` version mismatch. See the quickstart README.
- The docs give no CSS for `.my-link` and `.my-heading`, so the restyled `a` and `h2` look unstyled. Per the prose they also lose Streamdown's default classes (`text-primary underline`, and so on) and the `data-streamdown` attribute.

## Try these prompts
Docs give no prompts. What to check, from the prose:
- `/look-markdown`: ask for a reply with a link and a level-2 heading, for example `Reply with a "## Links" heading and a markdown link to https://docs.copilotkit.ai`. The link should render as `<a class="my-link" href="…" target="_blank" rel="noopener noreferrer">` with no `node="[object Object]"` attribute and no `data-streamdown`. The heading should be `<h2 class="my-heading">`.
- `/look-markdown/block`: the markdown container of each assistant reply gets `text-sm leading-7`.
- `/look-markdown/replace`: replies render as raw markdown text inside a `<pre>` (no formatting).
- Any route: ask the agent to write `Hi <reference-chip id="42">Doc 42</reference-chip>.` and `<kbd>Ctrl</kbd>`. Per the docs, the custom tag is stripped (`<p>Hi Doc 42.</p>`), and `<kbd>` renders as a real element (not on `/replace`, which shows raw text).
