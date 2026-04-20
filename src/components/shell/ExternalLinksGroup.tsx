import Link from "next/link";
import { type NavItem } from "@/data/navigation";

type ExternalLinksGroupProps = {
  ariaLabel: string;
  items: readonly NavItem[];
  listClassName?: string;
};

function isAbsoluteHttpUrl(href: string) {
  return /^https?:\/\//i.test(href);
}

export function ExternalLinksGroup({
  ariaLabel,
  items,
  listClassName = "space-y-3",
}: ExternalLinksGroupProps) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className={listClassName}>
        {items.map((item) => {
          const absoluteUrl = isAbsoluteHttpUrl(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                target={absoluteUrl ? "_blank" : undefined}
                rel={absoluteUrl ? "noreferrer noopener" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
