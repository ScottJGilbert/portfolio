import { Card } from "@/components/ui/card";
import { contactPageContent } from "./content";
import ContactForm from "./components/contact-form";

export { metadata } from "./content";

export default function ContactPage() {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {contactPageContent.title}
          </h1>
          <p className="text-sm leading-7 text-muted">
            {contactPageContent.intro}
          </p>
        </header>

        <Card
          variant="surface"
          padding="lg"
          className="space-y-5 border border-outline-ghost/70 bg-surface/90 shadow-sm ring-1 ring-black/5 backdrop-blur-sm"
        >
          <div className="space-y-2">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
              Recommended first
            </div>
            <h2 className="mt-2 text-lg font-semibold tracking-tight">
              Direct Channels
            </h2>
            <p className="text-sm leading-6 text-muted">
              For the quickest response, reach out through one of these direct
              channels before using the form.
            </p>
          </div>
          <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {contactPageContent.directChannels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target={
                    channel.href.startsWith("mailto:") ? undefined : "_blank"
                  }
                  rel={
                    channel.href.startsWith("mailto:")
                      ? undefined
                      : "noreferrer"
                  }
                  className="flex items-center gap-2 rounded-md border border-outline-ghost bg-surface-alt/70 px-3 py-2 text-sm font-medium text-primary transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary/80"
                >
                  <channel.icon
                    className="size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  {channel.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>

        <Card variant="surface" padding="lg" className="space-y-6">
          <ContactForm />
        </Card>
      </div>
    </section>
  );
}
