// Docs: fixed-schema -> "Load the schema JSON at startup" and "Return render operations from the
// tool" (both src/agent/agent.ts), verbatim. The JSON is in ./a2ui_schemas/, next to this file.
// From the demo (src/agent/agent.ts): the imports below, which the docs snippets omit.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tool } from "@strands-agents/sdk";
import { z } from "zod";
import {
  A2UI_OPERATIONS_KEY,
  createSurface,
  updateComponents,
  updateDataModel,
} from "@ag-ui/a2ui-toolkit";

const _A2UI_DIR = dirname(fileURLToPath(import.meta.url));

const A2UI_FIXED_CATALOG_ID = "copilotkit://flight-fixed-catalog";
const A2UI_FIXED_SURFACE_ID = "flight-fixed-schema";

// Fixed, pre-authored component layout. Loaded from JSON so it can be authored
// and reviewed independently of the agent code.
const FLIGHT_SCHEMA: Array<Record<string, unknown>> = JSON.parse(
  readFileSync(join(_A2UI_DIR, "a2ui_schemas", "flight_schema.json"), "utf-8"),
);

// The docs snippet is indented, as if inside a function. It is kept at module level (dedented) and
// exported, so the quickstart agent can use it ("the tool drops into whatever agent you already have").
export const displayFlight = tool({
  name: "display_flight",
  description:
    "Show a flight card for the given trip. Use short airport codes " +
    '(e.g. "SFO", "JFK") for origin/destination and a price string like ' +
    '"$289". After this tool returns, the flight card is already rendered ' +
    "to the user via the A2UI surface — do NOT call it again for the same " +
    "flight; reply with one short confirmation sentence and stop.",
  inputSchema: z.object({
    origin: z.string().describe('Origin airport code, e.g. "SFO".'),
    destination: z.string().describe('Destination airport code, e.g. "JFK".'),
    airline: z.string().describe('Airline name, e.g. "United".'),
    price: z.string().describe('Price string, e.g. "$289".'),
  }),
  callback: ({ origin, destination, airline, price }) => ({
    [A2UI_OPERATIONS_KEY]: [
      createSurface(A2UI_FIXED_SURFACE_ID, A2UI_FIXED_CATALOG_ID),
      updateComponents(A2UI_FIXED_SURFACE_ID, FLIGHT_SCHEMA),
      updateDataModel(A2UI_FIXED_SURFACE_ID, {
        origin,
        destination,
        airline,
        price,
      }),
    ],
  }),
});
