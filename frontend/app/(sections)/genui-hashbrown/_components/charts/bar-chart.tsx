// Minimal stand-in: hashbrown-renderer.tsx imports `BarChart` from "./charts/bar-chart", which the docs
// never give. Shows the chart's data as a plain list.
export function BarChart({
  title,
  description,
  data,
}: {
  title: string;
  description: string;
  data: { label: string; value: number }[];
}) {
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
