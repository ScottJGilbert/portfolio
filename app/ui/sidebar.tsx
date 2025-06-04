"use client";

import Link from "next/link";
import Navbar from "./nav-bar";
import Contactbar from "./contact-bar";
import { useState } from "react";

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);

  setTimeout(function (): void {
    setIsVisible(true);
  }, 100);

  return (
    <div
      className={`h-screen flex sticky top-0 transform transition-transform duration-700 ease-out ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="hidden sticky flex-col justify-between top-1 px-4 py-4 bg-slate-800 rounded-r-3xl border-r-1 border-gray-50 md:flex">
        <Link href="/" className="px-4">
          <p className="text-xl font-bold text-center hover:text-gray-400">
            Scott Gilbert
          </p>
        </Link>
        <Navbar />
        <Contactbar />
      </div>
    </div>
  );
}
