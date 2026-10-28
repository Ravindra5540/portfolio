import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Variants } from 'framer-motion';

const projects = [
  {
    name: 'MediConnect',
    tagline: 'Doctor-Patient Appointment & Consultation System',
    description: 'A web-based platform that allows patients to book appointments with doctors, consult online, and manage medical history efficiently.',
    techStack: ['Java', 'JSP', 'Servlets', 'JDBC', 'MySQL', 'Tomcat'],
    github: 'https://github.com/Ravindra5540',
    demo: '#',
    caseSummary: 'Developed a full-stack healthcare system to streamline doctor-patient interaction. Implemented modules for appointment booking, online consultation, prescription management, and patient history tracking. Built a secure admin panel for managing users and system operations. Focused on backend logic and database design to ensure efficient data handling.',
    accent: 'from-fuchsia-500 to-violet-500',
  },
  {
    name: 'LifeFit',
    tagline: 'Health and Fitness Web Application',
    description: 'LifeFit is a full-stack health and fitness platform for tracking workouts, meals, water intake, and sleep, with dashboards and an AI-powered health coach.',
    techStack: ['MongoDB', 'Express.js', 'Vue.js', 'Node.js', 'Gemini API'],
    github: 'https://github.com/Ravindra5540',
    demo: '#',
    caseSummary: 'Built a MEVN-based wellness platform with JWT authentication, REST APIs, and tracking for workouts, meals, water, and sleep. Added interactive progress dashboards with Chart.js and ApexCharts, plus a Gemini-powered health coach chatbot for personalized recommendations.',
    accent: 'from-cyan-500 to-sky-500',
  },
  {
    name: 'Crop Recommendation System',
    tagline: 'AI/ML Based Smart Farming Solution',
    description: 'A Flask web application that recommends crops based on soil nutrients and environmental conditions.',
    techStack: ['Python', 'Flask', 'Machine Learning'],
    github: 'https://github.com/Ravindra5540',
    demo: '#',
    caseSummary: 'Developed a Flask application that recommends crops from soil and environmental data. Compared Random Forest, Decision Tree, Naive Bayes, and SVM models, then deployed the best-performing model for crop predictions.',
    accent: 'from-emerald-500 to-teal-500',
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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div variants={itemVariants} className="group">
      <div className="glass-card relative overflow-hidden rounded-[28px] p-6 sm:p-7">
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${project.accent}`} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Featured</p>
            <h3 className="mt-3 font-display text-xl font-semibold sm:text-2xl">{project.name}</h3>
          </div>
          <div className="flex gap-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border bg-background/60 p-2"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <Github className="h-4 w-4" />
            </motion.a>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border bg-background/60 p-2"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </div>
        </div>

        <p className="mt-4 text-sm font-medium text-primary">{project.tagline}</p>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 border-t border-white/5 pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex w-full items-center justify-between gap-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="inline-flex items-center gap-2">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {isExpanded ? 'Hide' : 'View'} Case Study
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em]">{isExpanded ? 'Collapse' : 'Expand'}</span>
          </button>

          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.caseSummary}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-20 sm:py-24">
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
              My Work
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              Projects showcasing my skills in full-stack development, backend systems, and machine learning solutions.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-10 text-center">
            <Button variant="heroOutline" size="lg" asChild>
              <a href="https://github.com/Ravindra5540" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View All on GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};