"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface DropdownProps {
  title: string;
  children: React.ReactNode;
}

export function Dropdown({ title, children }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer"
      >
        <span
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          ▶
        </span>
        {title}
      </button>
      {isOpen && (
        <motion.div
          className="mt-2 overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
