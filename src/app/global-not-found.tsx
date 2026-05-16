// Import global styles and fonts
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { DesktopSidebar } from "@/components/site/desktop-sidebar";
import { MobileNav } from "@/components/site/mobile-nav";
import { TopActionBar } from "@/components/site/top-action-bar";
import { SiteFooter } from "@/components/site/site-footer";

import { siteShellContent } from "@/lib/site-content";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/next";
const { announcement, externalLinks, navItems, siteTagline, siteTitle } =
  siteShellContent;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen bg-background">
            <DesktopSidebar
              navItems={navItems}
              externalLinks={externalLinks}
              siteTitle={siteTitle}
              siteTagline={siteTagline}
            />
            <div className="flex min-h-screen min-w-0 flex-1 flex-col">
              <MobileNav
                navItems={navItems}
                externalLinks={externalLinks}
                siteTitle={siteTitle}
                siteTagline={siteTagline}
              />
              <TopActionBar announcement={announcement} />
              <main className="flex-1">
                <section className="mt-6 min-h-full relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-border/70 bg-card/80 p-10 text-center shadow-sm backdrop-blur sm:p-14">
                  <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
                  <p className="relative text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    404
                  </p>
                  <h1 className="relative mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Page not found
                  </h1>
                  <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
                    Sorry, we couldn&apos;t find the page you&apos;re looking
                    for.
                  </p>
                  <div className="relative mt-8 flex items-center justify-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                      href="/"
                      className="inline-flex items-center rounded-md border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                      Go back home
                    </a>
                  </div>
                </section>
              </main>
              <SiteFooter />
            </div>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
