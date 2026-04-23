import { Card } from "@/components/ui/card";
import { contactPageContent } from "./content";

export default function ContactPage() {
  return (
    <section className="px-6 py-10 md:px-10 lg:px-12">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight">{contactPageContent.title}</h1>
          <p className="text-sm leading-7 text-muted">{contactPageContent.intro}</p>
        </header>

        <Card variant="surface" padding="lg" className="space-y-6">
          <form className="space-y-5" aria-describedby="contact-form-note">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm text-foreground">
                <span className="text-xs uppercase tracking-[0.14em] text-muted">Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-foreground"
                  placeholder="Your name"
                />
              </label>
              <label className="space-y-2 text-sm text-foreground">
                <span className="text-xs uppercase tracking-[0.14em] text-muted">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-foreground"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm text-foreground">
              <span className="text-xs uppercase tracking-[0.14em] text-muted">Message</span>
              <textarea
                name="message"
                required
                rows={6}
                className="w-full rounded-md border border-outline-ghost bg-surface-alt px-3 py-2 text-sm text-foreground"
                placeholder="Tell me a bit about what you’d like to discuss."
              />
            </label>

            <button
              type="button"
              className="inline-flex items-center rounded-md border border-outline-ghost bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Send Message (submission coming soon)
            </button>

            <p id="contact-form-note" className="text-xs uppercase tracking-[0.14em] text-muted">
              This form is currently static with no backend submission. For fastest response, use one
              of the direct channels below.
            </p>
          </form>
        </Card>

        <Card variant="surface" padding="lg" className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Direct Channels</h2>
          <ul className="space-y-2">
            {contactPageContent.directChannels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={channel.href.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  {channel.label}
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}
