import { TechStackElement } from "@/lib/tech-stack";

/*
 * Background/border/text here are intentionally fixed hex values, not the
 * theme's --surface/--foreground tokens: badge icons are drawn in their own
 * literal brand colors (many of them near-black, e.g. GitHub/Vercel/Next.js),
 * so the badge needs one constant light backdrop that keeps those icons
 * legible in both light and dark mode, rather than flipping to a dark
 * backdrop in dark mode. It's also a single flat color (no separate icon-well
 * shade) so there's no seam fighting the pill's rounded border.
 */
export default function TechStackComponent({
  element,
}: {
  element: TechStackElement;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[rgba(71,104,82,0.22)] bg-[#e1f0dc] px-1.5 py-1">
      <element.icon
        className="size-3.5 shrink-0"
        color={element.color}
        aria-hidden="true"
      />
      <span className="text-sm text-[#202b23]">{element.name}</span>
    </span>
  );
}
