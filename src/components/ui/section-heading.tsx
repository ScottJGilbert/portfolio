import type { HTMLAttributes, ReactNode } from "react";

type HeadingLevel = "h1" | "h2" | "h3";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  eyebrow?: string;
  description?: string;
  action?: ReactNode;
  level?: HeadingLevel;
}

const titleClassName: Record<HeadingLevel, string> = {
  h1: "text-[length:var(--text-heading)] font-semibold tracking-tight",
  h2: "text-2xl font-bold tracking-tight",
  h3: "text-xl font-bold tracking-tight",
};

const joinClassNames = (...classNames: Array<string | undefined>) =>
  classNames.filter(Boolean).join(" ");

export function SectionHeading({
  action,
  className,
  description,
  eyebrow,
  level = "h2",
  title,
  ...props
}: SectionHeadingProps) {
  const TitleTag = level;

  return (
    <header
      className={joinClassNames(
        "flex flex-wrap items-end justify-between gap-[var(--space-md)]",
        className,
      )}
      {...props}
    >
      <div className="space-y-[var(--space-xs)]">
        {eyebrow ? (
          <p className="text-[length:var(--text-eyebrow)] font-bold uppercase tracking-[var(--tracking-eyebrow)] text-primary/80">
            {eyebrow}
          </p>
        ) : null}
        <TitleTag className={joinClassNames(titleClassName[level], "text-foreground")}>
          {title}
        </TitleTag>
        {description ? <p className="max-w-prose text-sm text-foreground/75">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}

