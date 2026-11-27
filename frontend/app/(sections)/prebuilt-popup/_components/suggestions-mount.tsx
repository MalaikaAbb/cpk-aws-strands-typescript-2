// Demo code: copied from showcase/integrations/strands-typescript/src/app/demos/prebuilt-popup/suggestions-mount.tsx.
// The docs render <Suggestions /> ("a demo component") without defining it.
"use client";

import { usePrebuiltPopupSuggestions } from "../_lib/suggestions";

export function Suggestions() {
  usePrebuiltPopupSuggestions();
  return null;
}
