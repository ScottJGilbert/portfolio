import Link from "next/link";
import type { HomeHeroContent } from "@/lib/site-content";

interface HeroSectionProps {
  content: HomeHeroContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section className="px-6 pb-20 pt-16 md:px-12 md:pb-24 md:pt-24" aria-labelledby="home-hero-heading">
      <div className="max-w-3xl space-y-8">
        <h1
          id="home-hero-heading"
          className="text-5xl font-extrabold leading-[1] tracking-tighter text-foreground md:text-[5rem] md:leading-[0.9]"
        >
          {content.title}
        </h1>
        <p className="max-w-2xl text-lg font-medium leading-relaxed text-muted md:text-2xl">
          {content.description}
        </p>
        <Link
          href="/about"
          className="inline-flex items-center justify-center gap-[var(--space-xs)] rounded-full border border-primary/25 bg-gradient-to-b from-primary to-primary-container px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground shadow-ambient transition-[filter] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {content.ctaLabel}
        </Link>
      </div>
    </section>
  );
}

