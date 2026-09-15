"use client";

import React, { useState } from "react";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";
import type { ProjectItem } from "@/types/project";
import Magnetic from "@/components/effects/magnetic";
import { useSound } from "@/providers/sound-provider";
import { ProjectSignalScene } from "@/components/effects/project-signal-scene";

export default function Projects() {
    const { content, dict } = useLanguage();
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenProject = (project: ProjectItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section data-slot="projects" className="relative py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-container">
                <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
                    <div className="flex flex-col gap-4">
                        <BlurReveal><span className="title-counter">[003]</span></BlurReveal>
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
                        <ProjectCard key={project.id} project={project} onClick={() => handleOpenProject(project)} />
                    ))}
                </div>
            </div>

            <ProjectModal open={isModalOpen} onOpenChange={setIsModalOpen} project={selectedProject} />
        </section>
    );
}

const ProjectCard = React.memo(function ProjectCard({ project, onClick }: { project: ProjectItem; onClick?: () => void }) {
    const { playHover, playClick } = useSound();
    const kind = project.title === "SentinelFlow" ? "sentinel" : project.title.startsWith("Student") ? "student" : "anony";

    return (
        <Magnetic disabled>
            <button
                    type="button"
                    aria-haspopup="dialog"
                    aria-label={`Open ${project.title} project details`}
                    onClick={() => {
                        playClick();
                        onClick?.();
                    }}
                    onMouseEnter={playHover}
                    className="group relative aspect-[4/5] w-full cursor-pointer text-left perspective-1000 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal sm:aspect-[16/10] xl:aspect-[4/5]"
                >
                    <div className="absolute inset-0 overflow-hidden rounded-3xl border border-border/50 bg-muted shadow-2xl transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:border-foreground/35">
                        <div className="absolute inset-0 z-0">
                            <ProjectSignalScene kind={kind} />
                            <div className="absolute inset-0 bg-linear-to-t from-background via-background/35 to-background/5" />
                            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.54),transparent_58%)]" />
                        </div>

                        <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 xl:p-8">
                            <div className="flex items-start justify-between gap-3">
                                <span className="rounded-full border border-foreground/15 bg-background/40 px-3 py-2 font-mono text-xs tracking-[0.08em] text-foreground/85 backdrop-blur-md">
                                    {project.category}
                                </span>
                                <span className="rounded-full border border-foreground/15 bg-background/40 px-3 py-2 font-mono text-xs tracking-[0.08em] text-foreground/85 backdrop-blur-md">
                                    {project.year}
                                </span>
                            </div>

                            <div className="max-w-[92%]">
                                <h3 className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl">
                                    {project.title}
                                </h3>
                                <span className="project-detail-cta mt-5 inline-flex items-center rounded-full border border-signal bg-background/35 px-4 py-2 text-sm font-semibold text-signal backdrop-blur-md transition-colors">
                                    View project details →
                                </span>
                            </div>
                        </div>
                    </div>
            </button>
        </Magnetic>
    );
});
