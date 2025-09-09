import type { Metadata } from "next";
import "./globals.css";
import "@mdxeditor/editor/style.css";
import Header from "./components/general/header";
import Sidebar from "./components/general/sidebar";
import Footer from "./components/general/footer";
import { SessionProvider } from "next-auth/react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../lib/core";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { PageLoadingProvider } from "@/providers/loading-provider";
import PageTransition from "./components/motion/page-transition";
// import Scroll from "./components/motion/scroll";

export const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://scott-gilbert.vercel.app"),
  title: {
    template: "%s | Scott Gilbert",
    default: "Scott Gilbert - Computer Engineer",
  },
  description:
    "Full-stack developer, tinkerer, problem-solver, and incoming computer engineering student at the University of Illinois Urbana-Champaign.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="n2DByM96BZf3uCqxJ3eF5kUp19e9aIjI5P4M2Pnl-Fs"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.theme;
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen w-screen overflow-x-hidden touch-pan-y`}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        {/* <Scroll> */}
        <main className="flex">
          <PageLoadingProvider>
            <SessionProvider>
              <Sidebar />
              <div className="flex-1">
                <div className="min-h-screen mx-6 md:ml-0 md:mr-6 flex flex-col justify-between">
                  <div className="flex-1 min-h-screen">
                    <Header />
                    <PageTransition>
                      <div>
                        <div className="h-32 md:h-0"></div>
                        <div className="md:mb-0 mb-12">{children}</div>
                      </div>
                    </PageTransition>
                  </div>
                  <Footer />
                </div>
              </div>
            </SessionProvider>
          </PageLoadingProvider>
        </main>
        {/* </Scroll> */}
        <Analytics />
      </body>
    </html>
  );
}
