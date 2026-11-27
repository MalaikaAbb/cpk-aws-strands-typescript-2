// Docs: generative-ui/tool-based -> "Define the props of your component as a Zod schema" (bar-chart.tsx):
// the `import { z }` and `barChartPropsSchema` are verbatim from the docs.
// Added (needed): `BarChart`, the component `useComponent` renders ("`BarChart` is your own React
// component"), as plain unstyled JSX that shows its props.
import { z } from "zod";

export const barChartPropsSchema = z.object({
  title: z.string().describe("Chart title"),
  description: z.string().describe("Brief description or subtitle"),
  data: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
    }),
  ),
});

type BarChartProps = z.infer<typeof barChartPropsSchema>;

export function BarChart({ title, description, data }: BarChartProps) {
  return (
    <div>
      <b>{title}</b>
      <p>{description}</p>
      <ul>
        {data?.map((d, i) => (
          <li key={i}>
            {d.label}: {d.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
