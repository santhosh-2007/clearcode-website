import React from 'react';
import { SectionHeading } from '@/components/common/SectionHeading';

export const DevProcess: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Discovery & Strategy',
      description: 'We analyze your target market, brand objectives, desired features, and user journeys to establish clear technical specifications.',
    },
    {
      step: '02',
      title: 'UI/UX Design & Architecture',
      description: 'We formulate the responsive design system, database schemas, and modern glass-accented interface mockups tailored to your brand.',
    },
    {
      step: '03',
      title: 'Development & Code Crafting',
      description: 'Our engineers build your website using modern React, TypeScript, Tailwind CSS, and PostgreSQL with clean, maintainable architecture.',
    },
    {
      step: '04',
      title: 'Testing & Core Web Vitals',
      description: 'Rigorous responsive testing across phone, tablet, and desktop viewports, cross-browser audits, form validation, and speed optimization.',
    },
    {
      step: '05',
      title: 'Deployment & Launch',
      description: 'We connect your custom domain name, configure SSL encryption, setup cloud hosting on Vercel/Supabase, and verify production status.',
    },
  ];

  return (
    <section className="py-20 bg-background-secondary border-y border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Our Process"
          title="How We Turn Your Idea into a Live Website"
          subtitle="A structured, transparent 5-step development methodology that delivers on-time, production-ready results without stress."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="relative p-6 rounded-xl bg-surface border border-surface-border flex flex-col justify-between group hover:border-brand-blue/50 transition-all duration-300"
            >
              <div>
                <div className="font-heading font-extrabold text-3xl text-brand-blue/40 group-hover:text-brand-cyan transition-colors mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-heading font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
