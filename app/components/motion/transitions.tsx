"use client";

import { motion } from "motion/react";

export function FadeUp({ children }: { children: React.ReactNode }) {
  return (
    <Fade>
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
      >
        {children}
      </motion.div>
    </Fade>
  );
}

export function Fade({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}

export function Bounce({ children }: { children: React.ReactNode }) {
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
