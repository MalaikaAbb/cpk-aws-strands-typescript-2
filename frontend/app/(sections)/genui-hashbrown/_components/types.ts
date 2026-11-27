// Copied from the demo (src/app/demos/declarative-hashbrown/types.ts): hashbrown-renderer.tsx imports `SalesStage` from "./types", which the docs never give.
export const SALES_STAGES = [
  "prospect",
  "qualified",
  "proposal",
  "negotiation",
  "closed-won",
  "closed-lost",
] as const;

export type SalesStage = (typeof SALES_STAGES)[number];
