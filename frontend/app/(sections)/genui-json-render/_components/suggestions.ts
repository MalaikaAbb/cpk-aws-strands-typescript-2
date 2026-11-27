// Copied from the demo (src/app/demos/declarative-json-render/suggestions.ts): chat.tsx calls `useByocJsonRenderSuggestions` from "./suggestions", which the docs never give.
import { useConfigureSuggestions } from "@copilotkit/react-core/v2";

export const BYOC_JSON_RENDER_SUGGESTIONS = [
  {
    title: "Sales dashboard",
    message: "Show me the sales dashboard with metrics and a revenue chart",
  },
  {
    title: "Revenue by category",
    message: "Break down revenue by category as a pie chart",
  },
  {
    title: "Expense trend",
    message: "Show me monthly expenses as a bar chart",
  },
];

export function useByocJsonRenderSuggestions() {
  useConfigureSuggestions({
    suggestions: BYOC_JSON_RENDER_SUGGESTIONS,
    available: "always",
  });
}
