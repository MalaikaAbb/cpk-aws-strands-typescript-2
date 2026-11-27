// Minimal `ActivityWrapper` (used by the docs' MessageList, not defined there).
import type React from "react";

export function ActivityWrapper({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
