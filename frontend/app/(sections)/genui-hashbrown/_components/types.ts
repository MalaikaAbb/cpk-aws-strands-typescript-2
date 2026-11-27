// From the demo (src/app/demos/declarative-hashbrown/types.ts): hashbrown-renderer.tsx imports
// `SalesStage` from "./types", which the docs never give.
export type SalesStage =
  | "prospect"
  | "qualified"
  | "proposal"
  | "negotiation"
  | "closed-won"
  | "closed-lost";
