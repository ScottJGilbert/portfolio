import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BentoCardVariant = "feature" | "metric" | "quote";

export function BentoCard({
  title,
  variant = "feature",
  children,
}: {
  title: string;
  variant?: BentoCardVariant;
  children: ReactNode;
}) {
  const toneByVariant: Record<BentoCardVariant, string> = {
    feature: "bg-[var(--surface-high)]",
    metric: "bg-[var(--surface-low)]",
    quote: "bg-[var(--accent)]",
  };

  return (
    <article className={cn("rounded-3xl p-6", toneByVariant[variant])}>
      <h3 className={cn("text-xl font-semibold", variant === "quote" && "text-lg")}>
        {title}
      </h3>
      <div className={cn("mt-3", variant === "quote" && "italic")}>{children}</div>
    </article>
  );
}
