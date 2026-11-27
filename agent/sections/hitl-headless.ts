// Docs: human-in-the-loop/headless has no backend code, so this is the quickstart agent.
// NOTE: the quickstart agent has no tool that pauses, so no interrupt will ever arrive (see README).
import { createQuickstartApp } from "../quickstart-agent.ts";

export default await createQuickstartApp("hitl-headless");
