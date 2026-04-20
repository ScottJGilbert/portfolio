import type { ReactNode } from "react";
import { DesktopSidebar } from "@/components/site/desktop-sidebar";
import { MobileNav } from "@/components/site/mobile-nav";
import { TopActionBar } from "@/components/site/top-action-bar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <DesktopSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <MobileNav />
        <TopActionBar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
