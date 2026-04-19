"use client";

import { useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark")
  );

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
      }}
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
