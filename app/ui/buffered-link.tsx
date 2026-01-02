"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";
import { ClassValue } from "clsx";
import { usePathname } from "next/navigation";
import { usePageLoading } from "../providers/loading-provider";

type BufferedLinkProps = {
  href: string;
  children?: ReactNode;
  minDelay?: number; // ms
  doOnClick?: () => void;
  className: ((...inputs: ClassValue[]) => string) | string;
  target?: string;
  rel?: string;
};

export default function BufferedLink({
  href,
  children,
  minDelay = 750,
  className: cl,
  doOnClick,
  target,
  rel,
}: BufferedLinkProps) {
  const router = useRouter();

  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    if (doOnClick && target !== "_blank") {
      e.preventDefault();

      if (href === pathname) {
        // If the link is to the current page, do nothing
        return;
      }

      const start = Date.now();

      // Begin animation here (e.g. show a page wipe, fade out, etc.)

      // Ensure navigation happens no sooner than minDelay
      const doNav = () => router.push(href);
      const elapsed = Date.now() - start;

      if (elapsed >= minDelay) {
        doNav();
      } else {
        setTimeout(doNav, minDelay - elapsed);
      }

      doOnClick?.();
    }
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={typeof cl === "string" ? cl : cl()}
      target={target}
      rel={rel}
    >
      {children}
    </Link>
  );
}

export function AnimatedLink({
  href,
  children,
  className,
  target,
  rel,
}: Partial<BufferedLinkProps>) {
  const { setIsLoading } = usePageLoading();

  return (
    <BufferedLink
      href={href || "/"}
      doOnClick={() => {
        setIsLoading(true);
      }}
      className={className || ""}
      target={target}
      rel={rel}
    >
      {children}
    </BufferedLink>
  );
}
