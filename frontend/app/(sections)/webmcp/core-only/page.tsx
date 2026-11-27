"use client";
// Host for the docs' webmcp.ts ("WebMCP only, with no agent"): importing the module creates the
// CopilotKitCore and registers the tool. The page renders nothing (the docs give no UI); test it with
// Chrome's Model Context Tool Inspector. Note: this route still sits under the section layout's
// <CopilotKit> provider, which this path doesn't use.
import { copilotkit } from "../_lib/webmcp";

// Keep a reference so the core instance stays alive ("Keep the core instance alive for as long as
// the tool should remain available").
void copilotkit;

export default function Page() {
  return null;
}
