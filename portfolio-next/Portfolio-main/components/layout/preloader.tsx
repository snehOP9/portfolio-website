"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SSystem } from "@/components/effects/s-system";
import { useSound } from "@/providers/sound-provider";

type IntroPhase = "signal" | "data" | "model" | "system" | "forming" | "identity" | "handoff" | "micro" | "complete";

const EASE = [0.16, 1, 0.3, 1] as const;
const INTRO_KEY = "sneh-portfolio-intro";
const HANDOFF_START = 4380;
const MICRO_DURATION = 480;

const phaseForElapsed = (elapsed: number): IntroPhase => {
  if (elapsed < 500) return "signal";
  if (elapsed < 1250) return "data";
  if (elapsed < 2100) return "model";
  if (elapsed < 3100) return "system";
  if (elapsed < 4200) return "forming";
  if (elapsed < HANDOFF_START) return "identity";
  return "handoff";
};

const phaseIs = (phase: IntroPhase, phases: IntroPhase[]) => phases.includes(phase);

function IntroNetwork({ phase }: { phase: IntroPhase }) {
  const dataVisible = phaseIs(phase, ["data", "model", "system", "forming", "identity", "handoff"]);
  const modelVisible = phaseIs(phase, ["model", "system", "forming", "identity", "handoff"]);
  const systemVisible = phaseIs(phase, ["system", "forming", "identity", "handoff"]);
  const forming = phaseIs(phase, ["forming", "identity", "handoff"]);

  return <motion.svg viewBox="0 0 640 640" className="absolute inset-[-16%] h-[132%] w-[132%] overflow-visible" aria-hidden="true">
    <defs>
      <linearGradient id="intro-path" x1="0" x2="1"><stop stopColor="rgba(198,255,114,0)" /><stop offset=".46" stopColor="rgba(225,255,190,.96)" /><stop offset="1" stopColor="rgba(198,255,114,0)" /></linearGradient>
      <radialGradient id="intro-node"><stop stopColor="#efffdc" /><stop offset=".3" stopColor="#c6ff72" /><stop offset="1" stopColor="rgba(198,255,114,0)" /></radialGradient>
      <path id="intro-route-a" d="M120 340C192 205 284 176 346 282S479 387 536 219" />
      <path id="intro-route-b" d="M145 445C268 459 354 435 452 353S508 248 536 219" />
      <path id="intro-route-c" d="M120 340C195 411 272 473 452 353" />
    </defs>
    <motion.circle cx="320" cy="320" r="206" fill="none" stroke="rgba(198,255,114,.2)" strokeWidth="1" strokeDasharray="3 10" animate={{ rotate: phase === "system" || forming ? 360 : 0, opacity: dataVisible ? 1 : 0 }} transition={{ rotate: { duration: 22, ease: "linear", repeat: Infinity }, opacity: { duration: .45 } }} style={{ transformOrigin: "320px 320px" }} />
    <motion.path d="M120 340C192 205 284 176 346 282S479 387 536 219" fill="none" stroke="url(#intro-path)" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: modelVisible ? 1 : 0, opacity: modelVisible ? .84 : 0 }} transition={{ duration: .65, ease: EASE }} />
    <motion.path d="M145 445C268 459 354 435 452 353S508 248 536 219" fill="none" stroke="url(#intro-path)" strokeWidth="1.25" initial={{ pathLength: 0 }} animate={{ pathLength: systemVisible ? 1 : 0, opacity: systemVisible ? .76 : 0 }} transition={{ duration: .7, ease: EASE }} />
    <motion.path d="M120 340C195 411 272 473 452 353" fill="none" stroke="rgba(198,255,114,.56)" strokeWidth="1" strokeDasharray="4 9" initial={{ pathLength: 0 }} animate={{ pathLength: systemVisible ? 1 : 0, opacity: systemVisible ? .7 : 0 }} transition={{ duration: .72, ease: EASE }} />
    {[{ x: 120, y: 340, label: "DATA", show: dataVisible }, { x: 536, y: 219, label: "MODELS", show: modelVisible }, { x: 452, y: 353, label: "SYSTEMS", show: systemVisible }].map((node, index) => <motion.g key={node.label} animate={{ opacity: node.show ? 1 : 0, scale: node.show ? (forming ? .82 : 1) : .35, x: forming ? (320 - node.x) * .24 : 0, y: forming ? (320 - node.y) * .24 : 0 }} transition={{ duration: .55, delay: index * .06, ease: EASE }} style={{ transformOrigin: `${node.x}px ${node.y}px` }}><circle cx={node.x} cy={node.y} r="18" fill="rgba(7,16,10,.88)" stroke="rgba(198,255,114,.66)" /><circle cx={node.x} cy={node.y} r="5" fill="url(#intro-node)" /><text x={node.x} y={node.y + 32} textAnchor="middle" fill="rgba(240,255,228,.76)" fontSize="10" fontFamily="var(--font-inter)" letterSpacing="2">{node.label}</text></motion.g>)}
    {["intro-route-a", "intro-route-b", "intro-route-c"].map((route, index) => <motion.circle key={route} r={index === 0 ? 5 : 3.5} fill="#dfffb0" animate={{ opacity: modelVisible ? [0, 1, 0] : 0 }} transition={{ duration: 1.7 + index * .22, repeat: Infinity, ease: "easeInOut", delay: index * .18 }}><animateMotion dur={`${2.3 + index * .35}s`} repeatCount="indefinite"><mpath href={`#${route}`} /></animateMotion></motion.circle>)}
  </motion.svg>;
}

