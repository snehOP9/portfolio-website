"use client";

import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type SceneKind = "sentinel" | "student" | "anony";

function useSceneVisibility() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return { ref, active };
}

const sceneCopy: Record<SceneKind, { label: string; system: string }> = {
  sentinel: { label: "Live decision lattice", system: "Synthetic signals / policy paths" },
  student: { label: "Learning-signal pipeline", system: "Features / model / guidance" },
  anony: { label: "Private connection field", system: "Avatars / messages / relate" },
};

export function ProjectSignalScene({ kind }: { kind: SceneKind }) {
  const { ref, active } = useSceneVisibility();
  const reduceMotion = useReducedMotion();
  const play = active && !reduceMotion;
  const common: { animate: TargetAndTransition; transition: Transition } = { animate: play ? { opacity: [0.35, 1, 0.35] } : { opacity: 0.62 }, transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } };

  return (
    <div ref={ref} className="project-signal-scene" data-active={play} data-scene={kind} aria-label={sceneCopy[kind].label} role="img">
      <div className="project-signal-glow" />
      <svg viewBox="0 0 720 480" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`line-${kind}`} x1="0" x2="1"><stop stopColor="rgba(205,255,125,0)" /><stop offset=".5" stopColor="rgba(205,255,125,.9)" /><stop offset="1" stopColor="rgba(205,255,125,0)" /></linearGradient>
          <radialGradient id={`orb-${kind}`}><stop stopColor="rgba(222,255,175,.96)" /><stop offset=".25" stopColor="rgba(171,255,73,.55)" /><stop offset="1" stopColor="rgba(171,255,73,0)" /></radialGradient>
          <filter id={`blur-${kind}`}><feGaussianBlur stdDeviation="9" /></filter>
          <path id={`route-${kind}`} d="M60 335C185 250 205 150 356 240S521 342 675 132" />
        </defs>
        {kind === "sentinel" && <SentinelScene play={play} common={common} />}
        {kind === "student" && <StudentScene play={play} common={common} />}
        {kind === "anony" && <AnonyScene play={play} common={common} />}
      </svg>
      <div className="project-signal-scan" />
    </div>
  );
}

function SentinelScene({ play, common }: { play: boolean; common: { animate: TargetAndTransition; transition: Transition } }) {
  return <>
    {[110, 202, 294].map((x, index) => <motion.path key={x} d={`M${x} 100 C${x + 80} 160 ${x - 50} 304 356 244`} fill="none" stroke="rgba(205,255,125,.28)" strokeWidth="1.5" strokeDasharray="5 11" animate={play ? { pathLength: [0.25, 1, 0.25], opacity: [0.18, 0.85, 0.18] } : { opacity: 0.35 }} transition={{ duration: 4 + index, repeat: Infinity, ease: "linear" }} />)}
    <motion.g animate={play ? { rotate: 360 } : undefined} transition={{ duration: 17, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "360px 244px" }}>
      {[0, 60, 120].map((rotate) => <rect key={rotate} x="300" y="184" width="120" height="120" rx="18" fill="none" stroke="rgba(214,255,150,.38)" transform={`rotate(${rotate} 360 244)`} />)}
    </motion.g>
    <circle cx="360" cy="244" r="58" fill="url(#orb-sentinel)" filter="url(#blur-sentinel)" />
    <circle cx="360" cy="244" r="17" fill="rgba(220,255,172,.92)" />
    <motion.path d="M360 244C455 194 517 210 640 165" fill="none" stroke="url(#line-sentinel)" strokeWidth="3" {...common} />
    {[80, 145, 610, 665].map((x, index) => <motion.circle key={x} cx={x} cy={index < 2 ? 345 - index * 90 : 165 + index * 35} r="8" fill="rgba(205,255,125,.9)" animate={play ? { scale: [0.7, 1.45, 0.7], opacity: [0.4, 1, 0.4] } : { opacity: 0.6 }} transition={{ duration: 2.5 + index * .35, repeat: Infinity }} />)}
  </>;
}

