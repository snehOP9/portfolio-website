"use client";

import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/providers/language-provider";
import { useMediaQuery, BREAKPOINTS } from "@/hooks/use-media-query";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";
import type { ProjectItem } from "@/types/project";
import Magnetic from "@/components/effects/magnetic";
import { useSound } from "@/providers/sound-provider";
import { ProjectSignalScene } from "@/components/effects/project-signal-scene";

export default function Projects() {
    const { content, dict } = useLanguage();

    const isDesktop = useMediaQuery(BREAKPOINTS.xl);

    const targetRef = useRef<HTMLDivElement>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);

    const [measurements, setMeasurements] = useState({ scrollRange: 0, dynamicHeight: "auto" });
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!isDesktop) {
            const frame = requestAnimationFrame(() => {
                setMeasurements({ scrollRange: 0, dynamicHeight: "auto" });
            });
            return () => cancelAnimationFrame(frame);
        }

        const updateMeasurements = () => {
            if (horizontalContainerRef.current) {
                const totalWidth = horizontalContainerRef.current.scrollWidth;
                const viewportW = window.innerWidth;
                const range = totalWidth - viewportW;
                const safeRange = range > 0 ? range : 0;

                setMeasurements({
                    scrollRange: safeRange,
                    dynamicHeight: `${safeRange + window.innerHeight}px`,
                });
            }
        };

        updateMeasurements();

        const timeout = setTimeout(updateMeasurements, 100);
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(updateMeasurements);
        });

        if (horizontalContainerRef.current) {
            resizeObserver.observe(horizontalContainerRef.current);
        }

        return () => {
            clearTimeout(timeout);
            resizeObserver.disconnect();
        };
    }, [isDesktop, content.projects]);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -measurements.scrollRange]);
    const smoothX = useSpring(x, { stiffness: 400, damping: 60, restDelta: 0.5 });

    const handleOpenProject = (project: ProjectItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section
            ref={targetRef}
            data-slot="projects"
            className="relative py-16 md:py-24 lg:py-32 xl:py-0"
            style={{ height: measurements.dynamicHeight }}
        >
            <div
                className={`
                    w-full 
                    ${isDesktop
                        ? "sticky top-0 h-screen flex items-center overflow-hidden"
                        : "relative flex flex-col"
                    }
                `}
            >

                {!isDesktop ? (
                    <>
                        <div className="flex flex-col gap-4 px-container mb-10">
                            <BlurReveal>
                                <span className="title-counter">
                                    [003]
                                </span>
                            </BlurReveal>

                            <BlurReveal>
                                <h2 className="title">
                                    {dict.title.projects}
                                </h2>
                            </BlurReveal>

                            <BlurReveal>
                                <p className="mt-4 text-muted-foreground text-lg">
                                    {dict.projectsIntro}
                                </p>
                            </BlurReveal>
                        </div>
                        <div className="flex flex-col w-full max-w-full px-container gap-container">
                            {content.projects.map((project: ProjectItem) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => handleOpenProject(project)}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <motion.div
                        ref={horizontalContainerRef}
                        style={{ x: smoothX }}
                        className="flex w-max items-center px-container pr-[14vw]"
                    >
                        <div className="w-[42vw] shrink-0 flex flex-col justify-center pr-10">

                            <div className="flex flex-col gap-4">

                                <BlurReveal>
                                    <span className="title-counter">
                                        [003]
                                    </span>
                                </BlurReveal>

                                <BlurReveal>
                                    <h2 className="title">
                                        {dict.title.projects}
                                    </h2>
                                </BlurReveal>

                                <BlurReveal>
                                    <p className="mt-4 max-w-xl text-4xl font-light leading-tight 2xl:text-5xl">
                                        {dict.projectsIntro}
                                    </p>
                                </BlurReveal>

                                <BlurReveal>
                                    <div className="mt-12 flex items-center gap-4">
                                        <div className="h-px w-24 bg-border" />
                                        <span className="text-sm font-mono text-foreground/40 uppercase">
                                            {dict.projectsScrollText}
                                        </span>
                                    </div>
                                </BlurReveal>

                            </div>

                        </div>

                        {content.projects.map((project: ProjectItem) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => handleOpenProject(project)}
                            />
                        ))}

                        <div className="w-[16vw] h-[70vh] shrink-0 flex flex-col justify-center items-center">
                            <h3 className="text-[7vw] font-black tracking-tighter text-border uppercase">
                                {dict.projectsEndText}
                            </h3>
                        </div>
                    </motion.div>
                )}
            </div>

            <ProjectModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                project={selectedProject}
            />
        </section>
    );
}

const ProjectCard = React.memo(function ProjectCard({ project, onClick }: { project: ProjectItem; onClick?: () => void }) {
    const { playHover, playClick } = useSound();
    const kind = project.title === "SentinelFlow" ? "sentinel" : project.title.startsWith("Student") ? "student" : "anony";

    return (
        <BlurReveal>
            <Magnetic intensity={0.05}>
                <div
                    onClick={() => {
                        playClick();
                        onClick?.();
                    }}
                    onMouseEnter={playHover}
                    className="group relative w-full aspect-[4/5] shrink-0 md:aspect-[16/10] xl:mx-5 xl:w-[min(56vw,820px)] perspective-1000 cursor-pointer"
                >
                    <div className="absolute inset-0 overflow-hidden rounded-3xl bg-muted border border-border/50 shadow-2xl transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:border-foreground/35">
                        <div className="absolute inset-0 z-0">
                            <ProjectSignalScene kind={kind} />
                            <div className="absolute inset-0 bg-linear-to-t from-background via-background/35 to-background/5" />
                            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.54),transparent_58%)]" />
                        </div>

                        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 xl:p-10">
                            <div className="flex justify-between items-start">
                                <div className="rounded-full border border-foreground/15 bg-background/40 px-3 py-2 backdrop-blur-md">
                                    <span className="block text-[10px] xl:text-xs font-mono tracking-[0.18em] text-foreground/85 uppercase">
                                        {project.category}
                                    </span>
                                </div>
                                <div className="rounded-full border border-foreground/15 bg-background/40 px-3 py-2 backdrop-blur-md">
                                    <span className="block text-[10px] xl:text-xs font-mono tracking-[0.18em] text-foreground/85">
                                        {project.year}
                                    </span>
                                </div>
                            </div>

                            <div className="max-w-[86%]">
                                <span className="mb-3 block font-mono text-[10px] tracking-[0.24em] text-[#d7ff8f]/80 uppercase">Open system →</span>
                                <h3 className="text-4xl font-black tracking-tighter uppercase text-foreground sm:text-5xl xl:text-6xl">
                                    {project.title}
                                </h3>
                            </div>
                        </div>

                    </div>
                </div>
            </Magnetic>
        </BlurReveal>
    );
});
