import { PageIntro } from "@/components/primitives/PageIntro";
import { SectionHeader } from "@/components/primitives/SectionHeader";

const sources = [
  {
    label: "Next.js Documentation",
    href: "https://nextjs.org/docs",
    note: "Routing, rendering, and deployment references for the application shell.",
  },
  {
    label: "Tailwind CSS Documentation",
    href: "https://tailwindcss.com/docs",
    note: "Utility and token guidance used to shape spacing, type rhythm, and layout behavior.",
  },
  {
    label: "Heroicons",
    href: "https://heroicons.com",
    note: "Icon set referenced for interface accents and supporting navigation glyphs.",
  },
] as const;

export default function AttributionsPage() {
  return (
    <div className="space-y-10 p-6">
      <PageIntro
        title="Attributions"
        summary="Canonical references and source material informing implementation and interface details."
      />
      <section className="space-y-4 rounded-3xl bg-[var(--surface-high)] p-5">
        <SectionHeader
          title="Primary Sources"
          subtitle="Each source is linked directly to preserve provenance and licensing clarity."
        />
        <ul className="list-disc space-y-3 pl-6">
          {sources.map((source) => (
            <li key={source.href} className="space-y-1">
              <a
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline decoration-[var(--brand-soft)] underline-offset-4"
              >
                {source.label}
              </a>
              <p className="text-sm opacity-80">{source.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
