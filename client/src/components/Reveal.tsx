import { motion, type Variants, useReducedMotion } from "framer-motion";
import React from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={variants}
      initial={shouldReduceMotion ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      transition={
        shouldReduceMotion
          ? { duration: 0, delay: 0 }
          : { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }
      }
    >
      {children}
    </motion.div>
  );
}