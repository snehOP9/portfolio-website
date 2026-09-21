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
  const scale = useTransform(scrollY, [0, 800], [1, 0.96]);
  const y = useTransform(scrollY, [0, 800], [0, -90]);

  useEffect(() => {
    const reveal = () => setIntroReady(true);
    if (document.documentElement.dataset.portfolioIntroReady === "true") reveal();
    window.addEventListener("portfolio:intro-complete", reveal);
    const fallback = window.setTimeout(reveal, 3600);
    return () => { window.removeEventListener("portfolio:intro-complete", reveal); window.clearTimeout(fallback); };
  }, []);

  const scrollToProjects = useCallback(() => {
    window.history.replaceState({ section: "work" }, "", "#work");
    const target = document.getElementById("projects-content");
    const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 80;
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 12,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <section ref={containerRef} id="home" className="hero-shell min-h-[720px] overflow-hidden bg-background px-container pt-28 pb-12 sm:pt-32 lg:sticky lg:top-0 lg:h-screen lg:pb-16">
      <motion.div style={reduceMotion ? undefined : { opacity, scale, y }} className="relative z-20 mx-auto h-full max-w-[1800px]">
      <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 18, filter: reduceMotion ? "none" : "blur(5px)" }} animate={{ opacity: introReady || reduceMotion ? 1 : 0, y: introReady || reduceMotion ? 0 : 18, filter: introReady || reduceMotion ? "none" : "blur(5px)" }} transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }} className="grid h-full gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,.82fr)] lg:items-center">
        <div className="flex flex-col justify-center space-y-7 xl:space-y-10">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.16em] text-signal"><span className="h-px w-10 bg-signal opacity-70" /> Data → models → systems</div>
          <h1 className="max-w-4xl text-[clamp(3.5rem,8.5vw,9.5rem)] font-black leading-[.78] tracking-[-.075em] text-foreground">Sneh<br />Raunak<span className="text-signal">.</span></h1>
          <p className="flex max-w-2xl flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs leading-relaxed tracking-[0.06em] text-foreground/70 sm:gap-x-3">
            <span className="whitespace-nowrap">AI / ML × Software Engineering</span>
            <span aria-hidden="true">·</span>
            <span className="whitespace-nowrap">Chandigarh University</span>
            <span aria-hidden="true">·</span>
            <span className="whitespace-nowrap">B.Tech CSE</span>
            <span aria-hidden="true">·</span>
            <span className="whitespace-nowrap">2023–2027</span>
          </p>
          <p className="max-w-xl text-base font-light leading-relaxed text-muted-foreground sm:text-lg 2xl:text-xl">I build explainable ML and full-stack products with attention to the systems, interfaces, and boundaries that make technical work usable.</p>
          <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
            <Magnetic><button onClick={() => { playClick(); setContactOpen(true); }} onMouseEnter={playHover} className="group relative flex h-14 w-fit items-center gap-3 overflow-hidden rounded-full bg-signal px-7 text-xs font-semibold tracking-[.16em] text-[#07100a] uppercase transition-transform hover:-translate-y-1">{dict.contactMe}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></button></Magnetic>
            <Magnetic><button onClick={() => { playClick(); scrollToProjects(); }} onMouseEnter={playHover} className="signal-ghost flex h-14 w-fit items-center gap-3 rounded-full border border-border/70 px-6 text-xs font-semibold tracking-[.14em] text-foreground uppercase transition-colors"><Mouse className="h-4 w-4" />{dict.exploreProjects}</button></Magnetic>
            <Magnetic><button onClick={() => { playClick(); setResumeOpen(true); }} onMouseEnter={playHover} className="signal-ghost flex h-14 w-fit items-center gap-3 rounded-full border border-border/70 px-6 text-xs font-semibold tracking-[.14em] text-foreground uppercase transition-colors"><FileText className="h-4 w-4" />{dict.resume}</button></Magnetic>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-xs tracking-[.1em] text-muted-foreground">
            <a href="https://github.com/snehOP9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-foreground"><span aria-hidden="true">↗</span>GITHUB</a>
            <a href="https://www.linkedin.com/in/sneh-raunak/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-foreground"><span aria-hidden="true">↗</span>LINKEDIN</a>
            <a href="/resume/Sneh_Raunak_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-foreground"><FileText className="h-4 w-4" />OPEN RESUME</a>
          </div>
        </div>
        <div className="relative mx-auto h-[min(54vh,600px)] w-full max-w-[620px] lg:h-[min(70vh,720px)]">
          <SSystem />
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap font-mono text-xs tracking-[.14em] text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_16px_var(--signal)]" /> Interactive identity system</div>
        </div>
      </motion.div>
      </motion.div>
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
      <ResumeModal open={resumeOpen} onOpenChange={setResumeOpen} />
    </section>
  );
}
