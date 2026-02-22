import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { profile } from "@/data/profile";

export function Experience() {
  return (
    <section id="experience" className="py-24 relative z-10 bg-black/20">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          title="Experience"
          subtitle="Internships and real-world work where I built practical skills."
          align="center"
        />

        <div className="mt-16 relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent opacity-30" />

          <div className="space-y-12">
            {profile.experience.map((exp, idx) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-24"
              >
                <div className="absolute left-[-4px] md:left-[28px] top-1.5 w-2 h-2 md:w-3 md:h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]" />

                <div className="glass-card p-6 md:p-8 rounded-2xl group">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-3">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>

                      <div className="flex items-center gap-2 text-primary mt-1 font-medium">
                        <Briefcase className="w-4 h-4" />
                        {exp.organization}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 px-3 py-1 rounded-full w-fit">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                  </div>

                  <ul className="text-muted-foreground leading-relaxed list-disc pl-5 space-y-2">
                    {exp.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}