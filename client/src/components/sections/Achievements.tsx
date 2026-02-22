import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { profile } from "@/data/profile";

export function Achievements() {
  return (
    <section id="achievements" className="py-24 relative z-10 bg-black/20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Achievements & Certifications"
          subtitle="Highlights that reflect consistency, leadership, and skill growth."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-15 blur-xl rounded-3xl" />
          <div className="relative glass p-8 md:p-10 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center text-primary">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Milestones
              </h3>
            </div>

            <ul className="space-y-3 text-muted-foreground leading-relaxed list-disc pl-5">
              {profile.achievements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}