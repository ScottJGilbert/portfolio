import Link from "next/link";
import { type NavItem } from "@/data/navigation";

type FooterColumnProps = {
  title: string;
  links: readonly NavItem[];
};

function isAbsoluteHttpUrl(href: string) {
  return /^https?:\/\//i.test(href);
}

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <section>
      <h2>{title}</h2>
      <ul className="mt-3 space-y-2">
        {links.map((link) => {
          const absoluteUrl = isAbsoluteHttpUrl(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                target={absoluteUrl ? "_blank" : undefined}
                rel={absoluteUrl ? "noreferrer noopener" : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
