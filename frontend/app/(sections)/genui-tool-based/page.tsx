"use client";
// Docs: generative-ui/tool-based -> the `useComponent` + `z` imports and the
// `useComponent({...})` call (src/app/demos/gen-ui-tool-based/page.tsx), verbatim.
// Added (needed): the page component and a <CopilotChat /> to ask the agent. The provider is
// the quickstart one, in layout.tsx. "./bar-chart" -> ./_components.

import { CopilotChat } from "@copilotkit/react-core/v2";
import { useComponent } from "@copilotkit/react-core/v2";
import { z } from "zod";
import { BarChart, barChartPropsSchema } from "./_components/bar-chart";

export default function Chat() {
  useComponent({
    name: "render_bar_chart",
    description: "Display a bar chart with labeled numeric values.",
    parameters: barChartPropsSchema,
    render: BarChart,
  });

  return <CopilotChat />;
}
