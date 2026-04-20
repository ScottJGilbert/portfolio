import { Button } from "@/components/ui/button";
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
          className="text-5xl font-extrabold leading-[1] tracking-tight text-foreground md:text-[5rem] md:leading-[0.9]"
        >
          {content.title}
        </h1>
        <p className="max-w-2xl text-lg font-medium leading-relaxed text-muted md:text-2xl">
          {content.description}
        </p>
        <Button
          size="lg"
          className="rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] shadow-sm"
        >
          {content.ctaLabel}
        </Button>
      </div>
    </section>
  );
}

