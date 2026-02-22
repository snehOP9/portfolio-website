import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import heroImg from "@assets/WhatsApp_Image_2026-02-22_at_13.01.09_1771745536934.jpeg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-6 text-center lg:text-left z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mx-auto lg:mx-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-primary">Available for Opportunities</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold leading-[1.1]">
            Hi, I'm <br />
            <span className="text-gradient">Sneh Raunak</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Aspiring Software Developer proficient in <span className="text-foreground font-medium">C, C++, and Python</span>. 
            Passionate about Data Structures and Machine Learning.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
            <a 
              href="#contact"
              className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
            >
              Contact Me
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#about"
              className="px-8 py-4 rounded-xl font-semibold glass hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
            >
              View Profile
              <Download className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-6 pt-8">
            <a href="https://www.linkedin.com/in/sneh-raunak" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:sneh.raunak@zohomail.in" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-6 h-6" />
              <span className="sr-only">Email</span>
            </a>
            <a href="https://github.com/snehOP9" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </motion.div>

        {/* Image / Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative lg:h-[600px] flex items-center justify-center lg:justify-end"
        >
          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[450px] md:h-[450px]">
            {/* Decorative frame */}
            <div className="absolute inset-0 rounded-full border border-primary/30 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-accent/30 animate-[spin_15s_linear_infinite_reverse]" />
            
            <div className="absolute inset-8 rounded-full overflow-hidden glass border-2 border-white/10 shadow-2xl">
              <img 
                src={heroImg} 
                alt="Sneh Raunak" 
                className="w-full h-full object-cover object-top scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent mix-blend-multiply" />
            </div>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
