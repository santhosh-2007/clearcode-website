import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, ShieldCheck, Heart, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { SectionHeading } from '@/components/common/SectionHeading';
import { SEOHead } from '@/components/common/SEOHead';
import { dataService } from '@/services/dataService';

export const About: React.FC = () => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    dataService.getContentPage('about').then(setContent);
  }, []);

  const approach = content?.approach || [
    { step: '01. Architecture First', desc: 'We understand your business model and target audience before writing a single line of code.' },
    { step: '02. Modern Craftsmanship', desc: 'Engineered with clean React, type-safe TypeScript, and optimized database models.' },
    { step: '03. Pixel-Perfect Polish', desc: 'Smooth micro-interactions, responsive fluid layouts, and dark-mode elegance.' },
    { step: '04. Reliable Launch & Support', desc: 'Complete DNS setup, SSL configuration, automated backups, and post-launch maintenance.' }
  ];

  const coreValues = content?.core_values || [
    { title: 'Clean Code', desc: 'No bloated frameworks or tangled spaghetti code. Only pure, maintainable, high-performance architecture.' },
    { title: 'Radical Transparency', desc: 'Clear pricing, direct communication, and realistic delivery timelines without hidden surprises.' },
    { title: 'Mobile-First Excellence', desc: 'Every pixel is tested on mobile devices first, ensuring impeccable smartphone usability.' },
    { title: 'Speed & Security', desc: 'Sub-second load times, strict Row Level Security, and automated SSL encryption out of the box.' }
  ];

  return (
    <>
      <SEOHead
        title="About Us — ClearCode.dev | Modern Web Development Studio"
        description="Learn about ClearCode.dev, our brand story, mission, engineering approach, and core values."
      />

      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-background relative overflow-hidden gradient-glow-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-xs font-medium text-brand-cyan mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Our Story & Mission
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
            We Engineer Websites with <span className="gradient-text">Purpose & Precision.</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed">
            {content?.intro || 'ClearCode.dev is a web development and digital solutions brand built for startups, small businesses, entrepreneurs, restaurants, and visionaries.'}
          </p>
        </div>
      </section>

      {/* Brand Story, Mission & Vision */}
      <section className="py-20 bg-background-secondary border-y border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider">
                <Terminal className="w-4 h-4" /> Brand Story
              </div>
              <h2 className="text-3xl font-heading font-bold text-white leading-tight">
                Eliminating Bloated Code in an Age of Generic Templates
              </h2>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                {content?.brand_story || 'Founded on the belief that every idea deserves a high-performance, aesthetically exceptional web presence, ClearCode.dev eliminates bloated code and generic templates. We engineer websites from first principles with modern tools like React, TypeScript, and PostgreSQL.'}
              </p>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="p-5">
                  <h3 className="font-heading font-bold text-white text-base mb-1.5 text-brand-blue">
                    Our Mission
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {content?.mission || 'To craft lightning-fast, visually captivating, and purpose-built digital experiences that empower businesses to thrive in the modern web era.'}
                  </p>
                </Card>
                <Card className="p-5">
                  <h3 className="font-heading font-bold text-white text-base mb-1.5 text-brand-cyan">
                    Our Vision
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {content?.vision || 'To become the preferred web development studio known globally for technical precision, transparent collaboration, and uncompromising design quality.'}
                  </p>
                </Card>
              </div>
            </div>

            <div className="relative">
              <div className="p-8 rounded-2xl bg-surface border border-surface-border shadow-glow relative z-10 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-surface-border">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-cyan">
                    <Code className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-white text-base">The ClearCode Pledge</h3>
                    <p className="text-xs text-text-muted">Pure code, zero fluff</p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>No unmaintained WordPress templates or broken plugins.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Type-safe TypeScript codebase for rock-solid stability.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Full client ownership of repositories and deployment keys.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Direct developer access without bureaucratic agency account managers.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Approach"
            title="How We Engineer Success"
            subtitle="Our disciplined execution workflow ensures your project is delivered on schedule, securely, and within scope."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {approach.map((item: any, i: number) => (
              <Card key={i} className="p-6">
                <div className="font-heading font-bold text-brand-blue text-xl mb-2">
                  {item.step}
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background-secondary border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Guiding Principles"
            title="Our Core Values"
            subtitle="The fundamental standards that guide every line of code we write and every client relationship we foster."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val: any, idx: number) => (
              <Card key={idx} className="p-6">
                <div className="w-10 h-10 rounded-lg bg-surface-cardHover border border-surface-border flex items-center justify-center text-brand-cyan mb-4">
                  {idx === 0 && <Code className="w-5 h-5" />}
                  {idx === 1 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 2 && <Sparkles className="w-5 h-5" />}
                  {idx === 3 && <Heart className="w-5 h-5" />}
                </div>
                <h3 className="text-lg font-heading font-semibold text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {val.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            badge="Leadership"
            title="Meet the Engineering Lead"
            subtitle="ClearCode.dev is led by passionate developers who write the code and manage the delivery directly."
          />

          <Card className="p-8 sm:p-10 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 rounded-full bg-brand-blue/20 border-2 border-brand-cyan/40 mx-auto mb-4 flex items-center justify-center text-brand-cyan text-2xl font-heading font-bold shadow-glow">
              CC
            </div>
            <h3 className="text-xl font-heading font-bold text-white">
              {content?.founder?.name || 'ClearCode.dev Engineering Lead'}
            </h3>
            <p className="text-xs font-mono text-brand-cyan mb-4">
              {content?.founder?.role || 'Lead Full-Stack Architect & Founder'}
            </p>
            <p className="text-sm text-text-secondary leading-relaxed max-w-lg mx-auto">
              {content?.founder?.bio || 'Passionate software engineer and product builder dedicated to elevating the web standard for growing businesses and innovative founders.'}
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/enquiry">
                <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Discuss a Project
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
};
