import Image from "next/image";

const STOPWORDS = new Set(["of", "the", "and", "&", "for", "at", "in"]);

export function getInitials(name: string, max = 3): string {
  const words = name
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0 && !STOPWORDS.has(word.toLowerCase()));

  if (words.length === 0) return name.slice(0, max).toUpperCase();

  return words
    .slice(0, max)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export interface OrgLogoProps {
  src?: string;
  alt: string;
  initials: string;
  size?: number;
  className?: string;
}

export function OrgLogo({
  src,
  alt,
  initials,
  size = 48,
  className,
}: OrgLogoProps) {
  const boxClassName = `shrink-0 rounded-lg border border-border bg-surface object-contain text-center ${className ?? ""}`;

  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className={boxClassName}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-surface-alt text-xs font-semibold uppercase tracking-[0.04em] text-muted text-ce ${boxClassName}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
