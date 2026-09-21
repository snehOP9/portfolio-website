"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import type { ProjectItem } from "@/types/project";
import Magnetic from "@/components/effects/magnetic";
import { useSound } from "@/providers/sound-provider";
import { ProjectSignalScene } from "@/components/effects/project-signal-scene";

const projectDetails = {
  SentinelFlow: { slug: "sentinelflow", proof: "Synthetic events · policy routing · explainability" },
  Student: { slug: "student-performance-predictor", proof: "Auth · uncertainty · recommendations" },
  Anony: { slug: "anony-talk", proof: "Anonymous posts · peer interaction · secure accounts" },
};

export default function Projects() {
  const { content, dict } = useLanguage();

  return <section data-slot="projects" className="relative py-16 md:py-24 lg:py-32">
    <div id="projects-content" className="container mx-auto scroll-mt-28 px-container">
      <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
        <div className="flex flex-col gap-4"><BlurReveal><span className="title-counter">[001]</span></BlurReveal><BlurReveal><h2 className="title">{dict.title.projects}</h2></BlurReveal></div>
        <BlurReveal><p className="max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">{dict.projectsIntro}</p></BlurReveal>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
        {content.projects.map((project: ProjectItem) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </div>
  </section>;
}

const ProjectCard = React.memo(function ProjectCard({ project }: { project: ProjectItem }) {
  const { playHover, playClick } = useSound();
  const key = project.title === "SentinelFlow" ? "SentinelFlow" : project.title.startsWith("Student") ? "Student" : "Anony";
  const detail = projectDetails[key];
  const kind = key === "SentinelFlow" ? "sentinel" : key === "Student" ? "student" : "anony";

  return <Magnetic disabled>
    <Link href={`/projects/${detail.slug}/`} aria-label={`Read ${project.title} case study`} onClick={playClick} onMouseEnter={playHover} className="group relative block min-h-[31rem] overflow-hidden rounded-3xl border border-border/80 bg-card text-left shadow-[0_18px_60px_rgba(0,0,0,.14)] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-signal/70 hover:shadow-[0_26px_80px_rgba(0,0,0,.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal">
      <div className="absolute inset-x-0 top-0 h-[47%] overflow-hidden bg-[#07100a] text-white">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"><ProjectSignalScene kind={kind} /><div className="absolute inset-0 bg-linear-to-t from-[#07100a] via-[#07100a]/30 to-transparent" /></div>
        <div className="relative z-10 flex items-start justify-between gap-3 p-5">
          <span className="max-w-[78%] rounded-full border border-white/25 bg-black/35 px-3 py-2 font-mono text-[10px] tracking-[0.1em] text-white/95 backdrop-blur-md">{project.category}</span>
          <span className="rounded-full border border-white/25 bg-black/35 px-3 py-2 font-mono text-[10px] tracking-[0.1em] text-white/95 backdrop-blur-md">{project.year}</span>
        </div>
      </div>
      <div className="relative flex min-h-[31rem] flex-col justify-end p-6 pt-[15.5rem] sm:p-7 sm:pt-[16rem]">
        <p className="font-mono text-[10px] tracking-[.16em] text-signal">SELECTED BUILD / 0{project.id}</p>
        <h3 className="mt-3 max-w-[15ch] text-[clamp(2.2rem,3.2vw,3.5rem)] font-black leading-[.88] tracking-[-.055em] text-foreground">{project.title}</h3>
        <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">{project.description}</p>
        <div className="mt-5 border-t border-border pt-4"><p className="font-mono text-[10px] leading-relaxed tracking-[.08em] text-foreground/75">{detail.proof}</p></div>
        <span className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-foreground transition-colors group-hover:text-signal">Read case study <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  </Magnetic>;
});
