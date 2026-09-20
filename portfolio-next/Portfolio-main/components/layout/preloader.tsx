"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const welcome = "Welcome to Sneh's universe";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const reduceMotion = useReducedMotion();
  const revealDelay = reduceMotion ? 0 : 420;

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), reduceMotion ? 0 : 1600);
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  return <AnimatePresence>
    {isLoading && <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: reduceMotion ? 0 : 0.6, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-99999 isolate flex items-center justify-center overflow-hidden bg-[#070908] px-6 text-[#f8fff0]"
      role="status"
      aria-label="Opening Sneh Raunak's portfolio"
    >
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(198,255,114,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(198,255,114,.08)_1px,transparent_1px)] [background-size:64px_64px]" />
      <motion.div className="absolute h-[58vmin] w-[58vmin] rounded-full border border-signal/20" animate={reduceMotion ? undefined : { rotate: 360, scale: [0.92, 1.04, 0.92] }} transition={{ duration: 18, ease: "linear", repeat: Infinity }} />
      <motion.div className="absolute h-[40vmin] w-[40vmin] rounded-full border border-dashed border-white/30" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 25, ease: "linear", repeat: Infinity }} />
      <div className="absolute left-6 top-6 font-mono text-[10px] tracking-[.22em] text-white/70 sm:left-10 sm:top-10">SR / PORTFOLIO / 2026</div>
      <div className="absolute bottom-6 left-6 right-6 hidden justify-end font-mono text-[10px] tracking-[.22em] text-white/70 sm:flex sm:bottom-10 sm:left-auto sm:right-10">ML SYSTEMS / FULL-STACK</div>

      <div className="relative z-10 flex max-w-5xl flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, scale: 0.72, filter: "blur(12px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }} className="relative flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48">
          <motion.svg animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 12, ease: "linear", repeat: Infinity }} viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-signal/70"><circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth=".5" strokeDasharray="2 5" /></motion.svg>
          <motion.svg viewBox="0 0 100 100" className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] -rotate-90 text-signal"><circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity=".2" /><motion.circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="289" initial={{ strokeDashoffset: 289 }} animate={{ strokeDashoffset: 0 }} transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.65, 0, 0.35, 1] }} /></motion.svg>
          <motion.svg viewBox="0 0 100 100" className="relative z-10 h-24 w-24 text-[#f8fff0] drop-shadow-[0_0_18px_rgba(248,255,240,.45)] sm:h-28 sm:w-28" initial={{ pathLength: 0, opacity: 0, rotate: -14 }} animate={{ pathLength: 1, opacity: 1, rotate: 0 }} transition={{ duration: reduceMotion ? 0 : 0.78, delay: reduceMotion ? 0 : 0.15, ease: [0.65, 0, 0.35, 1] }} aria-hidden="true"><motion.path d="M72 24C65 17 52 14 40 17C27 20 21 29 23 39C25 49 35 52 47 54C58 56 64 59 63 66C62 73 53 77 43 76C33 75 25 70 21 64" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" /></motion.svg>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.62 }} className="mt-7 font-mono text-[10px] tracking-[.24em] text-signal sm:text-xs">SIGNAL DETECTED</motion.p>
        <h1 className="mt-6 whitespace-nowrap text-[clamp(1.12rem,5.15vw,5.7rem)] font-black leading-[.86] tracking-[-.065em] text-[#f8fff0]"><span className="sr-only">{welcome}</span><span aria-hidden="true">{[...welcome].map((letter, index) => <motion.span key={`${letter}-${index}`} className="inline-block" initial={{ opacity: 0, y: "0.45em", filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : revealDelay / 1000 + index * 0.043, ease: [0.16, 1, 0.3, 1] }}>{letter === " " ? "\u00a0" : letter}</motion.span>)}</span></h1>
        <button type="button" onClick={() => setIsLoading(false)} className="mt-7 rounded-full border border-white/35 px-4 py-2 font-mono text-[10px] tracking-[.16em] text-white transition-colors hover:border-signal hover:text-signal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal">ENTER PORTFOLIO</button>
      </div>
    </motion.div>}
  </AnimatePresence>;
}
