import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, HelpCircle } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { SEOHead } from '@/components/common/SEOHead';

export const NotFound: React.FC = () => {
  return (
    <>
      <SEOHead title="404 — Page Not Found | ClearCode.dev" />
      <section className="min-h-[70vh] flex items-center justify-center py-20 px-4 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="text-7xl sm:text-8xl font-heading font-extrabold text-brand-blue/30 select-none">
            404
          </div>
          <h1 className="text-3xl font-heading font-bold text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            The page you requested does not exist or has been relocated. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/">
              <Button size="md" leftIcon={<Home className="w-4 h-4" />}>
                Back to Home
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="md" leftIcon={<HelpCircle className="w-4 h-4" />}>
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
