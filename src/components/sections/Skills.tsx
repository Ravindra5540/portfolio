import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  SiJavascript, SiPython, SiCplusplus, SiReact,
  SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiGit,
  SiGithub, SiLinux, SiPostman, SiHtml5,
} from 'react-icons/si';
import { FaJava, FaCode, FaDatabase, FaTools, FaBrain, FaCss3Alt } from 'react-icons/fa';
import type { Variants } from 'framer-motion';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: FaCode,
    accent: 'from-amber-400 to-orange-500',
    skills: [
      { name: 'Java', icon: FaJava, level: 85 },
      { name: 'JavaScript', icon: SiJavascript, level: 85 },
      { name: 'Python', icon: SiPython, level: 80 },
      { name: 'C++', icon: SiCplusplus, level: 70 },
    ],
  },
  {
    title: 'Web Development (MERN)',
    icon: SiReact,
    accent: 'from-cyan-400 to-sky-500',
    skills: [
      { name: 'React.js', icon: SiReact, level: 85 },
      { name: 'Node.js', icon: SiNodedotjs, level: 85 },
      { name: 'Express.js', icon: SiExpress, level: 80 },
      { name: 'HTML5', icon: SiHtml5, level: 90 },
      { name: 'CSS3', icon: FaCss3Alt, level: 85 },
    ],
  },
  {
    title: 'Databases',
    icon: FaDatabase,
    accent: 'from-emerald-400 to-lime-500',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, level: 80 },
      { name: 'MySQL', icon: SiMysql, level: 80 },
    ],
  },
  {
    title: 'Machine Learning',
    icon: FaBrain,
    accent: 'from-fuchsia-500 to-violet-500',
    skills: [
      { name: 'Machine Learning', icon: FaBrain, level: 75 },
      { name: 'Scikit-learn', icon: FaBrain, level: 75 },
      { name: 'Pandas', icon: FaBrain, level: 75 },
    ],
  },
  {
    title: 'Tools & Technologies',
    icon: FaTools,
    accent: 'from-slate-400 to-slate-500',
    skills: [
      { name: 'Git', icon: SiGit, level: 85 },
      { name: 'GitHub', icon: SiGithub, level: 90 },
      { name: 'Postman', icon: SiPostman, level: 80 },
      { name: 'Linux', icon: SiLinux, level: 75 },
    ],
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
              Strong foundation in Java, full-stack web development (MERN), and machine learning with hands-on project experience.
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

                <div className="mt-6 space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -18 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: categoryIndex * 0.08 + skillIndex * 0.05 }}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <skill.icon className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{skill.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-secondary">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ delay: categoryIndex * 0.08 + skillIndex * 0.05 + 0.2, duration: 0.8, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${category.accent}`}
                        />
                      </div>
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