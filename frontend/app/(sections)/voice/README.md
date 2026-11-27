# voice

**Docs:** https://docs.copilotkit.ai/strands-typescript/voice
**Routes:**
- http://localhost:3000/voice: Frontend snippet with `<CopilotChat />` in place of `<VoiceChat />`, as the prose says
- http://localhost:3000/voice/sample: the snippet as written, rendering `<VoiceChat />` (demo) with the docs' `SampleAudioButton`

**Status:** 🧩 The runtime route, the transcription service and the page are from the docs. `VoiceChat` (a minimal version) and the `SampleAudioButtonProps` type were added because the docs use them without defining them. ⚠️ Two docs type errors (an openai version mismatch, and a misplaced `@ts-ignore`). The mic only appears when `OPENAI_TRANSCRIPTION_API_KEY` is set in the frontend's environment.

## Files
| File | Docs step |
|---|---|
| `agent/sections/voice.ts` | No agent code in the docs: the quickstart agent (tool-free, as the route comment expects) |
| `frontend/app/api/copilotkit/voice/[[...slug]]/route.ts` | Backend: Next.js API route (`transcriptionService`) |
| `_lib/transcription-service.ts` | Custom transcription backends (`src/lib/transcription-service.ts`, verbatim) |
| `page.tsx` | Frontend (`<CopilotKit>` in the page, `<CopilotChat />` per the prose) |
| `sample/page.tsx` | Frontend snippet as written (`<VoiceChat />`) |
| `_components/voice-chat.tsx` | Minimal `VoiceChat`, the "parent chat component" the prose describes |
| `_components/sample-audio-button.tsx` | Driving the demo without a mic (`SampleAudioButton`, verbatim) |

## Adaptations
- `runtimeUrl` `"/api/copilotkit-voice"` becomes `"/api/copilotkit/voice"`. The route moves to `app/api/copilotkit/voice/[[...slug]]`, and its `basePath` matches.
- `agent="voice-demo"` becomes `"voice"`. The runtime's two keys `"voice-demo"` and `default` both rename to `"voice"`, so they collapse into a single `voice` key.
- The `HttpAgent` URL is kept as the docs write it (`${AGENT_URL}/voice/`). With the default `AGENT_URL` it is `http://localhost:8000/voice/`, which is this section's mount.
- `@/lib/transcription-service` is imported by a relative path into `(sections)/voice/_lib/`.
- `page.tsx` renders `<CopilotChat />` (import added) instead of `<VoiceChat />`, following "In your app, render `<CopilotChat />` in its place". Intelligence is not used.

## Demo code / stubs (kept because they are needed)
- `_components/voice-chat.tsx`: a minimal `VoiceChat`. The docs render `<VoiceChat />` and describe its job: drop the sample text into `copilot-chat-textarea` using the native value setter and an `input` event. It is reduced to that injection, the docs' `<SampleAudioButton>` and `<CopilotChat agentId="voice" />`.
- `SampleAudioButtonProps` (two fields). The docs' component uses this type without defining it.

## Removed (not needed for functionality)
- From the demo's `VoiceChat`: the heading, layout `div`s and Tailwind classes, the `useCallback`, the `console.warn`, the `focus()` call, the fallback setter, the explanatory comments and the `AGENT_ID` / `SAMPLE_TEXT` constants.
- The doc comments on `SampleAudioButtonProps`.

## Known issues (left as the docs have them)
- `_lib/transcription-service.ts`: `Type 'import(".../frontend/node_modules/openai/client").OpenAI' is not assignable to type 'import(".../frontend/node_modules/@copilotkit/voice/node_modules/openai/client").OpenAI'. Property '#private' in type 'OpenAI' refers to a different member that cannot be accessed from within type 'OpenAI'.` This is exactly what the docs' callout predicts: the app has `openai@7.65.0` and `@copilotkit/voice` resolves its own `openai@5.x`. Type-only. It probably still works at runtime.
- `route.ts(30,7)`: `No overload matches this call ... Type 'HttpAgent' is missing the following properties from type 'AbstractAgent': _threadId, _maxEnforcedEntries, maxEnforcedEntries`. This is the known `@ag-ui/client` mismatch (see the quickstart README). Here the docs' own `// @ts-ignore` doesn't suppress it, because it sits above `agents: {` while the error is reported on the property line inside it.
- **Env var:** `createTranscriptionService()` returns `undefined` unless `OPENAI_TRANSCRIPTION_API_KEY` is set. Then there's no mic button, and `/transcribe` answers 503. It is in `.env.example`, and it must be visible to the Next.js process (`npm run dev` loads the root `.env`). Optional: `OPENAI_TRANSCRIPTION_BASE_URL`.

## Open questions
- The Frontend snippet renders `<VoiceChat />`, but the prose says to render `<CopilotChat />` in its place. Both are implemented: `/voice` follows the prose, and `/voice/sample` follows the snippet with the demo wrapper.
- The runtime registers the same agent under `"voice-demo"` and `default`. With the slug rename, only one key (`voice`) remains.

## Try these prompts (from the docs)
- Click the mic, say `What is the weather in Tokyo?`, then click the mic again. The text appears in the composer, ready to send.
- On `/voice/sample`, click **Try a sample audio** to insert `What is the weather in Tokyo?` without a mic.
- Check `http://localhost:3000/api/copilotkit/voice/info`: it should show `audioFileTranscriptionEnabled: true`.
