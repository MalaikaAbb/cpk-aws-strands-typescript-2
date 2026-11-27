// Minimal `cn` (used by the docs' bubbles, not defined there): joins class names.
export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
