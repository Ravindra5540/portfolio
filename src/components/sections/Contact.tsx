import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Github, Linkedin, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Variants } from 'framer-motion';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'ravindrarajhans03@gmail.com',
    href: 'mailto:ravindrarajhans03@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/Ravindra5540',
    href: 'https://github.com/Ravindra5540',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ravindra-rajhans-52b71b287',
    href: 'https://www.linkedin.com/in/ravindra-rajhans-52b71b287/',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Pune, India',
    href: null,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Message sent!',
      description: "Thank you for reaching out. I'll get back to you soon!",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={itemVariants} className="mb-12 max-w-2xl">
            <span className="mb-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Get In Touch
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              I'm open to internship opportunities, collaboration on projects, and discussions related to software development and technology.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="glass-card rounded-[28px] p-6 sm:p-7">
                <h3 className="font-display text-xl font-semibold">Contact Information</h3>
                <div className="mt-5 space-y-3">
                  {contactInfo.map((info) => (
                    <div
                      key={info.label}
                      className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3"
                    >
                      <div className="rounded-xl bg-primary/10 p-2.5">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-block text-sm font-medium transition-colors hover:text-primary"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-sm font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-[28px] p-6 sm:p-7">
                <p className="text-sm leading-7 text-muted-foreground">
                  I am currently seeking internship opportunities where I can apply my full-stack development skills and gain real-world experience while contributing to impactful projects.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="glass-card rounded-[28px] p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="border-border/60 bg-background/50"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="email" className="text-sm font-medium">Your Email</label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="border-border/60 bg-background/50"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your opportunity..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      className="resize-none border-border/60 bg-background/50"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="mt-6 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="h-5 w-5 rounded-full border-2 border-primary-foreground border-t-transparent"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};