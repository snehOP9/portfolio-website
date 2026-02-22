import { motion } from 'framer-motion';
import { Code, Lightbulb, MapPin, Zap } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import aboutImg from "@assets/WhatsApp_Image_2026-02-22_at_12.59.37_1771745530773.jpeg";

export function About() {
  const highlights = [
    { icon: <Code className="w-5 h-5 text-primary" />, title: "Clean Code", desc: "Writing readable & maintainable code" },
    { icon: <Zap className="w-5 h-5 text-accent" />, title: "Problem Solving", desc: "Strong foundation in DSA" },
    { icon: <Lightbulb className="w-5 h-5 text-yellow-500" />, title: "Active Learner", desc: "Currently exploring AI/ML" },
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          title="About Me" 
          subtitle="A glimpse into my journey, passions, and what drives me as a developer." 
          align="center" 
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden glass aspect-[4/5] max-w-md mx-auto">
              <img 
                src={aboutImg} 
                alt="Sneh Raunak Working" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/80 to-transparent">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <MapPin className="w-4 h-4 text-primary" />
                  Mohali district, India
                </div>
              </div>
            </div>
            {/* Decoration */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-2xl -z-10" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div className="prose prose-invert lg:prose-lg max-w-none text-muted-foreground">
              <p>
                Hello! I'm Sneh Raunak, an enthusiastic and dedicated aspiring software developer. 
                I find joy in tackling complex logic problems and am deeply passionate about Data Structures and Algorithms.
              </p>
              <p>
                My technical journey began with core languages like C, C++, and Python, which gave me a solid 
                understanding of how computers work under the hood. Now, I'm expanding my horizons into the 
                fascinating world of AI/ML, aiming to build intelligent systems.
              </p>
              <p>
                Beyond coding, I'm an active member of several tech communities and enjoy sharing knowledge 
                as a Tech Content Writer. I believe that writing about technology is one of the best ways to solidify 
                one's own understanding.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="glass-card p-4 rounded-xl flex items-start gap-4"
                >
                  <div className="p-2 rounded-lg bg-white/5">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
