import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, BookOpen, Lightbulb } from 'lucide-react';
import type { Variants } from 'framer-motion';

const education = [
  {
    degree: 'B.Tech in Computer Engineering',
    institution: 'MIT Academy of Engineering, Pune',
    year: '2022 - 2026',
    cgpa: '8.71 CGPA',
    current: true,
  },
  {
    degree: 'Diploma in Computer Engineering',
    institution: 'MGM Polytechnic, Aurangabad',
    year: '2020 - 2023',
    cgpa: '90% (Gold Medalist)',
    current: false,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={itemVariants} className="mb-12 max-w-3xl">
            <span className="mb-4 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              About Me
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Passionate About <span className="text-gradient">Development & Innovation</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              I am a Computer Engineering student with a strong foundation in full-stack development and problem-solving. I have hands-on experience in building web applications using MERN stack and Java technologies, along with a growing interest in AI/ML-based solutions.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div variants={itemVariants} className="glass-card rounded-[28px] p-6 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold">Education</h3>
              </div>

              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                  >
                    <div className="mb-3 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-base font-semibold">{edu.degree}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{edu.institution}</p>
                      </div>
                      {edu.current && (
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span>{edu.year}</span>
                      <span className="inline-flex items-center gap-1 text-primary">
                        <Award className="h-4 w-4" />
                        {edu.cgpa}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card rounded-[28px] p-6 sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-xl bg-accent/10 p-2.5">
                    <Lightbulb className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">Learning Mindset</h3>
                </div>

                <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                  My journey from diploma to B.Tech has strengthened my technical foundation and problem-solving abilities. I continuously focus on improving my development skills by working on real-world projects and exploring modern technologies.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    { icon: BookOpen, label: 'Self-Learner', desc: 'Always exploring new technologies' },
                    { icon: Award, label: 'Gold Medalist', desc: 'Excellence in academics' },
                  ].map((item, index) => (
                    <div key={index} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                      <item.icon className="mb-3 h-5 w-5 text-primary" />
                      <p className="text-sm font-semibold">{item.label}</p>
                      <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-[28px] p-6 sm:p-7">
                <h3 className="font-display text-xl font-semibold">Current Focus</h3>
                <ul className="mt-5 space-y-3">
                  {[
                    'Building full-stack applications using MERN stack',
                    'Developing backend systems with Node.js and Express',
                    'Exploring Machine Learning and AI-based solutions',
                    'Preparing for software development internships',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};