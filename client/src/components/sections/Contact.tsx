import { useState } from 'react';
import { profile } from "@/data/profile";
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail, Phone, MapPin, Send } from 'lucide-react';
import { SectionHeading } from '../SectionHeading';
import { useCreateMessage } from '@/hooks/use-messages';
import { insertMessageSchema, type InsertMessage } from '@shared/routes';

export function Contact() {
  const { mutate: sendMessage, isPending } = useCreateMessage();
  const [formSuccess, setFormSuccess] = useState(false);

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertMessage) => {
    sendMessage(data, {
      onSuccess: () => {
        setFormSuccess(true);
        form.reset();
        setTimeout(() => setFormSuccess(false), 5000);
      }
    });
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading 
          title="Get In Touch" 
          subtitle="Have a question or want to work together? Leave a message and I'll get back to you as soon as possible."
        />

        <div className="grid lg:grid-cols-5 gap-12 mt-16">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <a href="mailto:sneh.raunak@zohomail.in" className="text-foreground font-medium hover:text-primary transition-colors">
                  sneh.raunak@zohomail.in
                </a>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <a href="tel:+919241920176" className="text-foreground font-medium hover:text-accent transition-colors">
                  +91 9241920176
                </a>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="text-foreground font-medium">
                  Mohali district, India
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 glass p-8 md:p-10 rounded-3xl"
          >
            {formSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">Name</label>
                    <input
                      id="name"
                      {...form.register("name")}
                      className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${form.formState.errors.name ? 'border-destructive' : 'border-white/10'} text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                      placeholder="Sneh Raunak"
                    />
                    {form.formState.errors.name && (
                      <p className="text-xs text-destructive ml-1">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground ml-1">Email</label>
                    <input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${form.formState.errors.email ? 'border-destructive' : 'border-white/10'} text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all`}
                      placeholder="sneh@example.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-xs text-destructive ml-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground ml-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    {...form.register("message")}
                    className={`w-full px-5 py-4 rounded-xl bg-white/5 border ${form.formState.errors.message ? 'border-destructive' : 'border-white/10'} text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-xs text-destructive ml-1">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
