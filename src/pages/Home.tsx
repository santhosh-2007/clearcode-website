import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Card } from '@/components/common/Card';
import { SectionHeading } from '@/components/common/SectionHeading';
import { SEOHead } from '@/components/common/SEOHead';
import { HeroMockup } from '@/components/home/HeroMockup';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { DevProcess } from '@/components/home/DevProcess';
import { TechStack } from '@/components/home/TechStack';
import { FinalCTA } from '@/components/home/FinalCTA';
import { dataService } from '@/services/dataService';
import type { Service, Project, FAQ, Testimonial } from '@/types';

export const Home: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    dataService.getServices().then((data) => setServices(data.slice(0, 6)));
    dataService.getProjects(true).then((data) => setFeaturedProjects(data.slice(0, 3)));
    dataService.getFAQs().then((data) => setFaqs(data.slice(0, 5)));
    dataService.getTestimonials().then(setTestimonials);
  }, []);

  return (
    <>
      <SEOHead
        title="ClearCode.dev — Modern Web Development Studio | Code It. Build It. Launch It."
        description="Ideas Deserve Better Websites. We design and develop modern, responsive websites that help businesses establish their digital presence and grow online."
      />

      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden gradient-glow-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-xs sm:text-sm font-medium text-brand-cyan mb-8 animate-in fade-in duration-500">
            <Sparkles className="w-4 h-4" />
            <span>Modern Web Development Studio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            Ideas Deserve Better Websites.{' '}
            <span className="gradient-text">Let's Build Yours.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            We design and develop modern, responsive websites that help businesses establish their digital presence, dominate search results, and convert visitors into loyal clients.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/enquiry" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start a Project
              </Button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Explore Our Services
              </Button>
            </Link>
          </div>

          {/* Animated Hero Mockup (Laptop + Mobile Phone) */}
          <HeroMockup />
        </div>
      </section>

      {/* 2. Services Overview */}
      <section className="py-20 bg-background-secondary border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="What We Build"
            title="Comprehensive Web Development Services"
            subtitle="From single-page high-converting business showcases to bespoke e-commerce platforms and full-stack web applications."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="p-6 flex flex-col justify-between group">
                <div>
                  <div className="h-44 w-full rounded-lg overflow-hidden mb-5 border border-surface-border relative">
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
                    {service.short_description}
                  </p>
                  <ul className="space-y-1.5 mb-6 text-xs text-text-muted">
                    {service.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                  <Link
                    to={`/enquiry?service=${service.slug}`}
                    className="text-xs font-semibold text-brand-cyan hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    Enquire for this service <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/services">
              <Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All 8 Services & Details
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Why Choose ClearCode.dev */}
      <WhyChooseUs />

      {/* 4. Featured Projects */}
      <section className="py-20 bg-background-secondary border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Portfolio"
            title="Featured Projects & Concept Work"
            subtitle="Explore sample solutions built with modern React, TypeScript, and clean architecture."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="h-48 w-full relative overflow-hidden border-b border-surface-border">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="cyan" size="sm">
                        {project.category}
                      </Badge>
                      <Badge variant="amber" size="sm">
                        Demo Concept
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-brand-cyan transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-surface-border text-text-muted">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-surface-border/50">
                  <Link
                    to="/portfolio"
                    className="text-xs font-semibold text-brand-blue hover:text-brand-cyan transition-colors flex items-center gap-1"
                  >
                    View Project Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/portfolio">
              <Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Full Portfolio Showcase
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Development Process */}
      <DevProcess />

      {/* 6. Technologies We Use */}
      <TechStack />

      {/* 7. Testimonials Section */}
      <section className="py-20 bg-background border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Client Feedback"
            title="Trusted by Ambitious Creators"
            subtitle="Real feedback from founders and businesses who launched their digital identity with ClearCode.dev."
          />

          {testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <Card key={t.id} className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-amber-400 mb-3">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="text-sm text-text-secondary italic mb-4 leading-relaxed">
                      "{t.testimonial}"
                    </p>
                  </div>
                  <div className="pt-4 border-t border-surface-border">
                    <div className="font-heading font-semibold text-white text-sm">
                      {t.client_name}
                    </div>
                    <div className="text-xs text-text-muted">{t.company_name}</div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center p-8 rounded-2xl bg-surface/50 border border-surface-border">
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                We are actively onboarding new projects for this quarter. Partner with us today and let's craft the flagship case study for your industry!
              </p>
              <Link to="/enquiry">
                <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Be Our Next Success Story
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 8. FAQ Section */}
      <section className="py-20 bg-background-secondary border-t border-surface-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Got Questions?"
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions about timelines, technical requirements, and our development model."
          />

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl border border-surface-border bg-surface transition-all overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between text-white font-heading font-semibold hover:text-brand-cyan transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-brand-blue shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm text-text-secondary leading-relaxed border-t border-surface-border/50 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link to="/faq" className="text-sm font-semibold text-brand-cyan hover:underline inline-flex items-center gap-1.5">
              Have more questions? Read our full FAQ guide <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Final Call to Action */}
      <FinalCTA />
    </>
  );
};
