import React from 'react';
import { TonalSurface } from '@/components/ui/TonalSurface';

export default function LegalPage() {
  return (
    <TonalSurface tier="low" className="min-h-screen py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12">
          <h1 className="text-display-lg font-display text-primary text-4xl mb-4 tracking-tight">
            Legal & Privacy
          </h1>
          <p className="text-body-md text-on-surface/60">
            Last updated: April 19, 2026
          </p>
        </header>

        <div className="flex flex-col gap-8 text-on-surface/80 leading-[1.6]">
          <section>
            <h2 className="text-xl font-display text-primary font-bold mb-3">Privacy Policy</h2>
            <p className="mb-4">
              This portfolio is a static showcase of work. I do not track users,
              install cookies, or collect personal data through this site.
              Your visit is anonymous and private.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-primary font-bold mb-3">Terms of Use</h2>
            <p className="mb-4">
              All content, designs, and code showcased here are the intellectual
              property of the author unless otherwise specified. You are
              welcome to browse and inquire, but reproduction of the visual
              identity without permission is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display text-primary font-bold mb-3">Contact</h2>
            <p>
              For legal inquiries or requests regarding the content of this site,
              please reach out via the primary contact methods provided in the
              navigation sidebar.
            </p>
          </section>
        </div>
      </div>
    </TonalSurface>
  );
}
