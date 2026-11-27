// Minimal unstyled stand-ins for the shadcn Avatar/AvatarFallback that the docs' bubbles use
// but don't define.
import type React from "react";

export const Avatar = (p: React.ComponentProps<"div">) => <div {...p} />;
export const AvatarFallback = (p: React.ComponentProps<"div">) => <div {...p} />;
