// Docs: human-in-the-loop/governed-actions shows backend code only in Python (LangGraph
// `send_email` with `interrupt()`), which is skipped. No TypeScript backend code, so this is the
// quickstart agent. It never interrupts, so the useInterrupt sample can't fire (see README).
import { createQuickstartApp } from "../quickstart-agent.ts";

export default await createQuickstartApp("hitl-governed-actions");
