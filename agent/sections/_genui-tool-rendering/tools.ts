// Docs: generative-ui/tool-rendering -> "The backend tool definition" (src/agent/tools.ts), verbatim.
// Imports completed: `tool` (@strands-agents/sdk), `z` (zod), and `getWeatherImpl`
// (copied from the demo's src/agent/lib/tool-impls.ts into ./tool-impls.ts).
import { tool } from "@strands-agents/sdk";
import { z } from "zod";
import { getWeatherImpl } from "./tool-impls.ts";
// Demo: searchFlightsImpl + Flight (src/agent/lib/tool-impls.ts re-exports them from showcase/shared/typescript/tools).
import { searchFlightsImpl } from "./shared-tools/search-flights.ts";
import type { Flight } from "./shared-tools/types.ts";

export const getWeather = tool({
  name: "get_weather",
  description: "Get current weather for a location.",
  inputSchema: z.object({
    location: z.string().describe("The location to get weather for."),
  }),
  callback: ({ location }) => JSON.stringify(getWeatherImpl(location)),
});

// Demo code: `search_flights` backend tool from showcase/integrations/strands-typescript/src/agent/tools.ts, verbatim.
// The docs give the frontend renderer for `search_flights` but no backend tool.
export const searchFlights = tool({
  name: "search_flights",
  description:
    'Search for flights and display the results as rich cards. Return exactly 2 flights. Each flight must have: airline, airlineLogo, flightNumber, origin, destination, date (short readable format like "Tue, Mar 18" -- use near-future dates), departureTime, arrivalTime, duration (e.g. "4h 25m"), status (e.g. "On Time" or "Delayed"), statusColor (hex color for status dot), price (e.g. "$289"), and currency (e.g. "USD"). For airlineLogo use the Google favicon API: https://www.google.com/s2/favicons?domain={airline_domain}&sz=128',
  inputSchema: z.object({
    flights: z
      .array(z.record(z.string(), z.unknown()))
      .describe("List of flight objects."),
  }),
  callback: ({ flights }) =>
    JSON.stringify(searchFlightsImpl(flights as unknown as Flight[])),
});
