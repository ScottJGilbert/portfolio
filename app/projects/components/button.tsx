"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function ReleaseButton({
  url,
  text,
  external,
}: {
  url: string;
  text: string;
  external: boolean;
}) {
  const [theme, setTheme] = useState("");
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    setTheme(localStorage.theme);
    setMatches(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const prefersDark = theme === "dark" || (!theme && matches);

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[var(--background-secondary)] p-2 rounded-xl border-1 border-[var(--border)] inline-flex justify-center items-center gap-4 max-w-[90vw] shrink-0 hover:bg-[var(--background-tertiary)]"
      download={!external}
    >
      {text}
      {external && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M10 5H8.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C5 6.52 5 7.08 5 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218.377-.192.683-.498.875-.874.218-.428.218-.987.218-2.105V14m1-5V4m0 0h-5m5 0-7 7"
            stroke={prefersDark ? "#fff" : "#000"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Link>
  );
}
