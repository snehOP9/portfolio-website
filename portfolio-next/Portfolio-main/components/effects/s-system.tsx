"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const S_PATH = "M518 142C472 104 414 84 342 84c-99 0-177 45-177 124 0 83 72 108 177 128 80 16 112 34 112 75 0 42-39 67-104 67-76 0-134-29-177-76l-63 70c54 62 136 96 237 96 109 0 194-48 194-135 0-92-76-115-181-136-77-15-109-31-109-68 0-37 37-60 92-60 58 0 108 23 144 59l72-76Z";

function OrbitLabel({ x, y, children }: { x: number; y: number; children: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-39" y="-16" width="78" height="32" rx="16" fill="rgba(8,12,13,.88)" stroke="rgba(192,255,104,.34)" />
      <text textAnchor="middle" dominantBaseline="middle" fill="rgba(235,255,222,.92)" fontSize="11" fontFamily="var(--font-inter)" letterSpacing="2.4">{children}</text>
    </g>
  );
}

export function SSystem() {
  const reduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  return (
    <div
      className="s-system"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTilt({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      aria-label="A custom S form surrounded by data, model, and system signals"
      role="img"
    >
      <motion.svg viewBox="0 0 760 760" className="h-full w-full overflow-visible" style={{ rotateX: tilt.y * -7, rotateY: tilt.x * 9, transformPerspective: 900 }}>
        <defs>
          <linearGradient id="s-metal" x1="180" y1="110" x2="560" y2="610" gradientUnits="userSpaceOnUse">
            <stop stopColor="#dcff94" />
            <stop offset=".15" stopColor="#26302b" />
            <stop offset=".45" stopColor="#050707" />
            <stop offset=".72" stopColor="#3d5145" />
            <stop offset="1" stopColor="#080b0a" />
          </linearGradient>
          <linearGradient id="s-edge" x1="240" y1="90" x2="500" y2="610" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(226,255,179,.95)" />
            <stop offset=".45" stopColor="rgba(168,255,81,.18)" />
            <stop offset="1" stopColor="rgba(238,255,220,.42)" />
          </linearGradient>
          <radialGradient id="s-glow" cx="50%" cy="45%" r="52%"><stop stopColor="rgba(185,255,91,.22)" /><stop offset="1" stopColor="rgba(185,255,91,0)" /></radialGradient>
          <filter id="s-shadow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="22" stdDeviation="20" floodColor="#000" floodOpacity=".7" /></filter>
          <filter id="s-bloom" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" /></filter>
          <path id="orbit-a" d="M118 382C118 208 653 172 653 382S118 556 118 382Z" />
          <path id="orbit-b" d="M196 233C358 126 604 263 499 486S80 468 196 233Z" />
        </defs>

        <circle cx="380" cy="380" r="290" fill="url(#s-glow)" />
        <motion.g animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 30, ease: "linear", repeat: Infinity }} style={{ transformOrigin: "380px 380px" }}>
          <ellipse cx="380" cy="382" rx="270" ry="139" fill="none" stroke="rgba(206,255,128,.24)" strokeWidth="1.5" />
          <ellipse cx="380" cy="382" rx="225" ry="280" fill="none" stroke="rgba(190,255,105,.13)" strokeWidth="1" transform="rotate(52 380 382)" />
          <circle r="7" fill="#d7ff8f" filter="url(#s-bloom)"><animateMotion dur="8s" repeatCount="indefinite" rotate="auto"><mpath href="#orbit-a" /></animateMotion></circle>
          <circle r="4" fill="#f1ffe0"><animateMotion dur="12s" repeatCount="indefinite" rotate="auto"><mpath href="#orbit-b" /></animateMotion></circle>
        </motion.g>

        <g opacity=".7"><path d="M120 382C120 208 650 172 650 382" fill="none" stroke="rgba(231,255,193,.58)" strokeWidth="1.25" strokeDasharray="3 8" /></g>
        <g filter="url(#s-shadow)">
          <path d={S_PATH} fill="url(#s-metal)" stroke="url(#s-edge)" strokeWidth="4" strokeLinejoin="round" />
          <path d={S_PATH} fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="1" strokeLinejoin="round" transform="translate(-5 -7)" />
        </g>
        <motion.g animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 38, ease: "linear", repeat: Infinity }} style={{ transformOrigin: "380px 380px" }}>
          <path d="M196 233C358 126 604 263 499 486" fill="none" stroke="rgba(196,255,109,.66)" strokeWidth="1.4" />
          <circle r="6" fill="#c6ff72" filter="url(#s-bloom)"><animateMotion dur="10s" repeatCount="indefinite" rotate="auto"><mpath href="#orbit-b" /></animateMotion></circle>
        </motion.g>
        <OrbitLabel x={156} y={326}>DATA</OrbitLabel>
        <OrbitLabel x={585} y={315}>MODELS</OrbitLabel>
        <OrbitLabel x={257} y={596}>SYSTEMS</OrbitLabel>
      </motion.svg>
    </div>
  );
}
