"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type MotionSectionProps = Omit<
  ComponentPropsWithoutRef<"section">,
  | "children"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
> & {
  children: ReactNode;
  delay?: number;
  testId?: string;
};

const DEFAULT_TEST_ID = "motion-section";

export function MotionSection({
  children,
  className,
  delay = 0,
  testId = DEFAULT_TEST_ID,
  ...rest
}: MotionSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const sectionClassName = ["motion-section", className].filter(Boolean).join(" ");

  if (prefersReducedMotion) {
    return (
      <section
        {...rest}
        className={sectionClassName}
        data-motion-mode="static"
        data-testid={testId}
      >
        {children}
      </section>
    );
  }

  return (
    <motion.section
      {...rest}
      className={sectionClassName}
      data-motion-mode="animated"
      data-testid={testId}
      initial={false}
      animate={{ opacity: 1, y: [0, -4, 0] }}
      transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
