import { ReactNode } from "react";

export function TagChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full px-3 py-1 text-xs bg-[var(--surface-low)]">
      {children}
    </span>
  );
}
