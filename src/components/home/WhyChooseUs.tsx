import React from 'react';
import { ShieldCheck, Zap, Smartphone, Sparkles, Database, HeartHandshake } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { SectionHeading } from '@/components/common/SectionHeading';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: <Zap className="w-6 h-6 text-brand-cyan" />,
      title: 'Blazing Fast Performance',
      description:
        'We engineer websites with clean React and Vite code that load in under 1 second, keeping your bounce rates low and Google rankings high.',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-brand-blue" />,
      title: '100% Mobile-First Precision',
      description:
        'Over 70% of clients will visit on a phone. Every section, font size, button, and layout is meticulously tailored for smooth mobile touch interaction.',
    },
    {
      icon: <Database className="w-6 h-6 text-brand-cyan" />,
      title: 'Enterprise Supabase Backend',
      description:
        'Real PostgreSQL database architecture with Row Level Security (RLS), encrypted authentication, and scalable storage for real business power.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-brand-blue" />,
      title: 'Modern Futuristic Aesthetics',
      description:
        'No generic pre-made themes. We build bespoke dark and light UI experiences with electric blue glowing accents, smooth micro-interactions, and glassmorphism.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-cyan" />,
      title: 'Direct WhatsApp & Lead Capture',
      description:
        'Turn visits into immediate enquiries with integrated WhatsApp buttons, spam-protected contact forms, and instant notification workflows.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-brand-blue" />,
      title: 'Full Ownership & Ongoing Care',
      description:
        'You own your source code, domain, and data completely. Plus, we offer hassle-free maintenance plans to keep your platform secure and updated.',
    },
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Why ClearCode.dev"
          title="Engineered to Outperform Generic Website Builders"
          subtitle="We don't use clunky drag-and-drop page builders. We write pure, high-performance code that elevates your brand and accelerates business growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((reason, idx) => (
            <Card key={idx} className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-cardHover border border-surface-border flex items-center justify-center mb-5 shadow-sm">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-2.5">
                  {reason.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
