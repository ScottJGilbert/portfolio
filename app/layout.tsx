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
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen w-screen overflow-x-hidden touch-pan-y`}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <main className="flex">
          <SessionProvider>
            <Sidebar />
            <div className="flex-1">
              <div className="min-h-screen mx-6 md:ml-0 md:mr-6 flex flex-col justify-between">
                <div className="flex-1 min-h-screen">
                  <Header />
                  <div className="h-32 md:h-0"></div>
                  <div className="md:mb-0 mb-12">{children}</div>
                </div>
                <Footer />
              </div>
            </div>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
