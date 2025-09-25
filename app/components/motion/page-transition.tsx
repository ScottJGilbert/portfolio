"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { usePageLoading } from "@/app/providers/loading-provider";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const { isLoading } = usePageLoading();

  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (isLoading) {
      setIsAnimating(true);
    }
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        <div>
          {isLoading && (
            <motion.div
              key={pathname}
              initial={{ opacity: 0, display: "none" }}
              animate={{ opacity: 1, display: "block" }}
              exit={{ opacity: 0, display: "none" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed top-0 left-0 w-full h-full bg-black z-50"
            >
              <div className="bg-[var(--background)] flex flex-col items-center justify-center h-full">
                <div className="flex items-center justify-center loader ease-linear rounded-full border-8 border-t-8 border-[var(--border)] h-64 w-64">
                  <Image
                    src="/profileIcon.svg"
                    alt="Profile Icon"
                    width={730}
                    height={530}
                    className="mb-4 md:mb-0 h-24 w-33 max-w-full block"
                  />
                </div>
                <p className="text-xl mt-4">Loading...</p>
              </div>
            </motion.div>
          )}
          {children}
        </div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isAnimating && !isLoading && (
          <motion.div
            key={pathname + "-overlay"}
            initial={{ opacity: 1, display: "block" }}
            animate={{ opacity: 0, display: "none" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-full bg-black z-50"
          >
            <div className="bg-[var(--background)] flex flex-col items-center justify-center h-full">
              <div className="flex items-center justify-center loader ease-linear rounded-full border-8 border-t-8 border-[var(--border)] h-64 w-64">
                <Image
                  src="/profileIcon.svg"
                  alt="Profile Icon"
                  width={730}
                  height={530}
                  className="mb-4 md:mb-0 h-24 w-33 max-w-full block"
                />
              </div>
              <p className="text-xl mt-4">Loading...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
