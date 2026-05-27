import type { ReactNode } from "react";
import { DesktopSidebar } from "@/components/site/desktop-sidebar";
import { MobileNav } from "@/components/site/mobile-nav";
import { TopActionBar } from "@/components/site/top-action-bar";
import { siteShellContent } from "@/lib/site-content";
import { SiteFooter } from "@/components/site/site-footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const {
    announcement,
    externalLinks,
    promiseLink,
    navItems,
    siteTagline,
    siteTitle,
  } = siteShellContent;

  return (
    <div className="flex min-h-screen bg-background">
      <DesktopSidebar
        navItems={navItems}
        externalLinks={externalLinks}
        promiseLink={promiseLink}
        siteTitle={siteTitle}
        siteTagline={siteTagline}
      />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <MobileNav
          navItems={navItems}
          externalLinks={externalLinks}
          promiseLink={promiseLink}
          siteTitle={siteTitle}
          siteTagline={siteTagline}
        />
        <TopActionBar announcement={announcement} />
        <main className="max-w-7xl flex-1 pt-8 md:px-12 md:pt-12 md:mx-auto">
          {children}
          <SiteFooter />
        </main>
      </div>
    </div>
  );
}
