import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@/components/ui/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://scottgilbert.dev",
  ),
  title: {
    default: "Scott Gilbert - Computer Engineer",
    template: "%s | Scott Gilbert",
  },
  description:
    "Full-stack developer, tinkerer, problem-solver, and computer engineering student at the University of Illinois Urbana-Champaign.",
  openGraph: {
    title: "Scott Gilbert - Computer Engineer",
    description:
      "Full-stack developer, tinkerer, problem-solver, and computer engineering student at the University of Illinois Urbana-Champaign.",
    url: "/",
    siteName: "Scott Gilbert Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Scott Gilbert Portfolio",
      },
    ],
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ThemeProvider>
          {children}
          <Analytics />
          <ToastContainer
            closeButton={false}
            hideProgressBar
            newestOnTop
            toastClassName="!bg-transparent !p-0 !shadow-none !mb-3 !overflow-visible"
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
