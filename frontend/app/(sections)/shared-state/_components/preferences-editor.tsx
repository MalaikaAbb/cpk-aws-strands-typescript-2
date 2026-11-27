"use client";
// `Preferences`: demo code, copied from showcase/.../demos/shared-state-read-write/preferences-card.tsx
// (the docs' handlePreferencesChange uses the type without defining it).
// `PreferencesEditor`: minimal allowed addition. The docs say "every edit in the sidebar goes straight
// into agent state" but give no editor, so this plain form calls `onChange` for name and language.

// Data model the UI writes into agent state via agent.setState()
export interface Preferences {
  name: string;
  tone: "formal" | "casual" | "playful";
  language: string;
  interests: string[];
}

export function PreferencesEditor({
  value,
  onChange,
}: {
  value: Preferences;
  onChange: (next: Preferences) => void;
}) {
  return (
    <form>
      <label>
        Name{" "}
        <input
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
        />
      </label>{" "}
      <label>
        Language{" "}
        <select
          value={value.language}
          onChange={(e) => onChange({ ...value, language: e.target.value })}
        >
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
        </select>
      </label>
    </form>
  );
}
