import { motion } from "framer-motion";
import { Code2, Github, ExternalLink, Sparkles } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { profile } from "@/data/profile";
import { Reveal } from "../Reveal";

type Project = {
  title: string;
  tech: string[];
  bullets: string[];
  github?: string;
  live?: string;
  featured?: boolean;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Projects() {
  const projects = (profile.projects || []) as Project[];

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <SectionHeading
            title="Projects"
            subtitle="A few things I've built recently — focused on impact, clarity, and real-world learning."
            align="center"
          />
        </Reveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-8 mt-16"
        >
          {projects.map((p) => (
            <motion.div
              key={p.title}
              variants={item}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="glass-card p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors relative overflow-hidden"
            >
              {/* glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl" />
              </div>

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground break-words">
                        {p.title}
                      </h3>

                      {p.featured && (
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/15 border border-primary/25 text-primary">
                          <Sparkles className="w-3.5 h-3.5" />
                          Featured
                        </span>
                      )}
                    </div>

                    {Array.isArray(p.tech) && p.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
                    <Code2 className="w-6 h-6" />
                  </div>
                </div>

                {Array.isArray(p.bullets) && p.bullets.length > 0 && (
                  <ul className="mt-6 space-y-2 text-muted-foreground leading-relaxed list-disc pl-5">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}

                {(p.github || p.live) && (
                  <div className="mt-7 flex flex-wrap gap-3">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:text-foreground transition-colors text-muted-foreground"
                      >
                        <Github className="w-4 h-4" />
                        GitHub
                      </a>
                    )}

                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl bg-primary/15 border border-primary/25 hover:border-primary/40 hover:text-foreground transition-colors text-primary"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}