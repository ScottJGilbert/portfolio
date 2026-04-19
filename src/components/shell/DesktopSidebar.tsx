import Link from "next/link";
import { coreNav } from "@/data/navigation";

export function DesktopSidebar() {
  return (
    <aside className="hidden md:block w-64 p-6" aria-label="Desktop Navigation">
      <nav aria-label="Desktop Navigation">
        <ul className="space-y-3">
          {coreNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
