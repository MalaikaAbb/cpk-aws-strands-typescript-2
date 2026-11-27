// Minimal `AttachmentChip` (used by the docs' UserBubble, not defined there): shows the filename.
import type { Attachment } from "@copilotkit/shared";

export function AttachmentChip({ attachment }: { attachment: Attachment }) {
  return <span>{attachment.filename ?? "attachment"}</span>;
}
