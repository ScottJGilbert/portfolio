import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./ui/globals.css";
import Header from "./ui/header";
import Sidebar from "./ui/sidebar";
import Footer from "./ui/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scott Gilbert - Portfolio",
  description:
    "Hard-working full-stack developer, tinkerer, and incoming computer engineering student at the University of Illinois at Urbana-Champaign. Dedicated to deploying information technology, computing, and electrical engineering solutions to solve complex problems.",
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
        <div className="flex w-screen-xl mx-auto w-full">
          <Sidebar />
          <div className="min-h-screen mx-4 w-full flex flex-col justify-between">
            <div>
              <Header />
              {children}
            </div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
