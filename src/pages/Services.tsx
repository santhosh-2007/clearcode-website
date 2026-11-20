import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles, Users } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { SectionHeading } from '@/components/common/SectionHeading';
import { SEOHead } from '@/components/common/SEOHead';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { dataService } from '@/services/dataService';
import type { Service } from '@/types';

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dataService.getServices().then((data) => {
      setServices(data);
      setLoading(false);
    });
  }, []);

  const suitableCustomerMap: Record<string, string> = {
    'business-website-development': 'Corporations, agencies, consultancies, legal firms, service companies.',
    'ecommerce-website-development': 'Retail brands, boutique shops, D2C creators, inventory businesses.',
    'personal-portfolio-websites': 'Software engineers, designers, freelancers, photographers, executives.',
    'restaurant-and-hotel-websites': 'Bistros, cafes, fine dining, hotels, food truck operators, cloud kitchens.',
    'educational-websites': 'Coaching academies, online course instructors, private schools, tutors.',
    'custom-web-application-development': 'SaaS startups, tech innovators, internal dashboard & tool seekers.',
    'website-redesign': 'Established companies with outdated, slow, or low-converting existing sites.',
    'website-maintenance': 'Any business wanting hands-off security updates, uptime checks, and backups.'
  };

  return (
    <>
      <SEOHead
        title="Web Development Services — ClearCode.dev"
        description="Explore our specialized web development services: business websites, e-commerce, portfolios, restaurant platforms, custom web apps, redesigns, and maintenance."
      />

      {/* Hero */}
      <section className="pt-16 pb-16 bg-background relative overflow-hidden gradient-glow-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-xs font-medium text-brand-cyan mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Full-Lifecycle Digital Craft
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
            Our Web Development <span className="gradient-text">Services</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed">
            Every website we engineer is built from first principles for blistering speed, flawless mobile interaction, and maximum conversion.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-background-secondary border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <LoadingSpinner message="Loading services catalog..." />
          ) : (
            <div className="space-y-16">
              {services.map((service, index) => {
                const isEven = index % 2 === 0;
                const customerType = suitableCustomerMap[service.slug] || 'Startups, SMEs, and growth-minded businesses.';

                return (
                  <div
                    key={service.id}
                    id={service.slug}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 rounded-2xl bg-surface border border-surface-border hover:border-brand-blue/40 transition-all duration-300 shadow-sm"
                  >
                    {/* Visual */}
                    <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="w-full h-64 sm:h-80 rounded-xl overflow-hidden border border-surface-border relative group">
                        <img
                          src={service.image_url}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="text-xs font-mono text-brand-cyan px-2.5 py-1 rounded bg-surface/90 border border-surface-border">
                            Service 0{index + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-4`}>
                      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                        {service.title}
                      </h2>
                      <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                        {service.full_description}
                      </p>

                      {/* Suitable customer */}
                      <div className="p-3.5 rounded-lg bg-surface-cardHover/70 border border-surface-border flex items-start gap-3">
                        <Users className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-semibold text-white block">Ideal For:</span>
                          <span className="text-xs text-text-secondary">{customerType}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="text-xs font-mono uppercase text-brand-cyan tracking-wider mb-2 font-semibold">
                          Key Deliverables & Capabilities:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {service.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-text-secondary">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                              <span className="truncate">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pre-filled Enquiry Button */}
                      <div className="pt-4 flex items-center gap-4">
                        <Link to={`/enquiry?service=${service.slug}`}>
                          <Button size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                            Enquire for {service.title}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};
