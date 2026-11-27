// Minimal unstyled stand-ins for the Card parts the docs' notes-card.tsx imports.
import type { HTMLAttributes } from "react";

type P = HTMLAttributes<HTMLElement>;
export const Card = (p: P) => <div {...p} />;
export const CardHeader = (p: P) => <div {...p} />;
export const CardTitle = (p: P) => <h3 {...p} />;
export const CardDescription = (p: P) => <p {...p} />;
export const CardContent = (p: P) => <div {...p} />;
