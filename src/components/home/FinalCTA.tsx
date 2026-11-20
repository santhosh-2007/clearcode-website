import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/common/Button';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-background-secondary to-background relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-3xl h-64 bg-brand-blue/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-xs font-medium text-brand-cyan mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Start Your Digital Transformation
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
          Ideas Deserve Better Websites.<br className="hidden sm:inline" />
          <span className="gradient-text"> Let's Build Yours Today.</span>
        </h2>

        <p className="mt-6 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Whether you need a brand-new business website, an e-commerce storefront, a redesign, or a custom web app, ClearCode.dev delivers high-performance code and stunning design.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/enquiry" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Start a Project
            </Button>
          </Link>

          <Link to="/contact" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto" leftIcon={<MessageSquare className="w-5 h-5 text-brand-cyan" />}>
              Contact Our Studio
            </Button>
          </Link>
        </div>

        <div className="mt-10 text-xs text-text-muted flex items-center justify-center gap-6">
          <span>✓ Free Initial Consultation</span>
          <span>✓ Transparent Quotation</span>
          <span>✓ 100% Mobile Responsive</span>
        </div>
      </div>
    </section>
  );
};
