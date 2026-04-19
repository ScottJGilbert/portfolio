import React from "react";
import { BentoCard } from "@/components/ui/BentoCard";
import { PillButton } from "@/components/ui/PillButton";
import { EditorialChip } from "@/components/ui/EditorialChip";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface font-sans text-on-surface selection:bg-primary/20">
      <main className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        {/* The Assortment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(200px,auto)]">

          {/* Hero Introduction - Wide & Tall */}
          <BentoCard
            className="md:col-span-3 md:row-span-2 p-8 md:p-12 flex flex-col justify-end min-h-[400px]"
            initialTier="high"
          >
            <div className="space-y-6 max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.9] text-on-surface">
                Curating digital <br />
                <span className="text-primary">experiences</span> through organic brutalism.
              </h1>
              <p className="text-lg md:text-xl text-on-surface/70 max-w-md font-medium leading-relaxed">
                A synthesis of raw structural engineering and lush organicism.
                Designing systems that feel atmospheric, editorial, and human.
              </p>
              <div className="pt-4">
                <PillButton>Explore Work</PillButton>
              </div>
            </div>
          </BentoCard>

          {/* Profile/Status - Small Square */}
          <BentoCard
            className="md:col-span-1 p-8 flex flex-col justify-between"
            initialTier="low"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest opacity-60">Available for work</span>
            </div>
            <div className="mt-8">
              <p className="text-2xl font-bold leading-tight">Based in <br />Brooklyn, NY</p>
            </div>
          </BentoCard>

          {/* Featured Skill - Tall */}
          <BentoCard
            className="md:col-span-1 md:row-span-2 p-8 flex flex-col justify-between"
            initialTier="high"
          >
            <div className="space-y-4">
              <EditorialChip>Core Focus</EditorialChip>
              <h3 className="text-3xl font-bold tracking-tight">System Design</h3>
            </div>
            <p className="text-on-surface/70 text-sm leading-relaxed">
              Building scalable design languages that bridge the gap between rigid logic and fluid aesthetics.
            </p>
          </BentoCard>

          {/* Toolset - Wide */}
          <BentoCard
            className="md:col-span-2 p-8 flex flex-col justify-between"
            initialTier="low"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold tracking-tight">The Toolset</h3>
              <EditorialChip>2026 Stack</EditorialChip>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {["Next.js 16", "Tailwind 4", "TypeScript", "Radix UI", "Framer Motion", "PostgreSQL"].map((tool) => (
                <EditorialChip key={tool} className="text-[10px] uppercase tracking-wider">
                  {tool}
                </EditorialChip>
              ))}
            </div>
          </BentoCard>

          {/* Call to Action - Wide & Asymmetrical Offset */}
          <BentoCard
            className="md:col-span-2 p-8 flex items-center gap-8 group-hover:translate-x-2 transition-transform duration-300"
            initialTier="highest"
          >
            <div className="flex-1 space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">Let&apos;s build something atmospheric.</h3>
              <p className="text-on-surface/60 text-sm">Currently accepting select projects for Q3 2026.</p>
            </div>
            <PillButton variant="secondary">Get in touch</PillButton>
          </BentoCard>

          {/* Philosophy - Small Square */}
          <BentoCard
            className="md:col-span-1 p-8 flex flex-col justify-center items-center text-center space-y-4"
            initialTier="high"
          >
            <span className="text-4xl">🌿</span>
            <p className="text-sm font-medium italic opacity-80">&quot;Structure is the canvas, organicism is the soul.&quot;</p>
          </BentoCard>

          {/* Journal Teaser - Small Square */}
          <BentoCard
            className="md:col-span-1 p-8 flex flex-col justify-between"
            initialTier="low"
          >
            <EditorialChip>Journal</EditorialChip>
            <div className="mt-4">
              <p className="font-bold text-lg leading-tight">Thoughts on Tonal Surfaces</p>
              <div className="mt-2 flex items-center gap-2 text-xs opacity-60">
                <span>Apr 19, 2026</span>
                <span>•</span>
                <span>5 min read</span>
              </div>
            </div>
          </BentoCard>
        </div>
      </main>
    </div>
  );
}
