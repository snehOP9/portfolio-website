"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import type { RoadmapItem } from "@/types/roadmap";

export default function Roadmap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { content, dict } = useLanguage();
    const roadmapItems: RoadmapItem[] = content.roadmap || [];

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section ref={containerRef} className="relative overflow-hidden border-t border-border/50 py-20 md:py-28 xl:py-32">
            <div className="absolute top-1/4 left-0 w-full max-w-lg h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2" />
            <div className="absolute bottom-1/4 right-0 w-full max-w-lg h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2" />

            <div className="container mx-auto px-container max-w-6xl relative z-10">

                <div className="mb-14 flex flex-col gap-4 text-center md:mb-20 md:items-center">
                    <BlurReveal>
                        <span className="title-counter">
                            [005]
                        </span>
                    </BlurReveal>

                    <BlurReveal>
                        <h2 className="title">
                            {dict.title.roadmap}
                        </h2>
                    </BlurReveal>

                    <BlurReveal>
                        <p className="text-lg mt-3 max-w-xl italic font-medium tracking-tight text-foreground/60">
                            {dict.roadmapDescription}
                        </p>
                    </BlurReveal>
                </div>

                <div className="relative">
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border/40 -translate-x-1/2" />

                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-primary via-primary to-transparent shadow-[0_0_10px_rgba(var(--primary),0.5)] -translate-x-1/2 z-10"
                    />

                    <div className="relative z-20 flex w-full flex-col gap-8 md:gap-12">
                        {roadmapItems.map((item: RoadmapItem, index: number) => (
                            <TimelineNode
                                key={item.id}
                                item={item}
                                isEven={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const TimelineNode = React.memo(function TimelineNode({ item, isEven }: { item: RoadmapItem, isEven: boolean }) {
    return (
        <div className={cn("relative flex items-center justify-between w-full", isEven ? "flex-row" : "flex-row-reverse")}>

            <div className="w-[calc(50%-3rem)] hidden md:block" />

            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-border/50 bg-background z-20 flex items-center justify-center shadow-lg group-hover:border-primary/50 transition-colors duration-500">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
            </div>

            <div
                className={cn(
                    "relative w-full pl-16 md:min-h-[18rem] md:w-[calc(50%-3rem)] md:pl-0 group",
                )}
            >
                <BlurReveal>
                    <div className={cn(
                        "relative overflow-hidden border border-border/50 bg-secondary/5 p-6 backdrop-blur-md transition-all duration-700 ease-out md:p-8",
                        "hover:bg-secondary/20 hover:border-border hover:shadow-2xl",
                        isEven ? "md:text-left" : "md:text-right"
                    )}>

                        <span className={cn(
                            "max-sm:hidden text-xs font-mono tracking-widest text-muted-foreground uppercase flex mb-4",
                            isEven ? "md:justify-start" : "md:justify-end"
                        )}>
                            {item.id}
                        </span>

                        <div className="flex flex-col gap-3 relative z-10">
                            <h3 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter font-serif italic font-semibold text-foreground uppercase mt-2 group-hover:text-primary transition-colors duration-500">
                                {item.year}
                            </h3>

                            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-2 max-w-sm ml-0 md:max-w-md"
                                style={{ marginLeft: isEven ? '0' : 'auto' }}>
                                {item.description}
                            </p>

                            <div className={cn("mt-6 flex flex-wrap gap-2", isEven ? "md:justify-start" : "justify-end")}>
                                {item.stack.map((tag: string) => (
                                    <span
                                        key={tag}
                                        className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-3 py-1 rounded-full border border-border/40 bg-background/50 shadow-sm"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className={cn(
                            "absolute top-1/2 -translate-y-1/2 text-[10rem] font-black italic text-foreground/3 select-none pointer-events-none transition-all duration-700",
                            isEven ? "-left-12" : "-right-12 text-right"
                        )}>
                            {item.year.slice(2)}
                        </div>

                    </div>
                </BlurReveal>
            </div>
        </div>
    );
});
