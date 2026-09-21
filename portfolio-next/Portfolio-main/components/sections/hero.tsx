"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mouse, FileText } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { ContactModal } from "@/components/modals/contact-modal";
import { ResumeModal } from "@/components/modals/resume-modal";
import Magnetic from "@/components/effects/magnetic";
import { useSound } from "@/providers/sound-provider";
import { SSystem } from "@/components/effects/s-system";

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { dict } = useLanguage();
  const { playHover, playClick } = useSound();
  const containerRef = useRef<HTMLElement>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [introReady, setIntroReady] = useState(false);
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);
  const scale = useTransform(scrollY, [0, 800], [1, .96]);
  const y = useTransform(scrollY, [0, 800], [0, -90]);
  const eyebrowY = useTransform(scrollY, [0, 800], [0, -42]);
  const visualY = useTransform(scrollY, [0, 800], [0, 54]);
  const visualRotate = useTransform(scrollY, [0, 800], [0, 2.5]);
  const reveal = introReady || reduceMotion;

  useEffect(() => {
    document.documentElement.dataset.portfolioHeroReady = "true";
    window.dispatchEvent(new Event("portfolio:hero-ready"));
    const showHero = () => setIntroReady(true);
    if (document.documentElement.dataset.portfolioIntroReady === "true") showHero();
    window.addEventListener("portfolio:intro-complete", showHero);
    const fallback = window.setTimeout(showHero, 5600);
    return () => { window.removeEventListener("portfolio:intro-complete", showHero); window.clearTimeout(fallback); };
  }, []);

  const scrollToProjects = useCallback(() => {
    window.history.replaceState({ section: "work" }, "", "#work");
    const target = document.getElementById("projects-content");
    const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 80;
    if (target) window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 12, behavior: "smooth" });
  }, []);

  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 16 },
    animate: { opacity: reveal ? 1 : 0, y: reveal ? 0 : 16 },
    transition: { duration: .52, delay, ease: REVEAL_EASE },
  });

  return <section ref={containerRef} id="home" className="hero-shell min-h-[720px] overflow-hidden bg-background px-container pb-12 pt-28 sm:pt-32 lg:sticky lg:top-0 lg:h-screen lg:pb-16">
    <motion.div style={reduceMotion ? undefined : { opacity, scale, y }} className="relative z-20 mx-auto h-full max-w-[1800px]">
      <div className="grid h-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,.82fr)] lg:items-center">
        <div className="flex flex-col justify-center space-y-7 xl:space-y-10">
          <motion.div style={reduceMotion ? undefined : { y: eyebrowY }} {...entrance(.08)} className="flex items-center gap-3 font-mono text-xs tracking-[.16em] text-signal"><span className="h-px w-10 bg-signal opacity-70" /> Data → models → systems</motion.div>
          <motion.h1 initial={{ opacity: 0, y: reduceMotion ? 0 : 28, clipPath: reduceMotion ? "none" : "inset(0 0 100% 0)" }} animate={{ opacity: reveal ? 1 : 0, y: reveal ? 0 : 28, clipPath: reveal || reduceMotion ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }} transition={{ duration: .78, delay: .16, ease: REVEAL_EASE }} className="max-w-4xl text-[clamp(3.5rem,8.5vw,9.5rem)] font-black leading-[.78] tracking-[-.075em] text-foreground">Sneh<br />Raunak<span className="text-signal">.</span></motion.h1>
          <motion.p {...entrance(.36)} className="flex max-w-2xl flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs leading-relaxed tracking-[.06em] text-foreground/70 sm:gap-x-3">
            <span className="whitespace-nowrap">AI / ML × Software Engineering</span><span aria-hidden="true">·</span><span className="whitespace-nowrap">Chandigarh University</span><span aria-hidden="true">·</span><span className="whitespace-nowrap">B.Tech CSE</span><span aria-hidden="true">·</span><span className="whitespace-nowrap">2023–2027</span>
          </motion.p>
          <motion.p {...entrance(.46)} className="max-w-xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg 2xl:text-xl">I build explainable ML and full-stack products with attention to the systems, interfaces, and boundaries that make technical work usable.</motion.p>
          <motion.div {...entrance(.56)} className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
            <Magnetic><button onClick={() => { playClick(); setContactOpen(true); }} onMouseEnter={playHover} className="group relative flex h-14 w-fit items-center gap-3 overflow-hidden rounded-full bg-signal px-7 text-xs font-semibold tracking-[.16em] text-[#07100a] uppercase transition-transform hover:-translate-y-1">{dict.contactMe}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button></Magnetic>
            <Magnetic><button onClick={() => { playClick(); scrollToProjects(); }} onMouseEnter={playHover} className="signal-ghost flex h-14 w-fit items-center gap-3 rounded-full border border-border/70 px-6 text-xs font-semibold tracking-[.14em] text-foreground uppercase transition-colors"><Mouse className="h-4 w-4" />{dict.exploreProjects}</button></Magnetic>
            <Magnetic><button onClick={() => { playClick(); setResumeOpen(true); }} onMouseEnter={playHover} className="signal-ghost flex h-14 w-fit items-center gap-3 rounded-full border border-border/70 px-6 text-xs font-semibold tracking-[.14em] text-foreground uppercase transition-colors"><FileText className="h-4 w-4" />{dict.resume}</button></Magnetic>
          </motion.div>
          <motion.div {...entrance(.66)} className="flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-xs tracking-[.1em] text-muted-foreground">
            <a href="https://github.com/snehOP9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-foreground"><span aria-hidden="true">↗</span>GITHUB</a>
            <a href="https://www.linkedin.com/in/sneh-raunak/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-foreground"><span aria-hidden="true">↗</span>LINKEDIN</a>
          </motion.div>
        </div>
        <motion.div data-hero-identity style={reduceMotion ? undefined : { y: visualY, rotate: visualRotate }} initial={{ opacity: 0, scale: reduceMotion ? 1 : .94 }} animate={{ opacity: reveal ? 1 : 0, scale: reveal ? 1 : .94 }} transition={{ duration: .8, delay: .18, ease: REVEAL_EASE }} className="relative mx-auto h-[min(54vh,600px)] w-full max-w-[620px] lg:h-[min(70vh,720px)]">
          <SSystem />
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap font-mono text-xs tracking-[.14em] text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_16px_var(--signal)]" /> Interactive identity system</div>
        </motion.div>
      </div>
    </motion.div>
    <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    <ResumeModal open={resumeOpen} onOpenChange={setResumeOpen} />
  </section>;
}
