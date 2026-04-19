import { ReactNode } from "react";
import { SkipLink } from "@/components/a11y/SkipLink";
import { DesktopSidebar } from "./DesktopSidebar";
import { Footer } from "./Footer";
import { MobileHeader } from "./MobileHeader";
import { ThemeToggle } from "./ThemeToggle";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[16rem_1fr]">
      <SkipLink />
      <DesktopSidebar />
      <div className="min-w-0">
        <MobileHeader />
        <div className="p-4">
          <ThemeToggle />
        </div>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
