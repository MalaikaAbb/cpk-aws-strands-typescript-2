// Docs: quickstart -> "Setup Copilot Runtime", connected to Intelligence per
// intelligence/quickstart ("Connect your runtime" + "Mount the TypeScript handler", TypeScript tab).
// The threads drawer page requires Intelligence, so `intelligence` + `identifyUser` are kept.
// Adaptations: agent key "strands_agent" -> "prebuilt-threads-drawer"; HttpAgent URL -> /prebuilt-threads-drawer;
// basePath -> /api/copilotkit/prebuilt-threads-drawer. CPK_INTELLIGENCE_API_KEY comes from the root .env.
import {
  CopilotKitIntelligence,
  CopilotRuntime,
  createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";
import { HttpAgent } from "@ag-ui/client";

// Not in the docs (nor the demo): the docs' `authenticateApplicationUser` "represents your
// server-side authentication function". Per the docs' "A fixed identity is suitable only for a
// local, single-user demo", it returns one fixed local user.
async function authenticateApplicationUser(_request: Request) {
  return { id: "local-user", name: "Local user" };
}

const agents = {
  "prebuilt-threads-drawer": new HttpAgent({ url: "http://localhost:8000/prebuilt-threads-drawer" }),
};

// Create the Intelligence client with your project API key. Keep this key on the server.
const intelligence = new CopilotKitIntelligence({
  apiKey: process.env.CPK_INTELLIGENCE_API_KEY!,
});

const runtime = new CopilotRuntime({
  agents,
  // Pass the Intelligence client to the runtime
  intelligence,
  // Identify the user from a verified session or token
  identifyUser: async (request) => {
    const user = await authenticateApplicationUser(request);
    if (!user) throw new Error("Unauthorized");
    return { id: user.id, name: user.name };
  },
});

const handler = createCopilotRuntimeHandler({
  runtime,
  basePath: "/api/copilotkit/prebuilt-threads-drawer",
});

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const DELETE = handler;
