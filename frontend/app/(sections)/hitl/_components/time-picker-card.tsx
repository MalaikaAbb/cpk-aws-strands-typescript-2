// The docs import TimePickerCard and give only its props (below) and its behaviour:
// each slot button calls onSubmit({ chosen_time, chosen_label }); "None of these work"
// calls onSubmit({ cancelled: true }). Minimal unstyled implementation of that.
export interface TimeSlot {
  label: string;
  iso: string;
}

export type TimePickerStatus = "inProgress" | "executing" | "complete";

export interface TimePickerCardProps {
  topic: string;
  attendee?: string;
  slots: TimeSlot[];
  status: TimePickerStatus;
  onSubmit: (
    result: { chosen_time: string; chosen_label: string } | { cancelled: true },
  ) => void;
}

export function TimePickerCard({ topic, attendee, slots, status, onSubmit }: TimePickerCardProps) {
  const disabled = status !== "executing";
  return (
    <div>
      <p>
        {topic}
        {attendee && ` with ${attendee}`}
      </p>
      {slots.map((s) => (
        <button
          key={s.iso}
          disabled={disabled}
          onClick={() => onSubmit({ chosen_time: s.iso, chosen_label: s.label })}
        >
          {s.label}
        </button>
      ))}
      <button disabled={disabled} onClick={() => onSubmit({ cancelled: true })}>
        None of these work
      </button>
    </div>
  );
}
