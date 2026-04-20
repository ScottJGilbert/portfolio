import { ArrowRight, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/icon-button";
import { NavItem } from "@/components/ui/nav-item";
import { SectionHeading } from "@/components/ui/section-heading";

export default function SiteHomePage() {
  return (
    <section className="space-y-[var(--space-lg)] px-6 py-10 md:px-10 lg:px-12">
      <SectionHeading
        eyebrow="Task 3"
        title="UI primitive sandbox"
        description="Temporary usage to validate primitive APIs before homepage section assembly."
        level="h1"
        action={<Button variant="secondary">Inspect tokens</Button>}
      />

      <Card variant="surface" padding="lg" className="space-y-[var(--space-md)]">
        <p className="text-sm text-muted">Buttons, chips, cards, and nav items are now reusable.</p>
        <div className="flex flex-wrap gap-[var(--space-sm)]">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <IconButton icon={<Menu className="size-4" />} label="Open menu" variant="secondary" />
        </div>
        <div className="flex flex-wrap gap-[var(--space-xs)]">
          <Chip>Next.js</Chip>
          <Chip variant="accent">React</Chip>
          <Chip variant="outline">TypeScript</Chip>
        </div>
      </Card>

      <nav className="flex flex-wrap gap-[var(--space-xs)]" aria-label="Primitive nav preview">
        <NavItem href="/" active icon={<ArrowRight className="size-4" />}>
          Home
        </NavItem>
        <NavItem href="/work">Work</NavItem>
        <NavItem href="/journal">Journal</NavItem>
      </nav>
    </section>
  );
}
