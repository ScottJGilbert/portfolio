"use client";

import clsx from "clsx";
import Contactbar from "./contact-bar";
import Navbar from "./nav-bar";
import { BiMenu, BiCollapseVertical } from "react-icons/bi";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="sticky top-4 my-4">
      <div className="fixed top-0 -z-1 w-full h-12 bg-[var(--background)] -translate-x-4 md:hidden"></div>
      <div className="block flex justify-between p-4 md:hidden rounded-l-full rounded-r-full bg-slate-800">
        <Link
          href="/"
          className="text-2xl font-bold text-center hover:text-gray-400"
        >
          Scott Gilbert
        </Link>
        <button onClick={toggleMenu}>
          <BiMenu />
        </button>
      </div>
      <div
        className={clsx(
          "fixed top-2 bottom-2 mx-auto w-[calc(100%-2rem)] min-h-[calc(100%-1rem)] max-w-screen-lg",
          {
            block: menuOpen === true,
            hidden: menuOpen === false,
          }
        )}
      >
        <div className="sticky top-4 flex justify-between mb-8 p-4 md:hidden rounded-l-full rounded-r-full bg-slate-800">
          <p className="text-2xl font-bold text-center hover:text-gray-400">
            Scott Gilbert
          </p>
          <button onClick={toggleMenu}>
            <BiCollapseVertical />
          </button>
        </div>
        <div
          className={clsx(
            "bg-slate-800 min-h-[calc(100%-1rem)] p-4 pt-14 -mt-22 rounded-4xl",
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
  );
}
