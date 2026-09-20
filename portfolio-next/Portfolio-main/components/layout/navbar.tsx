"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeSwitcher from "@/components/widgets/theme-switcher";
import { useLenis } from "@/providers/smooth-scroll-provider";
import SoundToggle from "@/components/widgets/sound-toggle";
import Magnetic from "@/components/effects/magnetic";
import { useSound } from "@/providers/sound-provider";
import { useModalHistory } from "@/hooks/use-modal-history";

const contentTargetIds: Record<string, string> = {
  work: "projects-content",
  about: "about-content",
  stack: "stack-content",
  projects: "projects-content",
  research: "research-content",
  roadmap: "roadmap-content",
  contact: "contact-content",
};

export default function Navbar() {
  const router = useRouter();
  const lenis = useLenis();
  const { playHover, playClick } = useSound();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useModalHistory(isMobileMenuOpen, setIsMobileMenuOpen, "mobile-menu");

  const [dimensions, setDimensions] = useState({
    screenWidth: 1920,
    containerWidth: 1280,
    scrollHeight: 800,
  });

  const dummyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, dimensions.scrollHeight], [0, 1]);

  const py = useTransform(scrollY, [0, dimensions.scrollHeight], [24, 12]);

  const startWidth = Math.max(dimensions.screenWidth, dimensions.containerWidth);
  const navMaxWidth = useTransform(scrollY, [0, dimensions.scrollHeight], [startWidth, dimensions.containerWidth]);

  const navLinks = useMemo(() => [
    { name: "Home", href: "#home" },
    { name: "Work", href: "#work" },
    { name: "Research", href: "#research" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ], []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateDimensions = () => {
      setDimensions({
        screenWidth: window.innerWidth,
        scrollHeight: window.innerHeight,
        containerWidth: dummyRef.current ? dummyRef.current.getBoundingClientRect().width : 1280,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const overflowVal = isMobileMenuOpen ? "hidden" : "";
    document.body.style.overflow = overflowVal;
    document.documentElement.style.overflow = overflowVal;

    if (isMobileMenuOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      lenis?.start();
    };
  }, [isMobileMenuOpen, lenis]);

  const scrollTarget = useCallback((targetId: string) => {
    const contentTargetId = contentTargetIds[targetId] ?? targetId;
    const elem = document.getElementById(contentTargetId);

    if (elem || targetId === "home") {
      let navbarHeight = 80;
      if (headerRef.current) {
        const currentHeight = headerRef.current.offsetHeight;
        const currentScroll = window.scrollY;
        const currentPy = currentScroll >= dimensions.scrollHeight
          ? 12
          : 24 - (currentScroll / dimensions.scrollHeight) * 12;
        const heightDifference = (currentPy - 12) * 2;
        navbarHeight = Math.max(currentHeight - heightDifference, 0);
      }

      // Resolve a numeric destination. Passing an element to Lenis also applies
      // its CSS scroll-margin/padding calculation, which left a large gap above
      // every section on desktop browsers.
      const destination = targetId === "home"
        ? 0
        : elem!.getBoundingClientRect().top + window.scrollY - navbarHeight - 12;

      if (lenis) {
        lenis.scrollTo(destination, {
          duration: 1.5,
        });
      } else {
        if (targetId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (elem) {
          window.scrollTo({
            top: destination,
            behavior: "smooth",
          });
        }
      }
    }
  }, [lenis, dimensions.scrollHeight]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleHashNavigation = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      scrollTarget(hash);
    };

    // Native hash navigation runs before React hydrates and lands on the outer
    // section wrapper. Re-run it after the intro is gone so deep links use the
    // visible content anchors too.
    const initialNavigation = window.setTimeout(handleHashNavigation, 0);
    window.addEventListener("popstate", handleHashNavigation);
    window.addEventListener("hashchange", handleHashNavigation);

    return () => {
      window.clearTimeout(initialNavigation);
      window.removeEventListener("popstate", handleHashNavigation);
      window.removeEventListener("hashchange", handleHashNavigation);
    };
  }, [scrollTarget]);

  useEffect(() => {
    const sectionIds = navLinks.map(({ href }) => href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.01, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navLinks]);

  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    if (window.location.pathname !== "/" && window.location.pathname !== "/en/") {
      router.push(`/${href}`);
      return;
    }
    setActiveSection(targetId);

    if (typeof window !== "undefined") {
      const newHash = targetId === "home" ? "" : `#${targetId}`;
      const targetUrl = newHash ? newHash : window.location.pathname + window.location.search;
      if (window.location.hash !== (newHash || "")) {
        window.history.pushState({ section: targetId }, "", targetUrl);
      }
    }

    setIsMobileMenuOpen(false);

    setTimeout(() => {
      scrollTarget(targetId);
    }, 100);
  }, [scrollTarget, router]);

  return (
    <motion.header
      ref={headerRef}
      style={{
        paddingTop: py,
        paddingBottom: py,
      }}
      className="fixed top-0 left-0 right-0 z-100 transition-colors duration-300"
    >
      <div ref={dummyRef} className="container invisible absolute pointer-events-none -z-50" />

      <motion.div
        style={{
          opacity: bgOpacity,
        }}
        className="absolute inset-0 bg-background/75 border-b border-border/40 backdrop-blur-md -z-10 pointer-events-none"
      />

      <motion.nav
        style={{
          maxWidth: navMaxWidth,
        }}
        className="mx-auto px-container flex items-center justify-between w-full"
      >
        <Link
          href="#home"
          onClick={(e) => {
            playClick();
            scrollToSection(e, "#home");
          }}
          onMouseEnter={playHover}
          className="relative z-110 flex h-11 w-11 items-center justify-center gap-2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal group"
        >
          <svg viewBox="0 0 100 100" className="h-8 w-8 text-foreground transition-all duration-300 group-hover:scale-110 group-hover:opacity-70" aria-label="Sneh Raunak">
            <path d="M72 24C65 17 52 14 40 17C27 20 21 29 23 39C25 49 35 52 47 54C58 56 64 59 63 66C62 73 53 77 43 76C33 75 25 70 21 64" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <div className="hidden xl:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Magnetic intensity={0.2}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      playClick();
                      scrollToSection(e, link.href);
                    }}
                    onMouseEnter={playHover}
                    aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
                    className={`group relative flex min-h-11 items-center py-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal ${activeSection === link.href.slice(1) ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 h-px bg-foreground transition-all duration-300 ${activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>
                </Magnetic>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <SoundToggle />
            <ThemeSwitcher />
          </div>
        </div>

        <div className="flex xl:hidden items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className="relative z-110 flex h-11 w-11 items-center justify-center text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-90 bg-background xl:hidden flex flex-col h-dvh w-screen"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent)] pointer-events-none" />
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

            <div className="flex flex-col flex-1 pt-24 sm:pt-32 pb-24 sm:pb-12 px-container overflow-y-auto relative z-10">
              <ul className="flex flex-col gap-6 sm:gap-8">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + (i * 0.05),
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        playClick();
                        scrollToSection(e, link.href);
                      }}
                      aria-current={activeSection === link.href.slice(1) ? "page" : undefined}
                      className="group flex min-h-11 items-baseline rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                    >
                      <span className={`text-4xl font-black tracking-tighter uppercase transition-all duration-300 group-hover:pl-4 group-hover:text-primary ${activeSection === link.href.slice(1) ? "text-primary" : "text-foreground"}`}>
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <SoundToggle />
                  <ThemeSwitcher />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
