"use client";

import Navbar from "./nav-bar";
import Contactbar from "./externals-bar";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Fade } from "../motion/transitions";
import { usePageLoading } from "@/providers/loading-provider";
import BufferedLink from "@/app/ui/buffered-link";

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
        <div className="hidden flex-col gap-2 m-4 px-4 py-4 bg-gradient-to-br from-green-300 to-green-100 dark:from-green-950 dark:to-green-900 rounded-4xl border-1 border-[var(--border)] md:flex">
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
              <Image
                src="/profileIcon.svg"
                alt="Profile Icon"
                width={730}
                height={530}
                className="block h-16 w-22 mx-auto"
              />
            </motion.div>
          </BufferedLink>
          <Navbar />
          <Contactbar />
        </div>
      </Fade>
    </div>
  );
}