function StudentScene({ play, common }: { play: boolean; common: { animate: TargetAndTransition; transition: Transition } }) {
  return <>
    {[{ x: 102, y: 130 }, { x: 105, y: 240 }, { x: 102, y: 350 }, { x: 224, y: 110 }, { x: 220, y: 372 }].map((point, index) => <motion.g key={`${point.x}-${point.y}`} animate={play ? { y: [0, index % 2 ? -11 : 11, 0] } : undefined} transition={{ duration: 3.6 + index * .2, repeat: Infinity, ease: "easeInOut" }}><rect x={point.x - 29} y={point.y - 18} width="58" height="36" rx="18" fill="rgba(14,22,20,.78)" stroke="rgba(209,255,130,.38)" /><circle cx={point.x - 13} cy={point.y} r="4" fill="rgba(209,255,130,.9)" /><path d={`M${point.x - 2} ${point.y}h18`} stroke="rgba(239,255,215,.8)" /></motion.g>)}
    {[0, 1, 2].map((layer) => <motion.rect key={layer} x={306 + layer * 19} y={145 + layer * 19} width="130" height="190" rx="16" fill="rgba(170,255,75,.04)" stroke="rgba(211,255,147,.42)" animate={play ? { x: [0, layer % 2 ? 8 : -8, 0], opacity: [.45, .95, .45] } : { opacity: .5 }} transition={{ duration: 5.4 + layer, repeat: Infinity, ease: "easeInOut" }} />)}
    <motion.path d="M140 230C214 230 250 230 325 230M140 340C220 322 260 280 325 274M140 125C220 155 266 180 325 197" stroke="url(#line-student)" strokeWidth="2.5" fill="none" {...common} />
    <motion.g animate={play ? { rotate: 360 } : undefined} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "555px 244px" }}><circle cx="555" cy="244" r="76" fill="none" stroke="rgba(209,255,130,.46)" strokeDasharray="4 11" /><circle cx="555" cy="244" r="45" fill="rgba(184,255,94,.12)" stroke="rgba(226,255,176,.72)" /></motion.g>
    <path d="M510 244h90" stroke="url(#line-student)" strokeWidth="3" />
  </>;
}

function AnonyScene({ play, common }: { play: boolean; common: { animate: TargetAndTransition; transition: Transition } }) {
  const nodes = [{ x: 170, y: 160 }, { x: 170, y: 330 }, { x: 360, y: 245 }, { x: 550, y: 145 }, { x: 555, y: 340 }];
  return <>
    {nodes.map((node, index) => <motion.g key={`${node.x}-${node.y}`} animate={play ? { y: [0, index % 2 ? -12 : 12, 0] } : undefined} transition={{ duration: 4 + index * .32, repeat: Infinity, ease: "easeInOut" }}><circle cx={node.x} cy={node.y} r={index === 2 ? 58 : 36} fill="rgba(171,255,76,.07)" stroke="rgba(218,255,159,.38)" /><circle cx={node.x} cy={node.y} r={index === 2 ? 24 : 13} fill="rgba(220,255,172,.78)" /><path d={`M${node.x - 14} ${node.y + 21}q14 12 28 0`} fill="none" stroke="rgba(223,255,185,.68)" /></motion.g>)}
    {[[170, 160, 360, 245], [170, 330, 360, 245], [360, 245, 550, 145], [360, 245, 555, 340]].map(([x1, y1, x2, y2], index) => <motion.path key={index} d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - 58} ${x2} ${y2}`} fill="none" stroke="rgba(207,255,123,.38)" strokeWidth="1.8" strokeDasharray="5 8" animate={play ? { pathOffset: [0, -1] } : undefined} transition={{ duration: 5 + index, repeat: Infinity, ease: "linear" }} />)}
    <motion.path id="message-path" d="M170 160Q280 120 360 245T550 145" fill="none" stroke="url(#line-anony)" strokeWidth="2.5" {...common} />
    <circle cx="360" cy="245" r="9" fill="rgba(225,255,188,.98)" opacity={play ? 1 : .6}><animateMotion dur="5.5s" begin={play ? "0s" : "indefinite"} repeatCount="indefinite" rotate="auto"><mpath href="#route-anony" /></animateMotion></circle>
  </>;
}
