"use client";

import Navbar from "./nav-bar";
import Externalsbar from "./externals-bar";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Fade } from "../motion/transitions";
import { usePageLoading } from "@/app/providers/loading-provider";
import BufferedLink from "@/app/ui/buffered-link";
import AccountComponent from "./account";

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);
  const { setIsLoading } = usePageLoading();

  useEffect(() => {
    setTimeout(function (): void {
      setIsVisible(true);
    }, 100);
  }, []);

  return (
    <div
      className={`h-screen flex sticky top-0 transform transition-transform duration-700 ease-out ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Fade>
        <div className="hidden h-[calc(100vh-2rem)] flex-col items-stretch m-4 px-4 bg-gradient-to-br from-green-300 to-green-100 dark:from-green-950 dark:to-green-900 rounded-4xl border-1 border-[var(--border)] md:flex">
          <div className="h-full flex flex-col items-stretch justify-start">
            <div className="flex-grow max-h-8 min-h-3" />
            <BufferedLink
              doOnClick={() => {
                setIsLoading(true);
              }}
              href="/"
              className="px-4"
            >
              <motion.div
                initial={{ scale: 1 }} // Initial state
                whileHover={{ scale: 1.05 }} // Scale up on hover
                whileTap={{ scale: 0.95 }} // Scale down on tap/click
                transition={{ type: "spring", stiffness: 300, damping: 20 }} // Spring animation settings
              >
                <h3 className="text-center">Scott Gilbert</h3>
              </motion.div>
            </BufferedLink>
            <div className="flex-grow max-h-8 min-h-1" />
            <Navbar />
            <div className="flex-grow max-h-8" />
            <Externalsbar />
            <div className="flex-grow max-h-8" />
            <AccountComponent />
            <div className="flex-grow max-h-8 min-h-4" />
          </div>
        </div>
      </Fade>
    </div>
  );
}
