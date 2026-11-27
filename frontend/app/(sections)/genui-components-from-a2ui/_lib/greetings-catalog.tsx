// Docs: from-a2ui -> "Use 1.0 with the React a2ui renderer" (custom catalog snippet), verbatim.
import { z } from "zod";
import {
  createCatalog,
  DynamicStringSchemaV1,
} from "@copilotkit/a2ui-renderer";

const myCatalog = createCatalog(
  { Greeting: { props: z.object({ name: DynamicStringSchemaV1 }) } },
  { Greeting: ({ props }) => <p>Hello {props.name}</p> },
  {
    catalogId: "acme/greetings@1",
    protocolVersion: "1.0",
    includeBasicCatalog: true,
  },
);

// Added: the docs snippet declares `myCatalog` without exporting it.
export { myCatalog };
