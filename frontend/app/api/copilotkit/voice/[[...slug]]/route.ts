// Docs: voice -> "Backend" -> "Next.js API route" (src/app/api/copilotkit-voice/[[...slug]]/route.ts).
// Adaptations: route moved to app/api/copilotkit/voice/[[...slug]]; basePath
// "/api/copilotkit-voice" -> "/api/copilotkit/voice"; agent keys "voice-demo" and `default`
// -> "voice" (both rename to the slug, so they collapse into one key); the "@/lib/..."
// import points at this section's _lib. AGENT_URL + `/voice/` already resolves to
// http://localhost:8000/voice/ (the slug's mount), so it is unchanged.
import type { NextRequest } from "next/server";
import {
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";
import { createTranscriptionService } from "../../../../(sections)/voice/_lib/transcription-service";

const AGENT_URL = process.env.AGENT_URL || "http://localhost:8000";

// Point at the tool-free /voice endpoint so aimock returns a direct text
// response instead of a tool call that the agent can't summarize.
const voiceDemoAgent = new HttpAgent({ url: `${AGENT_URL}/voice/` });

let cachedHandler: ((req: Request) => Promise<Response>) | null = null;
function getHandler(): (req: Request) => Promise<Response> {
  if (cachedHandler) return cachedHandler;

  const runtime = new CopilotRuntime({
    // @ts-ignore -- Published CopilotRuntime agents type wraps Record in
    // MaybePromise<NonEmptyRecord<...>> which rejects plain Records; fixed in
    // source, pending release.
    agents: {
      voice: voiceDemoAgent,
    },
    transcriptionService: createTranscriptionService(),
  });

  cachedHandler = createCopilotRuntimeHandler({
    runtime,
    basePath: "/api/copilotkit/voice",
  });
  return cachedHandler;
}

export const POST = (req: NextRequest) => getHandler()(req);
export const GET = (req: NextRequest) => getHandler()(req);
export const PUT = (req: NextRequest) => getHandler()(req);
export const DELETE = (req: NextRequest) => getHandler()(req);
