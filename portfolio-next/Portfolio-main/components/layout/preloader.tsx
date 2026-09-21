"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSound } from "@/providers/sound-provider";

type IntroPhase = "signal" | "network" | "identity" | "handoff" | "complete";

const S_PATH = "M72 24C65 17 52 14 40 17C27 20 21 29 23 39C25 49 35 52 47 54C58 56 64 59 63 66C62 73 53 77 43 76C33 75 25 70 21 64";
const easing = [0.16, 1, 0.3, 1] as const;

function SignalMark({ phase }: { phase: IntroPhase }) {
  const formed = phase === "identity" || phase === "handoff";
  const handoff = phase === "handoff";

  return <motion.div animate={handoff ? { x: "23vw", y: "5vh", scale: 0.58, opacity: 0.22 } : { x: 0, y: 0, scale: 1, opacity: 1 }} transition={{ duration: handoff ? 0.62 : 0.48, ease: easing }} className="relative h-56 w-56 sm:h-72 sm:w-72">
    <motion.div animate={{ scale: phase === "signal" ? [0.25, 1.08, 1] : 1, opacity: phase === "signal" ? [0, 1, 1] : 1 }} transition={{ duration: 0.7, ease: easing }} className="absolute inset-[36%] rounded-full bg-signal shadow-[0_0_38px_rgba(198,255,114,.58)]" />
    <motion.svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
      <motion.circle cx="50" cy="50" r="42" fill="none" stroke="rgba(198,255,114,.42)" strokeWidth=".55" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: phase === "signal" ? 0.28 : 1, opacity: 1 }} transition={{ duration: 0.8, ease: easing }} />
      <motion.circle cx="50" cy="50" r="34" fill="none" stroke="rgba(233,255,216,.24)" strokeWidth=".45" strokeDasharray="2 4" animate={{ rotate: phase === "handoff" ? 0 : 360 }} transition={{ duration: 14, ease: "linear", repeat: Infinity }} style={{ transformOrigin: "50px 50px" }} />
      <motion.path d="M19 50L34 34M66 34L81 50M34 66L50 79" fill="none" stroke="rgba(198,255,114,.62)" strokeWidth=".45" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: phase === "network" || formed ? 1 : 0, opacity: phase === "network" || formed ? 1 : 0 }} transition={{ duration: 0.55, ease: easing }} />
      {[{ x: 19, y: 50, label: "DATA" }, { x: 66, y: 34, label: "MODELS" }, { x: 34, y: 66, label: "SYSTEMS" }].map((node, index) => <motion.g key={node.label} initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: phase === "network" || formed ? 1 : 0, scale: phase === "network" || formed ? 1 : 0.4 }} transition={{ delay: index * 0.12, duration: 0.36, ease: easing }} style={{ transformOrigin: `${node.x}px ${node.y}px` }}><circle cx={node.x} cy={node.y} r="3.1" fill="#07100a" stroke="#c6ff72" strokeWidth=".6" /><text x={node.x} y={node.y + 7} textAnchor="middle" fill="rgba(240,255,228,.78)" fontSize="3" fontFamily="var(--font-inter)" letterSpacing=".7">{node.label}</text></motion.g>)}
      <motion.path d={S_PATH} fill="rgba(18,26,22,.82)" stroke="url(#intro-edge)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: formed ? 1 : 0, opacity: formed ? 1 : 0 }} transition={{ duration: 0.86, ease: easing }} />
      <defs><linearGradient id="intro-edge" x1="20" y1="18" x2="74" y2="82"><stop stopColor="#efffdc" /><stop offset=".35" stopColor="#c6ff72" /><stop offset="1" stopColor="rgba(198,255,114,.28)" /></linearGradient></defs>
    </motion.svg>
  </motion.div>;
}

