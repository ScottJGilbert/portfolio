"use client";

import clsx from "clsx";
import Contactbar from "./contact-bar";
import Navbar from "./nav-bar";
import { BiMenu, BiCollapseVertical } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="fixed w-full top-4 z-50">
      <div className="mr-12">
        <div className="fixed top-0 z-0 w-full h-12 bg-[var(--background)] -translate-x-4 md:hidden"></div>
        <div className="relative flex z-50 justify-between p-4 md:hidden rounded-l-full rounded-r-full bg-gradient-to-b from-green-950 to-green-900 border-gray-50 border-1">
          <Link
            href="/"
            className="text-2xl font-bold text-center hover:text-gray-400 items-center flex"
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
          </Link>
          <button aria-label="Open Menu" onClick={toggleMenu}>
            <BiMenu
              className={clsx("", {
                hidden: menuOpen === true,
                block: menuOpen === false,
              })}
            />
            <BiCollapseVertical
              className={clsx("", {
                block: menuOpen === true,
                hidden: menuOpen === false,
              })}
            />
          </button>
        </div>
        <div
          className={clsx(
            "top-2 bottom-2 mx-auto min-h-[calc(100%-1rem)] max-w-screen-lg -translate-y-16",
            {
              block: menuOpen === true,
              hidden: menuOpen === false,
            }
          )}
        >
          <div className="sticky top-4 flex justify-between mb-8 p-4 md:hidden rounded-l-full rounded-r-full bg-green-950">
            <Link
              href="/"
              className="text-2xl font-bold text-center hover:text-gray-400"
            >
              Scott Gilbert
            </Link>
            <button aria-label="Open Menu" onClick={toggleMenu}></button>
          </div>
          <div
            className={clsx(
              "bg-green-950 min-h-[calc(100%-1rem)] p-4 pt-14 -mt-22 rounded-4xl border-gray-50 border-1",
              {
                "block md:hidden": menuOpen === true,
                hidden: menuOpen === false,
              }
            )}
          >
            <div className="flex flex-col gap-8 mt-4">
              <Navbar />
              <Contactbar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
