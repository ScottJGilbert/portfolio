import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export interface NavItemProps
  extends
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    Pick<LinkProps, "href" | "prefetch" | "replace" | "scroll"> {
  active?: boolean;
  icon?: ReactNode;
  useAnchor?: boolean;
}

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

export function NavItem({
  active = false,
  children,
  className,
  href,
  icon,
  prefetch,
  replace,
  scroll,
  useAnchor = false,
  ...props
}: NavItemProps) {
  return (
    <>
      {useAnchor ? (
        <a
          href={href as string}
          aria-current={active ? "page" : undefined}
          className={joinClassNames(
            "inline-flex items-center gap-(--space-sm) rounded-lg px-(--space-xs) py-(--space-xs) text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            active
              ? "bg-primary-container/70 font-semibold text-primary"
              : "text-muted hover:bg-surface-alt/75 hover:text-foreground/90",
            className,
          )}
          {...props}
        >
          {icon ? <span aria-hidden>{icon}</span> : null}
          <span>{children}</span>
        </a>
      ) : (
        <Link
          href={href}
          prefetch={prefetch}
          replace={replace}
          scroll={scroll}
          aria-current={active ? "page" : undefined}
          className={joinClassNames(
            "inline-flex items-center gap-(--space-sm) rounded-lg px-(--space-xs) py-(--space-xs) text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            active
              ? "bg-primary-container/70 font-semibold text-primary"
              : "text-muted hover:bg-surface-alt/75 hover:text-foreground/90",
            className,
          )}
          {...props}
        >
          {icon ? <span aria-hidden>{icon}</span> : null}
          <span>{children}</span>
        </Link>
      )}
    </>
  );
}
