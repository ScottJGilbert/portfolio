import Link from "next/link";
import { type NavItem } from "@/data/navigation";

type SidebarNavGroupProps = {
  ariaLabel: string;
  items: readonly NavItem[];
  listClassName?: string;
};

export function SidebarNavGroup({
  ariaLabel,
  items,
  listClassName = "space-y-3",
}: SidebarNavGroupProps) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className={listClassName}>
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
