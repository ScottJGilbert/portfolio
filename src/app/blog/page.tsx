import React from 'react';
import { TonalSurface } from '@/components/ui/TonalSurface';
import { EditorialChip } from '@/components/ui/EditorialChip';
import { cn } from '@/lib/utils';

interface BlogPost {
  title: string;
  summary: string;
  date: string;
  category: string;
  slug: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    title: "The Architecture of Silence",
    summary: "Exploring the intersection of minimalist design and cognitive load in the modern digital era. How we can curate spaces that allow for deep thought and focused contemplation.",
    date: "Apr 12, 2026",
    category: "Design Theory",
    slug: "architecture-of-silence",
  },
  {
    title: "Digital Curation as an Art Form",
    summary: "Moving beyond the aggregate: why the act of selection is the most critical part of the creative process in a world of infinite information.",
    date: "Mar 28, 2026",
    category: "Curation",
    slug: "digital-curation-art",
  },
  {
    title: "Organic Brutalism: A Manifesto",
    summary: "Bridging the gap between the raw structural honesty of brutalism and the fluid, adaptive nature of organic systems. A new visual language for the web.",
    date: "Feb 15, 2026",
    category: "Visual Identity",
    slug: "organic-brutalism-manifesto",
  },
];

export default function BlogPage() {
  return (
    <TonalSurface tier="base" className="min-h-screen py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <header className="mb-24">
          <h1 className="text-display-lg font-display text-primary text-5xl md:text-6xl mb-6 tracking-tight">
            Reading Room
          </h1>
          <p className="text-body-md text-on-surface/70 text-lg leading-relaxed max-w-2xl">
            A collection of essays on design, curation, and the philosophy of digital spaces.
            Slow reads for a fast-paced world.
          </p>
        </header>

        <div className="flex flex-col gap-24">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="group cursor-pointer">
              <div className="flex flex-wrap gap-2 mb-4">
                <EditorialChip className="opacity-80 group-hover:opacity-100 transition-opacity">
                  {post.category}
                </EditorialChip>
                <span className="text-xs font-medium tracking-widest uppercase text-on-surface/50 self-center ml-2">
                  {post.date}
                </span>
              </div>

              <h2 className="text-display-lg font-display text-primary text-3xl md:text-4xl mb-4 group-hover:text-primary-container transition-colors">
                {post.title}
              </h2>

              <p className="text-body-md text-on-surface/80 text-lg leading-[1.6] mb-6">
                {post.summary}
              </p>

              <div className="inline-flex items-center text-primary font-semibold text-sm tracking-tight group-hover:gap-2 transition-all">
                Read Essay
                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </TonalSurface>
  );
}
