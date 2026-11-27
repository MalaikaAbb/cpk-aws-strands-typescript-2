"use client";
// Docs: human-in-the-loop/headless -> "Subscribe to the interrupt yourself"
// (src/app/demos/interrupt-headless/page.tsx). "use client" added.
// Adaptations: runtimeUrl -> /api/copilotkit/hitl-headless; agent / agentId "interrupt-headless"
// -> "hitl-headless"; "../_shared/interrupt-fallback-slots" -> "./_lib/interrupt-fallback-slots".
// <CopilotKit> stays in the page, as in the docs.
// The docs use `AppSurface` and `TimeSlotPopup` without defining them: minimal unstyled versions
// are added below the docs snippet.
// Removed from the docs snippet: the useConfigureSuggestions call + import.
import React, { useEffect, useState } from "react";
import {
  CopilotKit,
  CopilotChat,
  useInterrupt,
} from "@copilotkit/react-core/v2";
import { generateFallbackSlots } from "./_lib/interrupt-fallback-slots";
import type { TimeSlot } from "./_lib/interrupt-fallback-slots";

type InterruptPayload = {
  topic?: string;
  attendee?: string;
  slots?: TimeSlot[];
};

// Read the tool's `interrupt()` reason off an AG-UI interrupt.
//
// The two bridges expose it on different channels: `ag_ui_strands` (Python)
// carries the reason object under `metadata.reason`, while the published
// `@ag-ui/aws-strands` 0.2.3 JSON-encodes it into `message` instead. Both are
// read so one page serves both, and the legacy event value is read last for
// adapters that pass the payload through unwrapped.
/**
 * JSON.parse that never throws and never returns a primitive. Both readers run
 * inside a React render callback, where a throw takes the whole pane down.
 */
function parseObject(raw: string | undefined): Record<string, unknown> | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function readInterruptPayload(
  interrupt: { metadata?: unknown; message?: string } | null | undefined,
  eventValue: unknown,
): InterruptPayload {
  const metadata = interrupt?.metadata as
    | { reason?: InterruptPayload }
    | undefined;
  if (metadata?.reason && typeof metadata.reason === "object") {
    return metadata.reason;
  }

  // The published TypeScript bridge JSON-encodes the reason into `message`
  // instead of carrying it on metadata.
  const decoded = parseObject(interrupt?.message);
  if (decoded) {
    const nested = (decoded as { reason?: InterruptPayload }).reason;
    return nested && typeof nested === "object"
      ? nested
      : (decoded as InterruptPayload);
  }

  // Legacy channel: some adapters pass the payload through as the event value,
  // JSON-encoded or not.
  const legacy =
    typeof eventValue === "string" ? parseObject(eventValue) : eventValue;
  if (!legacy || typeof legacy !== "object") return {};
  const wrapped = (legacy as { metadata?: { reason?: InterruptPayload } })
    .metadata?.reason;
  if (wrapped && typeof wrapped === "object") return wrapped;
  return legacy as InterruptPayload;
}

export default function InterruptHeadlessDemo() {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit/hitl-headless" agent="hitl-headless">
      <Layout />
    </CopilotKit>
  );
}

function Layout() {
  const [resolving, setResolving] = useState(false);
  const interruptElement = useInterrupt({
    agentId: "hitl-headless",
    renderInChat: false,
    render: ({ event, interrupt, resolve }) => {
      const payload = readInterruptPayload(interrupt, event.value);
      const resumeAfterPaint = (response: unknown) => {
        setResolving(true);
        // A frame boundary lets React paint before resume unmounts the
        // interrupt, but `requestAnimationFrame` never fires in a background
        // tab, so a timer runs whichever comes first and the resume cannot be
        // stranded. Fire-and-forget by design: a rejected resume is re-surfaced
        // globally instead of disappearing.
        let fired = false;
        const resumeOnce = () => {
          if (fired) return;
          fired = true;
          void resolve(response).then(
            () => setResolving(false),
            (error) => {
              setResolving(false);
              queueMicrotask(() => {
                throw error;
              });
            },
          );
        };
        requestAnimationFrame(resumeOnce);
        window.setTimeout(resumeOnce, 100);
      };
      return (
        <TimeSlotPopup
          payload={payload}
          onPick={(slot) => {
            resumeAfterPaint({
              chosen_time: slot.iso,
              chosen_label: slot.label,
            });
          }}
          onCancel={() => {
            resumeAfterPaint({ cancelled: true });
          }}
        />
      );
    },
  });

  useEffect(() => {
    if (interruptElement) {
      setResolving(false);
    }
  }, [interruptElement]);

  return (
    <div className="grid h-screen grid-cols-[1fr_420px] bg-[#FAFAFC] dark:bg-background">
      <AppSurface interruptElement={interruptElement} resolving={resolving} />
      <div className="border-l border-[#DBDBE5] bg-white dark:border-border dark:bg-background">
        <CopilotChat agentId="hitl-headless" className="h-full" />
      </div>
    </div>
  );
}

// --- end of docs snippet ---

// Where the docs place the interrupt element: outside the chat.
function AppSurface({
  interruptElement,
  resolving,
}: {
  interruptElement: React.ReactElement | null;
  resolving: boolean;
}) {
  return <div>{interruptElement ?? (resolving ? "Confirming…" : null)}</div>;
}

// The picker the docs' render callback returns.
function TimeSlotPopup({
  payload,
  onPick,
  onCancel,
}: {
  payload: InterruptPayload;
  onPick: (slot: TimeSlot) => void;
  onCancel: () => void;
}) {
  const slots =
    payload.slots && payload.slots.length > 0 ? payload.slots : generateFallbackSlots();
  return (
    <div>
      <p>
        {payload.topic ?? "Meeting"}
        {payload.attendee && ` with ${payload.attendee}`}
      </p>
      {slots.map((slot) => (
        <button key={slot.iso} onClick={() => onPick(slot)}>
          {slot.label}
        </button>
      ))}
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
