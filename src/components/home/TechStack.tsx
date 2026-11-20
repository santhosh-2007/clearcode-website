import React from 'react';
import { SectionHeading } from '@/components/common/SectionHeading';

export const TechStack: React.FC = () => {
  const technologies = [
    { name: 'React', category: 'Frontend Framework', desc: 'Component-based interactive UI' },
    { name: 'TypeScript', category: 'Type Safety', desc: 'Robust bug-resistant code' },
    { name: 'Tailwind CSS', category: 'Styling Engine', desc: 'Utility-first responsive design' },
    { name: 'Supabase', category: 'PostgreSQL Database', desc: 'Enterprise data layer & Auth' },
    { name: 'Framer Motion', category: 'Animation', desc: 'Smooth fluid micro-interactions' },
    { name: 'Vite', category: 'Build Tool', desc: 'Sub-second dev server & bundling' },
    { name: 'Vercel', category: 'Cloud Deployment', desc: 'Global edge network delivery' },
    { name: 'Zod & React Hook Form', category: 'Validation', desc: 'Strict client & server validation' },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Modern Tech Stack"
          title="Built With the Best Tools in Web Development"
          subtitle="We avoid outdated WordPress bloat or restrictive website builders. We engineer your digital platform on the world's most reputable web ecosystem."
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {technologies.map((tech, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-surface border border-surface-border hover:border-brand-blue/40 hover:shadow-glow-sm transition-all duration-200 group"
            >
              <div className="text-[11px] font-mono text-brand-cyan tracking-wider uppercase mb-1">
                {tech.category}
              </div>
              <h3 className="text-lg font-heading font-bold text-white group-hover:text-brand-blue transition-colors">
                {tech.name}
              </h3>
              <p className="text-xs text-text-secondary mt-1.5 leading-normal">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
