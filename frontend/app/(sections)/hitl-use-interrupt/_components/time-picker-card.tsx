// The docs import TimePickerCard (and TimeSlot) without giving them. Minimal unstyled version
// with the demo's props: one button per slot -> onSubmit({ chosen_time, chosen_label }),
// "None of these work" -> onSubmit({ cancelled: true }).
export interface TimeSlot {
  label: string;
  iso: string;
}

export function TimePickerCard({
  topic,
  attendee,
  slots,
  onSubmit,
}: {
  topic: string;
  attendee?: string;
  slots: TimeSlot[];
  onSubmit: (
    result: { chosen_time: string; chosen_label: string } | { cancelled: true },
  ) => void;
}) {
  return (
    <div>
      <p>
        {topic}
        {attendee && ` with ${attendee}`}
      </p>
      {slots.map((s) => (
        <button key={s.iso} onClick={() => onSubmit({ chosen_time: s.iso, chosen_label: s.label })}>
          {s.label}
        </button>
      ))}
      <button onClick={() => onSubmit({ cancelled: true })}>None of these work</button>
    </div>
  );
}