export function Preloader() {
  const reduceMotion = useReducedMotion();
  const { playClick } = useSound();
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<IntroPhase>("signal");
  const [canSkip, setCanSkip] = useState(false);
  const completedRef = useRef(false);

  const complete = useCallback((withSound = false) => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (withSound) playClick();
    setPhase("handoff");
    window.setTimeout(() => {
      setPhase("complete");
      document.documentElement.dataset.portfolioIntroReady = "true";
      window.dispatchEvent(new Event("portfolio:intro-complete"));
      setVisible(false);
    }, reduceMotion ? 0 : 540);
  }, [playClick, reduceMotion]);

  useEffect(() => {
    let cancelled = false;
    const wait = (duration: number) => new Promise<void>((resolve) => window.setTimeout(resolve, duration));
    let firstVisit = true;
    try { firstVisit = sessionStorage.getItem("sneh-portfolio-intro") !== "seen"; sessionStorage.setItem("sneh-portfolio-intro", "seen"); } catch { /* Storage is optional. */ }

    const run = async () => {
      if (reduceMotion) return complete();
      if (!firstVisit) { await wait(360); if (!cancelled) complete(); return; }
      await wait(620); if (cancelled) return;
      setCanSkip(true); setPhase("network");
      await wait(640); if (cancelled) return;
      setPhase("identity");
      await wait(920); if (cancelled) return;
      complete();
    };
    void run();
    return () => { cancelled = true; };
  }, [complete, reduceMotion]);

  useEffect(() => {
    if (!canSkip || !visible) return;
    const skip = (event: KeyboardEvent | MouseEvent) => {
      if (event instanceof KeyboardEvent && !["Enter", " ", "Escape"].includes(event.key)) return;
      complete(event instanceof KeyboardEvent || event.type === "click");
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip, { once: true });
    return () => { window.removeEventListener("keydown", skip); window.removeEventListener("click", skip); };
  }, [canSkip, complete, visible]);

  return <AnimatePresence>{visible && <motion.div key="portfolio-intro" initial={{ opacity: 0 }} animate={{ opacity: phase === "handoff" ? 0 : 1 }} exit={{ opacity: 0 }} transition={{ duration: phase === "handoff" ? 0.48 : 0.24, ease: easing }} className="fixed inset-0 z-[1000] grid place-items-center overflow-hidden bg-[#070908] text-[#efffdc]" role="status" aria-label="Opening Sneh Raunak's portfolio">
    <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(198,255,114,.08)_1px,transparent_1px),linear-gradient(rgba(198,255,114,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(198,255,114,.035)_1px,transparent_1px)] [background-size:44px_44px,64px_64px,64px_64px]" aria-hidden="true" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(198,255,114,.12),transparent_30%),radial-gradient(circle_at_76%_20%,rgba(198,255,114,.07),transparent_25%)]" aria-hidden="true" />
    <p className="absolute left-6 top-6 font-mono text-[10px] tracking-[.2em] text-white/50 sm:left-10 sm:top-9" aria-hidden="true">SR / SIGNAL SYSTEM / 001</p>
    <p className="absolute bottom-6 right-6 font-mono text-[10px] tracking-[.16em] text-white/45 sm:bottom-9 sm:right-10" aria-hidden="true">DATA → MODELS → SYSTEMS</p>
    <div className="relative z-10 flex flex-col items-center text-center">
      <SignalMark phase={phase} />
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: phase === "signal" ? 1 : 0, y: 0 }} className="mt-7 font-mono text-[10px] tracking-[.22em] text-signal" aria-hidden="true">SIGNAL ACQUIRED</motion.p>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: phase === "identity" || phase === "handoff" ? 1 : 0, y: 0 }} transition={{ duration: 0.4, ease: easing }} className="mt-7" aria-hidden="true"><p className="font-mono text-[10px] tracking-[.2em] text-signal">IDENTITY LOCKED</p><p className="mt-3 font-sans text-xl font-semibold tracking-[.18em] text-white sm:text-2xl">SNEH RAUNAK</p><p className="mt-2 font-mono text-[10px] tracking-[.14em] text-white/55">AI / ML × SOFTWARE ENGINEERING</p></motion.div>
      {canSkip && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 font-mono text-[10px] tracking-[.14em] text-white/45" aria-hidden="true">PRESS ANY KEY TO ENTER</motion.p>}
    </div>
  </motion.div>}</AnimatePresence>;
}
