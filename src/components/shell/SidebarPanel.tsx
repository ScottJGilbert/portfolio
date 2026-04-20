import { type ReactNode } from "react";

type SidebarPanelProps = {
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function SidebarPanel({ children, className, ...props }: SidebarPanelProps) {
  return (
    <aside className={className} {...props}>
      {children}
    </aside>
  );
}
