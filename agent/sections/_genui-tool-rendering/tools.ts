// Docs: generative-ui/tool-rendering -> "The backend tool definition" (src/agent/tools.ts), verbatim.
// Imports completed: `tool`, `z`, and `getWeatherImpl` (./tool-impls.ts).
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

// Not in the docs: the `search_flights` backend, so the docs' FlightListCard renderer can fire.
// Trimmed from the demo's tool to the minimum: the model makes up the flights, and the tool returns
// them in the shape FlightListCard reads ({ flights: [{ airline, flight, depart, arrive, price_usd }] }).
export const searchFlights = tool({
  name: "search_flights",
  description:
    "Search for flights. Return exactly 2 flights, each with airline, flight, depart, arrive and price_usd.",
  inputSchema: z.object({
    origin: z.string(),
    destination: z.string(),
    flights: z.array(z.record(z.string(), z.unknown())),
  }),
  callback: ({ origin, destination, flights }) =>
    JSON.stringify({ origin, destination, flights }),
});
