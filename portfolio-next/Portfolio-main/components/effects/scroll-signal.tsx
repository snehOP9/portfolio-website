"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function ScrollSignal() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pulseY = useTransform(scrollYProgress, [0, 1], ["0%", "92vh"]);

  if (reduceMotion) return null;

  return <aside className="pointer-events-none fixed bottom-[5vh] left-4 top-[11vh] z-40 hidden w-px lg:block" aria-hidden="true">
    <span className="absolute inset-0 bg-linear-to-b from-transparent via-signal/25 to-transparent" />
    <motion.span style={{ y: pulseY }} className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-signal shadow-[0_0_18px_rgba(198,255,114,.9)]" />
  </aside>;
}
