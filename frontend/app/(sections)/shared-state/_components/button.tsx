// Minimal unstyled stand-in for the Button the docs' notes-card.tsx imports.
import type { ButtonHTMLAttributes } from "react";

export const Button = ({
  variant: _variant,
  size: _size,
  ...p
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string }) => <button {...p} />;
