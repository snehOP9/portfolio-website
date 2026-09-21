"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
    className?: string;
}

export default function ScrollProgress({ className }: ScrollProgressProps) {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className={cn(
                "fixed top-0 left-0 right-0 h-px bg-signal origin-left z-99999 shadow-[0_0_10px_rgba(198,255,114,.72)]",
                className
            )}
            style={{ scaleX }}
        />
    );
}
