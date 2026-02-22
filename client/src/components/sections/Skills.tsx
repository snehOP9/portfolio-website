import { motion } from "framer-motion";
import { SectionHeading } from "../SectionHeading";
import { profile } from "@/data/profile";

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Technical Skills"
          subtitle="My toolbox for building solutions and exploring new technologies."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {profile.skills.map((skillGroup, idx) => (
            <motion.div
              key={skillGroup.category}
              variants={itemVariants}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors"
            >
              <h3 className="text-lg font-bold text-foreground mb-4">
                {skillGroup.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}