"use client";

import Link from "next/link";
import Navbar from "./nav-bar";
import Contactbar from "./contact-bar";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);

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
      <div className="hidden sticky flex-col justify-between top-1 m-4 px-4 py-4 bg-green-950 rounded-4xl border-1 border-gray-50 md:flex">
        <Link href="/" className="px-4">
          <Image
            src="/profileIcon.svg"
            alt="Profile Icon"
            width={730}
            height={530}
            className="block h-16 w-22 mx-auto"
          />
        </Link>
        <Navbar />
        <Contactbar />
      </div>
    </div>
  );
}
