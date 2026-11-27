"use client";
// Docs: voice -> "Driving the demo without a mic" (src/app/demos/voice/sample-audio-button.tsx).
// The component is verbatim from the docs.
// Added (needed to compile): the `SampleAudioButtonProps` type, used by the docs but not defined.

interface SampleAudioButtonProps {
  onTranscribed: (text: string) => void;
  sampleText: string;
}

export function SampleAudioButton({
  onTranscribed,
  sampleText,
}: SampleAudioButtonProps) {
  return (
    <button
      type="button"
      data-testid="voice-sample-audio-button"
      onClick={() => onTranscribed(sampleText)}
      title={`Inserts: "${sampleText}"`}
      className="inline-flex w-fit items-center gap-2 rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-medium hover:bg-black/5 dark:border-white/10 dark:bg-black/30 dark:hover:bg-white/10"
    >
      <span aria-hidden>🎙</span>
      <span>Try a sample audio</span>
    </button>
  );
}
