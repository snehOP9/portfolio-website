"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";

export default function Research() {
    const { content } = useLanguage();
    const reduceMotion = useReducedMotion();
    const research = content.research;

    return (
        <section className="relative overflow-hidden bg-background py-24 md:py-32 xl:py-44">
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/50 to-transparent" />

            <div className="container relative mx-auto px-container">
                <div className="grid gap-16 xl:grid-cols-[0.9fr_1.1fr] xl:items-center xl:gap-24">
                    <div>
                        <BlurReveal>
                            <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground">[004] {research.eyebrow}</p>
                        </BlurReveal>
                        <BlurReveal>
                            <h2 className="mt-7 max-w-3xl text-5xl font-black leading-[0.86] tracking-tighter sm:text-6xl lg:text-7xl xl:text-8xl">
                                Explain the<br />black box.
                            </h2>
                        </BlurReveal>
                        <BlurReveal>
                            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-muted-foreground">
                                {research.summary}
                            </p>
                        </BlurReveal>
                        <BlurReveal>
                            <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/25 px-4 py-2 font-mono text-xs tracking-[0.12em] text-foreground/80">
                                {research.status}<ArrowUpRight className="h-3.5 w-3.5" />
                            </p>
                        </BlurReveal>
                    </div>

                    <BlurReveal>
                        <div className="relative min-h-[480px] overflow-hidden rounded-[2rem] border border-border/70 bg-card/40 p-5 shadow-2xl sm:p-8">
                            <motion.div
                                animate={reduceMotion ? undefined : { rotate: 360 }}
                                transition={{ duration: 42, ease: "linear", repeat: Infinity }}
                                className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-dashed border-foreground/20"
                            />
                            <motion.div
                                animate={reduceMotion ? undefined : { rotate: -360 }}
                                transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                                className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full border border-foreground/10"
                            />
                            <div className="relative grid gap-3 sm:grid-cols-2">
                                {research.themes.map((theme: string, index: number) => (
                                    <motion.div
                                        key={theme}
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.35 }}
                                        transition={{ delay: index * 0.07, duration: 0.55 }}
                                        className="group relative overflow-hidden rounded-2xl border border-border/70 bg-background/65 p-5 backdrop-blur-md transition-colors duration-500 hover:border-foreground/35"
                                    >
                                        <span className="font-mono text-xs tracking-[0.14em] text-muted-foreground">0{index + 1}</span>
                                        <p className="mt-9 text-xl font-semibold tracking-tight text-foreground">{theme}</p>
                                        <div className="absolute bottom-0 left-0 h-px w-0 bg-foreground transition-all duration-500 group-hover:w-full" />
                                    </motion.div>
                                ))}
                            </div>
                            <div className="relative mt-3 rounded-2xl border border-border/70 bg-background/65 p-6 backdrop-blur-md sm:p-8">
                                <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground">Research focus</p>
                                <h3 className="mt-4 max-w-2xl text-2xl font-medium leading-tight tracking-tight sm:text-3xl">{research.title}</h3>
                            </div>
                        </div>
                    </BlurReveal>
                </div>
            </div>
        </section>
    );
}
