import React from 'react';
import { TonalSurface } from '@/components/ui/TonalSurface';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <TonalSurface tier="base" className="min-h-screen">
      <div className="flex flex-col items-center w-full">

        {/* Hero Section */}
        <section className="w-full max-w-4xl px-6 py-16 md:py-24 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary mb-8 leading-[1.1]">
            Curating the intersection of <br />
            <span className="text-primary-container">structure and organicism.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface/80 max-w-2xl leading-relaxed font-medium">
            I am a designer and engineer focused on creating digital environments that feel atmospheric, intentional, and deeply rooted in a cohesive visual language.
          </p>
        </section>

        {/* Full-width Image 1 */}
        <div className="w-full relative h-[60vh] md:h-[80vh] overflow-hidden">
          <Image
            src="/api/placeholder/1600/900"
            alt="Atmospheric architectural detail"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Narrative Section 1 */}
        <section className="w-full max-w-2xl px-6 py-16 md:py-24 flex flex-col items-center text-center">
          <div className="space-y-6 text-on-surface/90 text-lg md:text-xl leading-relaxed">
            <p>
              My approach to the web is an exercise in <span className="text-primary font-semibold">Organic Brutalism</span>.
              It is the belief that structural honesty—the raw, unadorned layout—can be balanced with a lush,
              atmospheric sensibility.
            </p>
            <p>
              By removing the noise of traditional "app" patterns—the endless borders, the pure greys,
              the sterile grids—we can create spaces that invite a slower, more editorial form of engagement.
            </p>
          </div>
        </section>

        {/* Full-width Image 2 */}
        <div className="w-full relative h-[60vh] md:h-[80vh] overflow-hidden">
          <Image
            src="/api/placeholder/1600/900"
            alt="Organic texture contrast"
            fill
            className="object-cover"
          />
        </div>

        {/* Narrative Section 2 */}
        <section className="w-full max-w-2xl px-6 py-16 md:py-24 flex flex-col items-center text-center">
          <div className="space-y-6 text-on-surface/90 text-lg md:text-xl leading-relaxed">
            <p>
              This philosophy extends beyond aesthetics. It is about the <span className="text-primary font-semibold">curation of attention</span>.
              In an era of hyper-optimization, the most luxurious thing we can provide a user is breathing room.
            </p>
            <p>
              Generous whitespace, thoughtful typographic hierarchies, and tonal depth are not just stylistic choices—they are
              functional tools used to guide the eye and calm the mind.
            </p>
          </div>
        </section>

        {/* Tonal Shift Section */}
        <TonalSurface tier="low" className="w-full py-16 md:py-24 px-6 flex flex-col items-center text-center">
          <div className="max-w-2xl space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              The Toolkit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Philosophy</span>
                <p className="text-on-surface/80">Tonal depth over borders. Organic rhythms over rigid grids.</p>
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Medium</span>
                <p className="text-on-surface/80">Next.js 16, Tailwind 4, and a commitment to high-end editorial standards.</p>
              </div>
            </div>
          </div>
        </TonalSurface>

        {/* Final Image */}
        <div className="w-full relative h-[60vh] md:h-[80vh] overflow-hidden">
          <Image
            src="/api/placeholder/1600/900"
            alt="Minimalist workspace"
            fill
            className="object-cover"
          />
        </div>

        {/* Footer Closing */}
        <section className="w-full max-w-2xl px-6 py-16 md:py-24 flex flex-col items-center text-center">
          <p className="text-on-surface/60 italic text-lg">
            Seeking the balance between the engineered and the ephemeral.
          </p>
        </section>
      </div>
    </TonalSurface>
  );
}