export function Preloader() {
  const reduceMotion = useReducedMotion();
  const { playClick } = useSound();
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<IntroPhase>("signal");
  const [canSkip, setCanSkip] = useState(false);
  const [handoffTarget, setHandoffTarget] = useState({ x: 0, y: 0, scale: 1 });
  const markRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);
  const completionTimer = useRef<number | null>(null);

  const measureHandoff = useCallback(() => {
    const source = markRef.current?.getBoundingClientRect();
    const target = document.querySelector<HTMLElement>("[data-hero-identity]")?.getBoundingClientRect();
    if (!source || !target) return;
    setHandoffTarget({
      x: target.left + target.width / 2 - (source.left + source.width / 2),
      y: target.top + target.height / 2 - (source.top + source.height / 2),
      scale: Math.max(.42, Math.min(1.34, target.width / source.width)),
    });
  }, []);

  const finish = useCallback((withSound = false, handoffDuration = 820) => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (withSound) playClick();
    measureHandoff();
    setPhase("handoff");
    document.documentElement.dataset.portfolioIntroReady = "true";
    window.dispatchEvent(new Event("portfolio:intro-complete"));
    completionTimer.current = window.setTimeout(() => {
      setPhase("complete");
      setVisible(false);
    }, reduceMotion ? 0 : handoffDuration);
  }, [measureHandoff, playClick, reduceMotion]);

  useLayoutEffect(() => {
    const resize = () => phase === "handoff" && measureHandoff();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [measureHandoff, phase]);

  useEffect(() => {
    let firstVisit = true;
    try {
      firstVisit = sessionStorage.getItem(INTRO_KEY) !== "seen";
      sessionStorage.setItem(INTRO_KEY, "seen");
    } catch { /* Storage is optional. */ }

    if (reduceMotion) {
      const frame = window.requestAnimationFrame(() => finish());
      return () => window.cancelAnimationFrame(frame);
    }

    const startedAt = performance.now();
    let frameId = 0;
    let latestPhase: IntroPhase = "signal";
    const tick = (now: number) => {
      const elapsed = now - startedAt;
      if (!firstVisit) {
        if (elapsed < MICRO_DURATION) {
          if (latestPhase !== "micro") { latestPhase = "micro"; setPhase("micro"); }
          frameId = window.requestAnimationFrame(tick);
        } else finish(false, 180);
        return;
      }
      if (elapsed >= 600) setCanSkip(true);
      if (elapsed >= HANDOFF_START) { finish(); return; }
      const nextPhase = phaseForElapsed(elapsed);
      if (nextPhase !== latestPhase) { latestPhase = nextPhase; setPhase(nextPhase); }
      frameId = window.requestAnimationFrame(tick);
    };
    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [finish, reduceMotion]);

  useEffect(() => () => {
    if (completionTimer.current) window.clearTimeout(completionTimer.current);
  }, []);

  useEffect(() => {
    if (!canSkip || !visible) return;
    const skip = (event: KeyboardEvent | MouseEvent | TouchEvent) => {
      if (event instanceof KeyboardEvent && !["Enter", " ", "Escape"].includes(event.key)) return;
      finish(event instanceof KeyboardEvent || event.type === "click", 620);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skip, { once: true });
    window.addEventListener("touchstart", skip, { once: true, passive: true });
    return () => { window.removeEventListener("keydown", skip); window.removeEventListener("click", skip); window.removeEventListener("touchstart", skip); };
  }, [canSkip, finish, visible]);

  const isSignal = phase === "signal";
  const showIdentity = phaseIs(phase, ["identity", "handoff", "micro"]);
  const showNetwork = phaseIs(phase, ["data", "model", "system", "forming", "identity", "handoff"]);

  return <AnimatePresence>{visible && <motion.div data-portfolio-preloader key="portfolio-intro" initial={{ opacity: 0 }} animate={{ opacity: phase === "handoff" ? 0 : 1 }} exit={{ opacity: 0 }} transition={{ duration: phase === "handoff" ? .8 : .24, ease: EASE }} className="fixed inset-0 z-[1000] grid place-items-center overflow-hidden bg-[#070908] text-[#efffdc]" aria-hidden="true">
    <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(rgba(198,255,114,.07)_1px,transparent_1px),linear-gradient(rgba(198,255,114,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(198,255,114,.03)_1px,transparent_1px)] [background-size:44px_44px,64px_64px,64px_64px]" />
    <motion.div className="absolute inset-0" animate={{ opacity: isSignal ? .65 : .38 }} transition={{ duration: .6 }} style={{ background: "radial-gradient(circle at 50% 50%, rgba(198,255,114,.13), transparent 20%), radial-gradient(circle at 74% 23%, rgba(198,255,114,.06), transparent 25%)" }} />
    <p className="absolute left-6 top-6 font-mono text-[10px] tracking-[.2em] text-white/50 sm:left-10 sm:top-9">SR / SIGNAL SYSTEM / 001</p>
    <p className="absolute bottom-6 right-6 font-mono text-[10px] tracking-[.16em] text-white/45 sm:bottom-9 sm:right-10">DATA â†’ MODELS â†’ SYSTEMS</p>
    <div className="relative z-10 flex w-[min(78vw,620px)] flex-col items-center text-center">
      <motion.p animate={{ opacity: isSignal ? 1 : 0, y: isSignal ? 0 : -6 }} transition={{ duration: .32 }} className="mb-7 font-mono text-[10px] tracking-[.22em] text-signal">SIGNAL / 001</motion.p>
      <motion.div ref={markRef} animate={phase === "handoff" ? { x: handoffTarget.x, y: handoffTarget.y, scale: handoffTarget.scale, opacity: .92 } : { x: 0, y: 0, scale: phase === "micro" ? .76 : 1, opacity: 1 }} transition={{ duration: phase === "handoff" ? .82 : .52, ease: EASE }} className="relative aspect-square w-full max-w-[520px] will-change-transform">
        {showNetwork && <IntroNetwork phase={phase} />}
        <motion.div animate={{ opacity: showIdentity ? 1 : isSignal ? .06 : .3, scale: showIdentity ? 1 : isSignal ? .28 : .58 }} transition={{ duration: phase === "forming" ? .88 : .5, ease: EASE }} className="absolute inset-[7%]">
          <SSystem interactive={false} />
        </motion.div>
        <motion.div animate={{ opacity: isSignal ? 1 : 0, scale: isSignal ? [0.5, 1.08, 1] : .25 }} transition={{ duration: .7, ease: EASE }} className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_44px_rgba(198,255,114,.66)]" />
      </motion.div>
      <motion.div animate={{ opacity: showIdentity ? 1 : 0, y: showIdentity ? 0 : 10 }} transition={{ duration: .48, ease: EASE }} className="mt-6">
        <p className="font-mono text-[10px] tracking-[.2em] text-signal">IDENTITY LOCKED</p>
        <p className="mt-3 font-sans text-xl font-semibold tracking-[.18em] text-white sm:text-2xl">SNEH RAUNAK</p>
        <p className="mt-2 font-mono text-[10px] tracking-[.14em] text-white/55">AI / ML Ã— SOFTWARE ENGINEERING</p>
      </motion.div>
    </div>
  </motion.div>}</AnimatePresence>;
}
