import { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SocialLinkChipProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label: string;
  sublabel?: string;
};

export function SocialLinkChip({
  label,
  sublabel,
  className,
  rel,
  target,
  ...props
}: SocialLinkChipProps) {
  const secureRel =
    target === "_blank"
      ? (() => {
          const relTokens = (rel ?? "").split(/\s+/).filter(Boolean);
          const normalizedTokens = new Set(relTokens.map((token) => token.toLowerCase()));

          if (!normalizedTokens.has("noopener")) {
            relTokens.push("noopener");
          }
          if (!normalizedTokens.has("noreferrer")) {
            relTokens.push("noreferrer");
          }

          return relTokens.join(" ");
        })()
      : rel;

  return (
    <a
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-[var(--surface-low)] px-3 py-1 text-xs no-underline transition hover:bg-[var(--accent)]",
        className
      )}
      rel={secureRel}
      target={target}
      {...props}
    >
      <span>{label}</span>
      {sublabel ? <span className="opacity-70">{sublabel}</span> : null}
    </a>
  );
}
