// Demo code: copied from showcase/integrations/strands-typescript/src/app/demos/prebuilt-sidebar/suggestions-mount.tsx.
// The docs render <Suggestions /> ("a demo component") without defining it.
"use client";

import { usePrebuiltSidebarSuggestions } from "../_lib/suggestions";

export function Suggestions() {
  usePrebuiltSidebarSuggestions();
  return null;
}
