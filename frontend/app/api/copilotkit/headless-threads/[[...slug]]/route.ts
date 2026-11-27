// Docs: headless-threads -> "Configure your Runtime with CopilotKit Intelligence" (server.ts),
// mounted per intelligence/quickstart "Mount the TypeScript handler" (GET/POST/PATCH/DELETE).
// Adaptations: agent key "default" -> "headless-threads", and the docs' undefined `agent` is the
// quickstart's HttpAgent (http://localhost:8000/headless-threads); basePath ->
// /api/copilotkit/headless-threads. CPK_INTELLIGENCE_API_KEY comes from the root .env.
import {
  CopilotKitIntelligence,
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

// Not in the docs (nor the demo): `verifyAppSession` is the app's own session check. Following
// intelligence/quickstart ("A fixed identity is suitable only for a local, single-user demo"),
// it returns one fixed local user.
async function verifyAppSession(_request: Request) {
  return { user: { id: "local-user", name: "Local user" } };
}

const agent = new HttpAgent({ url: "http://localhost:8000/headless-threads" });

const runtime = new CopilotRuntime({
  agents: {
    "headless-threads": agent,
  },
  // Without `intelligence` the runtime runs in SSE mode and the thread
  // UI has nothing to list — chat still works, so this fails quietly.
  intelligence: new CopilotKitIntelligence({
    apiKey: process.env.CPK_INTELLIGENCE_API_KEY!,
  }),
  // Required alongside `intelligence`: threads are scoped per user, and
  // the runtime throws at startup without it. Resolve the real
  // signed-in user — see Thread & History Lifecycle.
  identifyUser: async (request) => {
    const session = await verifyAppSession(request);
    if (!session?.user) throw new Error("Unauthorized");
    return { id: session.user.id, name: session.user.name };
  },
  // Each new thread is named from its first user message.
  // For a short title from a model, pass { model: "openai/gpt-5-mini" }.
  // Set to false to disable:
  // generateThreadNames: false,

  // Optional: tune thread lock behavior
  // lockTtlSeconds: 20,              // Lock TTL (default 20s, max 3600s)
  // lockHeartbeatIntervalSeconds: 15, // Heartbeat interval (default 15s, max 3000s)
  // lockKeyPrefix: "my-app",          // Custom Redis key prefix for the lock
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/headless-threads",
});

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
