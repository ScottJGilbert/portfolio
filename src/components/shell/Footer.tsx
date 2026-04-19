import Link from "next/link";
import { utilityNav } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="p-6" role="contentinfo">
      <ul className="flex gap-4 flex-wrap">
        {utilityNav.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
