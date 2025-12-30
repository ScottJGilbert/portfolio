"use client";

import { BiMenu, BiCollapseVertical } from "react-icons/bi";
import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { Bounce, Fade } from "../motion/transitions";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { usePageLoading } from "@/app/providers/loading-provider";
import BufferedLink from "@/app/ui/buffered-link";
import AccountComponent from "./account";

const Navbar = dynamic(() => import("./nav-bar"));
const Externalsbar = dynamic(() => import("./externals-bar"));

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { setIsLoading } = usePageLoading();

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  // Detect route changes to close the menu
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setMenuOpen(false);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  return (
    <div className="fixed w-full top-4 z-50">
      <Fade>
        <div className="mr-12">
          <div className="fixed top-0 z-10 w-full h-12 bg-[var(--background)] -translate-x-4 md:hidden"></div>
          <div className="relative flex z-50 justify-between p-4 md:hidden rounded-l-full rounded-r-full bg-gradient-to-b from-green-300 to-green-100 dark:from-green-950 dark:to-green-900 border-[var(--border)] border-1">
            <Bounce>
              <BufferedLink
                doOnClick={() => {
                  setIsLoading(true);
                }}
                href="/"
                className="text-2xl font-bold text-center hover:text-gray-700 dark:hover:text-gray-400 items-center flex"
              >
                <Image
                  width={730}
                  height={530}
                  src="/profileIcon.svg"
                  alt="Profile Icon"
                  className="inline h-8 w-11 mr-2"
                />
                <span className="h-full inline-flex items-center">
                  Scott Gilbert
                </span>
              </BufferedLink>
            </Bounce>
            <button aria-label="Open Menu" onClick={toggleMenu}>
              {!menuOpen && (
                <Bounce>
                  <BiMenu />{" "}
                </Bounce>
              )}
              {menuOpen && (
                <Bounce>
                  <BiCollapseVertical />
                </Bounce>
              )}
            </button>
          </div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ y: -800 }}
                animate={{ y: 0 }}
                exit={{ y: -800 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="top-2 bottom-2 mx-auto min-h-[calc(100%-1rem)] max-w-screen-lg -translate-y-16 z-0"
              >
                <div className="sticky top-4 flex justify-between mb-8 p-4 md:hidden rounded-l-full rounded-r-full bg-[var(--background-secondary)]">
                  <Bounce>
                    <BufferedLink
                      doOnClick={() => {
                        setIsLoading(true);
                      }}
                      href="/"
                      className="text-2xl font-bold text-center hover:text-gray-400"
                    >
                      Scott Gilbert
                    </BufferedLink>
                  </Bounce>
                </div>
                <div className="bg-[var(--background-secondary)] min-h-[calc(100%-1rem)] p-4 pt-14 -mt-22 rounded-4xl border-[var(--border)] border-1 block md:hidden">
                  <div className="flex flex-col gap-8 mt-4">
                    {menuOpen && <Navbar />}
                    {menuOpen && <Externalsbar />}
                    {menuOpen && <AccountComponent />}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Fade>
    </div>
  );
}
