// Minimal stand-in: registry.tsx imports `MetricCard` from "./metric-card", which the docs never give.
export interface MetricCardComponentProps {
  label: string;
  value: string;
  trend?: string | null;
}

export function MetricCard({ label, value, trend }: MetricCardComponentProps) {
  return (
    <div>
      <b>{label}</b> {value} {trend}
    </div>
  );
}
