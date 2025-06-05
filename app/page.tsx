"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const strings = [
  ", trombone player",
  ", full-stack developer",
  ", cross-country runner",
  ", avid volunteer",
  ", Minecraft gamer",
  ", and computer engineering student",
];

export default function Page() {
  const [currentString, setCurrentString] = useState(" tinkerer");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex == strings.length) {
      return;
    }
    setTimeout(() => {
      setCurrentString(currentString + strings[currentIndex]);
      setCurrentIndex(currentIndex + 1);
    }, 750);
  });

  return (
    <div>
      <div className="min-h-screen">
        <div className="flex flex-col md:flex-row">
          <div>
            <p>Hi, I&apos;m</p>
            <h1 className="" data-text="Scott Gilbert">
              Scott Gilbert
            </h1>
            <h2>
              A <span>{currentString}</span> on a mission to make tomorrow{" "}
              <i>just</i> a little brighter for all.
            </h2>
          </div>
          <Image
            src="/titleImage.png"
            alt="Title Image"
            height={280}
            width={450}
          ></Image>
        </div>
        <div className="my-10">
          <Link
            href="/about"
            className="p-3 m-auto rounded-2xl bg-sky-800 hover:bg-sky-900"
          >
            Learn More →
          </Link>
        </div>
      </div>
      <div>
        <h1 className="h-100">HI MOM</h1>
      </div>
    </div>
  );
}
