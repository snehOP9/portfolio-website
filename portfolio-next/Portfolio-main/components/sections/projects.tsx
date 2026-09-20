"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import type { ProjectItem } from "@/types/project";
import Magnetic from "@/components/effects/magnetic";
import { useSound } from "@/providers/sound-provider";
import { ProjectSignalScene } from "@/components/effects/project-signal-scene";

export default function Projects() {
    const { content, dict } = useLanguage();
    return (
        <section data-slot="projects" className="relative py-16 md:py-24 lg:py-32">
            <div id="projects-content" className="container mx-auto scroll-mt-28 px-container">
                <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
                    <div className="flex flex-col gap-4">
                        <BlurReveal><span className="title-counter">[001]</span></BlurReveal>
                        <BlurReveal><h2 className="title">{dict.title.projects}</h2></BlurReveal>
                    </div>
                    <BlurReveal>
                        <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                            {dict.projectsIntro}
                        </p>
                    </BlurReveal>
                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
                    {content.projects.map((project: ProjectItem) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>

        </section>
    );
}

const ProjectCard = React.memo(function ProjectCard({ project }: { project: ProjectItem }) {
    const { playHover, playClick } = useSound();
    const kind = project.title === "SentinelFlow" ? "sentinel" : project.title.startsWith("Student") ? "student" : "anony";

    return (
        <Magnetic disabled>
            <Link
                    href={`/projects/${project.title === "SentinelFlow" ? "sentinelflow" : project.title.startsWith("Student") ? "student-performance-predictor" : "anony-talk"}/`}
                    aria-label={`Read ${project.title} case study`}
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="group relative min-h-[29rem] w-full cursor-pointer text-left perspective-1000 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                >
                    <div className="absolute inset-0 overflow-hidden rounded-2xl border border-[#d1ff82]/25 bg-[#07100a] text-white shadow-2xl transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:border-[#d1ff82]/65">
                        <div className="absolute inset-0 z-0">
                            <ProjectSignalScene kind={kind} />
                            <div className="absolute inset-0 bg-linear-to-t from-[#07100a] via-[#07100a]/45 to-[#07100a]/10" />
                            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.48),transparent_58%)]" />
                        </div>

                        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 xl:p-8">
                            <div className="flex items-start justify-between gap-3">
                                <span className="rounded-full border border-white/25 bg-black/35 px-3 py-2 font-mono text-xs tracking-[0.08em] text-white/95 backdrop-blur-md">
                                    {project.category}
                                </span>
                                <span className="rounded-full border border-white/25 bg-black/35 px-3 py-2 font-mono text-xs tracking-[0.08em] text-white/95 backdrop-blur-md">
                                    {project.year}
                                </span>
                            </div>

                            <div className="max-w-[94%]">
                                <h3 className="text-4xl font-black tracking-tighter text-white sm:text-5xl">
                                    {project.title}
                                </h3>
                                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">{project.description}</p>
                                <div className="mt-5 flex flex-wrap gap-2 font-mono text-[10px] tracking-[.12em] text-signal">
                                    <span className="rounded-full border border-signal/45 bg-black/35 px-3 py-2">PUBLIC DEMO</span>
                                    <span className="rounded-full border border-white/25 bg-black/35 px-3 py-2">SOURCE AVAILABLE</span>
                                    <span className="rounded-full border border-white/25 bg-black/35 px-3 py-2">CASE STUDY</span>
                                </div>
                                <span className="project-detail-cta mt-5 inline-flex items-center rounded-full border border-signal bg-black/45 px-5 py-3 text-base font-bold text-signal backdrop-blur-md transition-colors">
                                    View project details →
                                </span>
                            </div>
                        </div>
                    </div>
            </Link>
        </Magnetic>
    );
});
