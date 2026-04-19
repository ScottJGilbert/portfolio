import Link from "next/link";
import { coreNav } from "@/data/navigation";

export function MobileHeader() {
  return (
    <header className="md:hidden p-4" aria-label="Mobile Navigation">
      <nav aria-label="Mobile Navigation">
        <ul className="flex gap-4">
          {coreNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
