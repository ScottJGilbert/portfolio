"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const TypeWriter = dynamic(() => import("typewriter-effect"), { ssr: false });

export interface HomeHeroContent {
  title: string;
  description: string;
  typewriterPhrases: string[];
  ctaLabel: string;
}

export function HeroSection({ content }: { content: HomeHeroContent }) {
  return (
    <section
      className="px-6 pb-20 pt-16 md:px-12 md:pb-24 md:pt-24"
      aria-labelledby="home-hero-heading"
    >
      <div className="max-w-3xl space-y-8">
        <h1
          id="home-hero-heading"
          className="text-5xl font-extrabold leading-none tracking-tighter text-foreground md:text-[5rem] md:leading-[0.9]"
        >
          {content.title}
        </h1>
        <span className="max-w-2xl text-lg font-medium leading-relaxed text-muted md:text-2xl">
          <TypeWriter
            options={{
              strings: content.typewriterPhrases,
              autoStart: true,
              loop: true,
            }}
          />
        </span>
        <p className="max-w-2xl text-lg font-medium leading-relaxed text-muted md:text-2xl">
          {content.description}
        </p>
        <Link
          href="/about"
          className="bg-surface-alt group relative inline-flex items-center justify-center gap-(--space-xs) rounded-full border border-primary/25 px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-primary-foreground shadow-ambient overflow-hidden transform transition duration-300 ease-out hover:scale-105 hover:brightness-105 active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {/* subtle animated gradient overlay on hover */}
          <span className="absolute inset-0 bg-linear-to-r from-primary/20 via-transparent to-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
          <span className="relative z-10">{content.ctaLabel}</span>
        </Link>
      </div>
    </section>
  );
}
