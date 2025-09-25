// components/mdx/a.tsx
"use client";

import BufferedLink from "@/app/ui/buffered-link";
import { usePageLoading } from "@/app/providers/loading-provider";

function isNavigatingToLocalPage(href: string): boolean {
  return (
    (href.startsWith("/") &&
      !href.startsWith("//") &&
      !href.startsWith("/api")) ||
    href.startsWith("https://scott-gilbert.vercel.app/")
  );
}

export default function MdxLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>
) {
  const { setIsLoading } = usePageLoading();

  return (
    <BufferedLink
      {...props}
      doOnClick={() => {
        if (isNavigatingToLocalPage(props.href || "")) {
          setIsLoading(true);
        }
      }}
      href={props.href || ""}
      className="text-blue-500 dark:text-blue-300 hover:text-blue-400"
      target={
        props.target ||
        (!isNavigatingToLocalPage(props.href || "") ? "_blank" : "_self")
      }
      rel={
        props.target === "_blank" || !isNavigatingToLocalPage(props.href || "")
          ? "noopener noreferrer"
          : undefined
      }
    />
  );
}
