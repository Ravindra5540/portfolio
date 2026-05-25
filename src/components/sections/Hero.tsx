import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.32),transparent_18%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.2),transparent_20%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-40" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="max-w-2xl">
            <motion.div variants={itemVariants} className="mb-5">
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Open to Internship Opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl font-bold leading-none tracking-tight sm:text-5xl lg:text-6xl"
            >
              Hi, I'm{' '}
              <span className="text-gradient">Ravindra Rajhans</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-base text-muted-foreground sm:text-lg"
            >
              Full Stack Developer
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base"
            >
              I build scalable web applications using MERN stack and Java technologies. Passionate about problem-solving and exploring AI/ML to create impactful solutions.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button variant="hero" size="lg" asChild>
                <a href="#projects">
                  View Projects
                  <ArrowDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex items-center gap-3"
            >
              {[
                { icon: Github, href: 'https://github.com/Ravindra5540', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/ravindra-rajhans-52b71b287/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:ravindrarajhans03@gmail.com', label: 'Email' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-border bg-background/60 p-3 text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-primary"
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="glass-card relative overflow-hidden rounded-[28px] p-6 sm:p-8"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(139,92,246,0.14),transparent_45%,rgba(34,211,238,0.12))]" />
            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Portfolio Snapshot</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">2026</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Focus</p>
                  <p className="mt-3 text-lg font-semibold">MERN • Java • AI/ML</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Projects</p>
                  <p className="mt-3 text-lg font-semibold">3 featured builds</p>
                </div>
              </div>

              {/* Removed extra description as per user request */}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">Scroll to explore</span>
          <ArrowDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
};