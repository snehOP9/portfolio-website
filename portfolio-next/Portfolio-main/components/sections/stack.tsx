"use client";

import Image from "next/image";
import { useLanguage } from "@/providers/language-provider";
import Magnetic from "@/components/effects/magnetic";
import { BlurReveal } from "@/components/effects/blur-reveal";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { StackItem } from "@/types/stack";
import { motion, useReducedMotion } from "framer-motion";

export default function Stack() {
    const { content, dict } = useLanguage();
    const reduceMotion = useReducedMotion();

    const categories = [
        {
            title: "ML / AI",
            evidence: "Modelling, evaluation, and explainability",
            items: content.stack?.frontend || [],
        },
        {
            title: "Backend",
            evidence: "APIs, model-serving, and application flows",
            items: content.stack?.backend || [],
        },
        {
            title: "Data",
            evidence: "State, persistence, and data boundaries",
            items: content.stack?.database || [],
        },
        {
            title: "Engineering",
            evidence: "Delivery and collaboration systems",
            items: content.stack?.tools || [],
        },
    ];

    return (
        <section className="w-full bg-background text-foreground overflow-hidden relative py-16 md:py-24 lg:py-32 xl:py-40 2xl:py-36">

            <div id="stack-content" className="h-full flex scroll-mt-28 flex-col px-container container mx-auto">
                <div className="grid gap-6 mb-16 lg:grid-cols-[1fr_.8fr] lg:items-end">
                    <BlurReveal>
                        <div><span className="title-counter">[004]</span>
                        <h2 className="title mt-4">{dict.title.stack}</h2></div>
                    </BlurReveal>
                    <BlurReveal>
                        <p className="max-w-lg text-base leading-relaxed text-muted-foreground">Capabilities are shown as the systems they help ship—not as a detached tool collection.</p>
                    </BlurReveal>
                </div>

                <div className="mb-6 flex flex-col gap-10">
                    {categories.map((category, catIndex) => (
                        <BlurReveal key={category.title}>
                            <motion.div initial={{ opacity: 0, x: reduceMotion ? 0 : -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .6, delay: catIndex * .08, ease: [0.16, 1, 0.3, 1] }}>
                                <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                                    <span className="text-xs font-mono tracking-widest text-muted-foreground/60">
                                        0{catIndex + 1}
                                    </span>
                                    <h3 className="text-base font-bold tracking-[0.06em] text-muted-foreground">
                                        {category.title}
                                    </h3>
                                    <span className="text-xs font-mono tracking-[.06em] text-signal-muted">{category.evidence}</span>
                                </div>

                                <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(10.5rem,1fr))] gap-x-6 gap-y-3">
                                    {category.items.map((item: StackItem) => (
                                        <HoverCard key={item.name} openDelay={50} closeDelay={50}>
                                            <HoverCardTrigger asChild>
                                                <div className="h-full w-full">
                                                    <Magnetic intensity={0.15}>
                                                        <div className="group flex min-h-12 items-center gap-3 rounded-xl border border-border/40 bg-secondary/10 px-3 py-2 transition-colors duration-300 hover:border-foreground/30 hover:bg-secondary/30">
                                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-background/70 p-1 transition-transform duration-300 group-hover:scale-105">
                                                                {item.icon ? <Image
                                                                    src={item.icon}
                                                                    alt={item.name}
                                                                    width={36}
                                                                    height={36}
                                                                    className={`h-10 w-10 object-contain ${item.name === "Next.js" || item.name === "Vercel" ? "dark:invert dark:brightness-200" : ""}`}
                                                                    unoptimized={item.icon.endsWith('.svg')}
                                                                /> : <span className="font-mono text-[10px] text-signal">{item.name.slice(0, 2).toUpperCase()}</span>}
                                                            </div>
                                                            <span className="text-sm leading-none tracking-wide text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                    </Magnetic>
                                                </div>
                                            </HoverCardTrigger>
                                            <HoverCardContent
                                                side="top"
                                                align="center"
                                                className="w-auto p-4 flex flex-col items-center justify-center gap-4 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl overflow-hidden"
                                            >
                                                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
                                                <div className="absolute inset-0 bg-linear-to-tr from-foreground/5 to-transparent pointer-events-none" />

                                                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 ring-1 ring-border/50 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                    {item.icon ? <Image src={item.icon} alt={item.name} width={36} height={36} className="drop-shadow-lg" unoptimized={item.icon.endsWith('.svg')} /> : <span className="font-mono text-[10px] text-signal">{item.name.slice(0, 2).toUpperCase()}</span>}
                                                </div>
                                                <div className="flex flex-col items-center justify-center gap-1 z-10">
                                                    <span className="text-sm font-bold tracking-[0.15em] uppercase text-foreground">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground tracking-wide font-mono">
                                                        {category.title}
                                                    </span>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    ))}
                                </div>
                            </motion.div>
                        </BlurReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
