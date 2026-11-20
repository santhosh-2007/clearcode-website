import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { SEOHead } from '@/components/common/SEOHead';
import { dataService } from '@/services/dataService';
import type { FAQ } from '@/types';

export const FAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    dataService.getFAQs().then(setFaqs);
  }, []);

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions — ClearCode.dev"
        description="Find answers to common questions about ClearCode.dev web development services, timelines, pricing, and domain setup."
      />

      <section className="pt-16 pb-24 bg-background relative overflow-hidden gradient-glow-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-xs font-medium text-brand-cyan mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Answers & Guidance
            </div>
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              Everything you need to know about partnering with ClearCode.dev to build your next web platform.
            </p>

            {/* Search Input */}
            <div className="mt-8 max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-text-muted absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions (e.g. timelines, mobile, hosting)..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-surface border border-surface-border text-white text-sm placeholder-text-muted border-glow-focus transition-all"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 text-text-secondary text-sm">
                No matching questions found for "{searchQuery}". Try a different keyword or contact us directly.
              </div>
            ) : (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={faq.id}
                    className="rounded-xl border border-surface-border bg-surface transition-all overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between text-white font-heading font-semibold hover:text-brand-cyan transition-colors"
                    >
                      <span className="text-base sm:text-lg">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-brand-blue shrink-0 transition-transform duration-200 ml-4 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 text-sm sm:text-base text-text-secondary leading-relaxed border-t border-surface-border/50 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Still have questions */}
          <div className="mt-16 p-8 rounded-2xl bg-surface-cardHover border border-surface-border text-center">
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              Have a question not listed here?
            </h3>
            <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
              We are always happy to discuss your specific technical requirements, architectural questions, or ideas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="sm" variant="secondary">
                  Contact Our Studio
                </Button>
              </Link>
              <Link to="/enquiry">
                <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Start Project Enquiry
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
