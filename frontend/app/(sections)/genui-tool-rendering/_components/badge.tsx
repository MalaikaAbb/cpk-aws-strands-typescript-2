// Minimal unstyled stand-in for the shadcn Badge the docs' custom-catchall-renderer.tsx imports.
import type { HTMLAttributes } from "react";

export const Badge = ({ variant: _variant, ...p }: HTMLAttributes<HTMLElement> & { variant?: string }) => (
  <span {...p} />
);
