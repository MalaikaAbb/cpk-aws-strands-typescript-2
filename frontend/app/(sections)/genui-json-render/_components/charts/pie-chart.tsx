// Minimal stand-in: registry.tsx imports `PieChart` from "./charts/pie-chart", which the docs never give.
// Shows the chart's data as a plain list.
export interface PieChartComponentProps {
  title: string;
  description?: string | null;
  data: { label: string; value: number }[];
}

export function PieChart({ title, description, data }: PieChartComponentProps) {
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
