// The docs import generateFallbackSlots without giving it. The Strands interrupt payload carries
// no slots, so the picker needs these. Minimal version: four slots starting tomorrow.
import type { TimeSlot } from "../_components/time-picker-card";

export function generateFallbackSlots(): TimeSlot[] {
  return [10, 14, 33, 39.5].map((hoursFromMidnightTomorrow) => {
    const d = new Date();
    d.setHours(24, 0, 0, 0);
    d.setMinutes(hoursFromMidnightTomorrow * 60);
    return { label: d.toLocaleString(), iso: d.toISOString() };
  });
}
