// Docs: catalogs -> "Export the catalog for other A2UI tools" (React tab), verbatim. A Node
// script, not run by the app. Added imports: `fs` (node:fs, missing from the snippet) and
// `appUI` from the "Combine catalogs" snippet (./app-ui).
import fs from "node:fs";
import { exportA2UICatalog } from "@copilotkit/react-core/v2/generative-ui";
import { appUI } from "./app-ui";

const catalog = exportA2UICatalog(appUI, { title: "Acme app" });
fs.writeFileSync("acme-catalog.json", JSON.stringify(catalog, null, 2));
