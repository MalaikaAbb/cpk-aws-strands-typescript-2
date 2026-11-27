// Minimal stand-in: registry.tsx imports `BarChart` from "./charts/bar-chart", which the docs never give.
// Shows the chart's data as a plain list.
export interface BarChartComponentProps {
  title: string;
  description?: string | null;
  data: { label: string; value: number }[];
}

export function BarChart({ title, description, data }: BarChartComponentProps) {
  return (
    <div>
      <b>{title}</b>
      {description && <div>{description}</div>}
      <ul>
        {data.map((d, i) => (
          <li key={i}>
            {d.label}: {d.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
