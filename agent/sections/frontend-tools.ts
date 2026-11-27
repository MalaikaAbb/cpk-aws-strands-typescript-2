// Docs: frontend-tools -> agent.ts + prompts.ts (in ./_frontend-tools). The docs give no
// server code; served the quickstart way: `createStrandsApp(aguiAgent, { path: "/" })`,
// exported instead of `app.listen(8000)`.
import { createStrandsApp } from "@ag-ui/aws-strands/server";
import { aguiAgent } from "./_frontend-tools/agent.ts";

const app = await createStrandsApp(aguiAgent, { path: "/" });
export default app;
