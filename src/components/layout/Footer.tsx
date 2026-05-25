import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {[
              { icon: Github, href: 'https://github.com/Ravindra5540', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/ravindra-rajhans-52b71b287/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:ravindrarajhans03@gmail.com', label: 'Email' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border bg-background/60 p-2 text-muted-foreground transition-colors hover:text-primary"
                aria-label={social.label}
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </motion.div>

          <motion.p
            className="text-sm uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Ravindra Rajhans
          </motion.p>
        </div>
      </div>
    </footer>
  );
};
