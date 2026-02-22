import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { SectionHeading } from "../SectionHeading";
import { profile } from "@/data/profile";

export function Education() {
  const e = profile.education;

  return (
    <section id="education" className="py-24 relative z-10 bg-black/20">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Education" align="center" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-xl rounded-3xl" />

          <div className="relative glass p-8 md:p-12 rounded-3xl border border-white/10 overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <GraduationCap className="w-32 h-32" />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {e.institute}
              </h3>

              <p className="text-primary font-medium mt-2 text-lg">
                {e.degree}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="text-sm bg-white/5 px-3 py-1 rounded-full text-muted-foreground border border-white/10">
                  CGPA: <span className="text-foreground font-medium">{e.cgpa}</span>
                </span>
                <span className="text-sm bg-white/5 px-3 py-1 rounded-full text-muted-foreground border border-white/10">
                  {e.duration}
                </span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground mt-6">
                <MapPin className="w-4 h-4 text-primary" />
                {e.location}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}