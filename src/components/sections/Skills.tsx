import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  SiReact,
} from 'react-icons/si';
import { FaCode, FaDatabase, FaTools, FaBrain } from 'react-icons/fa';
import type { Variants } from 'framer-motion';

const skillCategories = [
  {
    title: 'Languages',
    icon: FaCode,
    accent: 'from-amber-400 to-orange-500',
    skills: ['C#', 'C++', 'Java', 'Python', 'JavaScript', 'SQL'],
  },
  {
    title: 'Frameworks & Libraries',
    icon: SiReact,
    accent: 'from-cyan-400 to-sky-500',
    skills: ['.NET', 'J2EE', 'Node.js', 'Express.js', 'React.js', 'Vue.js', 'Flask'],
  },
  {
    title: 'Databases',
    icon: FaDatabase,
    accent: 'from-emerald-400 to-lime-500',
    skills: ['MySQL', 'SQL Server', 'MongoDB', 'Firebase'],
  },
  {
    title: 'Machine Learning',
    icon: FaBrain,
    accent: 'from-fuchsia-500 to-violet-500',
    skills: ['Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Data Analysis', 'Data Preprocessing', 'Model Training', 'Model Evaluation'],
  },
  {
    title: 'Tools & Technologies',
    icon: FaTools,
    accent: 'from-slate-400 to-slate-500',
    skills: ['Docker', 'Jenkins', 'GitHub Actions', 'CI/CD Pipelines', 'AWS (EC2, IAM, S3)', 'GitHub', 'VS Code', 'Android Studio', 'Power BI', 'Postman'],
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
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-20 sm:py-24">
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
              My Skills
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Technical <span className="text-gradient">Expertise</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              Technologies and tools from my full-stack, backend, and machine learning project experience.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="glass-card rounded-[28px] p-6"
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-2xl bg-gradient-to-br ${category.accent} p-3`}>
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{category.title}</h3>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Core stack</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 8 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: categoryIndex * 0.08 + skillIndex * 0.03 }}
                      className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};