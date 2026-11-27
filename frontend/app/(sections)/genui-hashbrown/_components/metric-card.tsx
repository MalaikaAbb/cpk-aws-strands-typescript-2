// Minimal stand-in: hashbrown-renderer.tsx imports `MetricCard` from "./metric-card", which the docs never give.
export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <b>{label}</b> {value}
    </div>
  );
}
