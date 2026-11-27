// Docs: generative-ui/tool-rendering -> "The backend tool definition" (src/agent/tools.ts), verbatim.
// Imports completed: `tool` (@strands-agents/sdk), `z` (zod), and `getWeatherImpl`
// (copied from the demo's src/agent/lib/tool-impls.ts into ./tool-impls.ts).
import { tool } from "@strands-agents/sdk";
import { z } from "zod";
import { getWeatherImpl } from "./tool-impls.ts";

export const getWeather = tool({
  name: "get_weather",
  description: "Get current weather for a location.",
  inputSchema: z.object({
    location: z.string().describe("The location to get weather for."),
  }),
  callback: ({ location }) => JSON.stringify(getWeatherImpl(location)),
});
