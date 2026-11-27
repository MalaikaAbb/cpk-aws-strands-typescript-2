# multimodal-attachments

**Docs:** https://docs.copilotkit.ai/strands-typescript/multimodal-attachments
**Routes** (one per docs snippet):
| Route | Docs snippet |
|---|---|
| http://localhost:3000/multimodal-attachments | Quick start (`attachments={{ enabled: true }}`) |
| `/multimodal-attachments/configuration` | Configuration (`accept`, `maxSize` 10MB) |
| `/multimodal-attachments/upload-base64` | Custom upload handler: Base64 (inline) |
| `/multimodal-attachments/upload-url` | Custom upload handler: URL (hosted) ❌ |
| `/multimodal-attachments/metadata` | Adding metadata ❌ |
| `/multimodal-attachments/concurrency` | Upload concurrency ❌ |
| `/multimodal-attachments/upload-errors` | Handling upload errors: `onUploadFailed` ❌ |
| `/multimodal-attachments/on-error` | Handling upload errors: `onError` on `CopilotChat` (type error only) |

**Status:** ❌ Partly broken. Quick start, Configuration and Base64 upload are complete as given (✅). Four snippets use things the docs never define and the demo doesn't have either: `/api/upload`, `uploadToStorage`, `currentUser` and `toast`. The `onError` snippet doesn't type-check.

## Files
| File | Docs step |
|---|---|
| `agent/sections/multimodal-attachments.ts` | No backend code in the docs: the quickstart agent |
| `frontend/app/api/copilotkit/multimodal-attachments/[[...slug]]/route.ts` | Quickstart runtime (the page doesn't change it) |
| `providers.tsx`, `layout.tsx` | Quickstart provider ("You have a working CopilotChat") |
| `page.tsx` | Quick start |
| `configuration/page.tsx` | Configuration |
| `upload-base64/page.tsx`, `upload-url/page.tsx` | Custom upload handler (both tabs) |
| `metadata/page.tsx` | Adding metadata |
| `concurrency/page.tsx` | Upload concurrency |
| `upload-errors/page.tsx`, `on-error/page.tsx` | Handling upload errors |

## Adaptations
- `agentId="my-agent"` (Quick start) becomes `"multimodal-attachments"`. The other snippets have no `agentId` and use the provider's `agent="multimodal-attachments"`.
- Each bare `<CopilotChat ... />` snippet is returned from its route's `Page` component.
- The "Adding metadata" snippet is only an `onUpload:` property. It is placed in `<CopilotChat attachments={{ enabled: true, onUpload }} />`, the shape every other snippet uses.
- Only "Quick start" shows `import { CopilotChat } from "@copilotkit/react-core/v2"`. The same import was added to the other pages.
- The `// [!code highlight]` docs-renderer marker was dropped.
- Intelligence is not used (as in quickstart).

## Demo code / stubs
None. The showcase `multimodal` demo uses its own chat wrapper and sample buttons, and has none of the missing pieces below.

## Known issues (left as the docs have them)
- `upload-url`: the docs POST to `/api/upload`, which the docs don't provide (the demo doesn't either). The upload gets a 404, then `res.json()` fails, so the attachment fails with `upload-failed`.
- `metadata`: `Cannot find name 'uploadToStorage'.` and `Cannot find name 'currentUser'.` Attaching a file throws a ReferenceError in `onUpload`.
- `concurrency`: `Cannot find name 'uploadToStorage'.` Same runtime failure.
- `upload-errors`: `Cannot find name 'toast'.` The docs never import a toast library. Triggering an upload error (a non-image file, or one over 5MB) throws a ReferenceError inside `onUploadFailed`.
- `on-error`: `Property 'code' does not exist on type 'SyntheticEvent<HTMLDivElement, Event> | { error: Error; code: CopilotKitCoreErrorCode; context: Record<string, any>; }'.` (and the same for `'error'`). `CopilotChat`'s `onError` prop type is a union with the `<div>`'s DOM `onError`, so the docs' handler doesn't narrow. This is type-only. It should work at runtime for agent errors.
- `route.ts`: the known `HttpAgent is missing ... _threadId, _maxEnforcedEntries` error (see the quickstart README).

## Open questions
- The page has no backend code. "Any AG-UI-compatible agent ... can receive them" is taken literally, so this is the quickstart agent unchanged. Whether the Strands bridge forwards image/PDF parts to `gpt-6-luna` is what this section tests.

## Try these prompts
Docs give no prompts. Attach a file (paperclip or drag-and-drop) and ask about it, for example attach an image and send "What's in this image?".
