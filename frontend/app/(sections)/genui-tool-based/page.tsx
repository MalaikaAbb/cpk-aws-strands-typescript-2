"use client";
// Docs: generative-ui/tool-based -> the `useComponent` + `z` imports and the
// `useComponent({...})` call (src/app/demos/gen-ui-tool-based/page.tsx), verbatim.
// Demo code (showcase gen-ui-tool-based/page.tsx): the `Chat` component wrapper and its
// <CopilotChat> layout (without the demo's pie chart and suggestions). The provider is
// the quickstart one, in layout.tsx (the docs show no provider for this page).
// Adaptation: agentId "gen-ui-tool-based" -> "genui-tool-based"; "./bar-chart" -> ./_components.

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

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="h-full w-full max-w-4xl">
        <CopilotChat
          agentId="genui-tool-based"
          className="h-full rounded-2xl"
        />
      </div>
    </div>
  );
}
