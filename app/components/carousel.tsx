"use client";

import { useState, ReactNode } from "react";
import Button from "@/app/ui/button";
import clsx from "clsx";

type CarouselProps = {
  children: ReactNode[];
};

export default function Carousel({ children }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const length = children.length;

  const next = () => setIndex((i) => (i + 1) % length);
  const prev = () => setIndex((i) => (i - 1 + length) % length);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const delta = e.changedTouches[0].clientX - touchStart;

    if (Math.abs(delta) > 50) {
      if (delta > 0) prev();
      else next();
    }

    setTouchStart(null);
  };

  return (
    <div className="relative w-full max-w-full">
      {/* Viewport */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex transition-transform duration-500 ease-in-out">
          {children.map((child, i) => (
            <div
              key={i}
              className={clsx(
                "flex-shrink-0 mx-[2%] text-center [&>*]:h-full",
                {
                  hidden: i !== index,
                  block: i === index,
                }
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="hidden md:block w-full absolute inset-x-0">
        <div className="w-full flex justify-between mt-4">
          <Button onClick={prev}>←</Button>
          <Button onClick={next}>→</Button>
        </div>
      </div>
    </div>
  );
}
