"use client";

import { motion } from "motion/react";

export default function Bounce({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ scale: 1 }} // Initial state
      whileHover={{ scale: 1.05 }} // Scale up on hover
      whileTap={{ scale: 0.95 }} // Scale down on tap/click
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // Spring animation settings
    >
      {children}
    </motion.span>
  );
}
