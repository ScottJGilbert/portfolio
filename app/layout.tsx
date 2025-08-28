import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/general/header";
import Sidebar from "./components/general/sidebar";
import Footer from "./components/general/footer";
import { SessionProvider } from "next-auth/react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../lib/core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-x-hidden touch-pan-y`}
      >
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <main className="flex w-screen-xl mx-auto w-full">
          <SessionProvider>
            <Sidebar />
            <div className="min-h-screen mx-6 md:ml-2 md:mr-6 w-full flex flex-col justify-between">
              <div className="flex-1 min-h-screen">
                <Header />
                <div className="md:mb-0 mb-12">{children}</div>
              </div>
              <Footer />
            </div>
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
