import { motion, useReducedMotion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ title, subtitle, align = 'left' }: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <motion.h2 
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
        className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={shouldReduceMotion ? { duration: 0, delay: 0 } : { duration: 0.5, delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div 
        initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={shouldReduceMotion ? { duration: 0, delay: 0 } : { duration: 0.5, delay: 0.2 }}
        className={`h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-6 ${align === 'center' ? 'w-24 mx-auto' : 'w-24'}`}
      />
    </div>
  );
}
