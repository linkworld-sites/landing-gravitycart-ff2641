"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeUpProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  as?: "div" | "span";
};

export function FadeUp({ children, className, delay = 0, y = 24, amount = 0.2, as = "div" }: FadeUpProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? undefined : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Comp>
  );
}

type WordStaggerProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  startDelay?: number;
};

export function WordStagger({ text, className, wordClassName, startDelay = 0.15 }: WordStaggerProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={`flex flex-wrap gap-[0.25em] ${className ?? ""}`}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={wordClassName}
          initial={reduce ? undefined : { opacity: 0, y: 32 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: startDelay + i * 0.08 }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
