import { ReactNode } from "react";

export function BentoCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-3xl p-6 bg-[var(--surface-high)]">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </article>
  );
}
