import React, { useEffect, useState } from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { SEOHead } from '@/components/common/SEOHead';
import { dataService } from '@/services/dataService';

export const TermsConditions: React.FC = () => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    dataService.getContentPage('terms-and-conditions').then(setContent);
  }, []);

  const sections = content?.sections || [
    {
      title: '1. Website Usage',
      content: 'By accessing ClearCode.dev, you agree to comply with and be bound by these terms. The content, graphics, code samples, and designs showcased on this site are protected by copyright and intellectual property laws.'
    },
    {
      title: '2. Project Enquiries & Quotations',
      content: 'Submitting an enquiry via our website does not constitute a legally binding service contract. Official project engagements begin only upon written agreement of project scope, timelines, and commercial payment terms.'
    },
    {
      title: '3. Service Scope & Deliverables',
      content: 'ClearCode.dev provides web design, development, and maintenance as outlined in formal client proposals. Any out-of-scope requests or major architectural shifts will be estimated separately.'
    },
    {
      title: '4. Payments & Revisions',
      content: 'Project payments follow agreed milestone schedules (typically an initial deposit followed by milestone deliverables). Standard projects include designated revision cycles during active development.'
    },
    {
      title: '5. Intellectual Property Rights',
      content: 'Upon full and final settlement of all agreed project dues, full ownership of client-specific source code and customized assets is transferred to the client, unless otherwise agreed in writing.'
    },
    {
      title: '6. Limitation of Liability',
      content: 'ClearCode.dev shall not be held liable for indirect, consequential, or third-party service provider outages (including domain registrar issues, hosting downtime, or third-party API deprecations).'
    }
  ];

  return (
    <>
      <SEOHead
        title="Terms & Conditions — ClearCode.dev"
        description="Terms and conditions governing web development projects, enquiries, and service scope with ClearCode.dev."
      />

      <section className="pt-16 pb-24 bg-background relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-xs font-medium text-brand-cyan mb-4">
              <FileText className="w-3.5 h-3.5" /> Legal Notice
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Terms & Conditions
            </h1>
            <p className="mt-2 text-xs text-text-muted">
              Last updated: {content?.last_updated || 'February 2026'}
            </p>
          </div>

          {/* Draft Notice */}
          <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Notice:</strong> This terms and conditions document is a draft template provided for operational clarity and requires legal review prior to final commercial execution.
            </span>
          </div>

          <Card className="p-6 sm:p-10 space-y-8 text-sm text-text-secondary leading-relaxed">
            {sections.map((sec: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <h2 className="text-lg font-heading font-bold text-white">
                  {sec.title}
                </h2>
                <p>{sec.content}</p>
              </div>
            ))}
          </Card>
        </div>
      </section>
    </>
  );
};
