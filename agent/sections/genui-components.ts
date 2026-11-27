// Docs: generative-ui/components -> "Try it". The page's agent is a TanStack BuiltInAgent;
// per the user's instruction the Strands agent is used instead. The docs say an existing
// CopilotKit setup needs step 3 only ("Your runtime needs no change"), so this is the
// shared quickstart Strands agent under the name "genui-components".
import { createQuickstartApp } from "../quickstart-agent.ts";

export default await createQuickstartApp("genui-components");
