import React, { useEffect, useState } from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { Card } from '@/components/common/Card';
import { SEOHead } from '@/components/common/SEOHead';
import { dataService } from '@/services/dataService';

export const PrivacyPolicy: React.FC = () => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    dataService.getContentPage('privacy-policy').then(setContent);
  }, []);

  const sections = content?.sections || [
    {
      title: '1. Information We Collect',
      content: 'When you submit a project enquiry or contact ClearCode.dev, we collect your name, business name, email address, phone number, WhatsApp contact, project descriptions, and budget preferences strictly for the purpose of communicating about potential development services.'
    },
    {
      title: '2. How We Use Your Information',
      content: 'We use the provided information solely to evaluate project requirements, formulate project proposals and quotations, coordinate development milestones, and respond to your direct queries. We never sell, rent, or trade your contact information to third parties.'
    },
    {
      title: '3. Data Storage & Protection',
      content: 'Your enquiry details are stored securely in encrypted PostgreSQL databases powered by Supabase with Row Level Security (RLS) enforcement. Only authorized administrative personnel have access to enquiry records.'
    },
    {
      title: '4. Third-Party Services',
      content: 'Our website may integrate with trusted third-party providers such as Supabase (database & authentication) and Vercel (cloud hosting). Each of these services adheres to robust industry security standards.'
    },
    {
      title: '5. Contact Details for Privacy Inquiries',
      content: 'If you have questions about your personal data, wish to request removal of your enquiry record, or need privacy clarifications, please contact us directly at clearcode.dev16@gmail.com.'
    }
  ];

  return (
    <>
      <SEOHead
        title="Privacy Policy — ClearCode.dev"
        description="Review ClearCode.dev data handling, enquiry privacy, and data protection practices."
      />

      <section className="pt-16 pb-24 bg-background relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-xs font-medium text-brand-cyan mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Legal Notice
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-2 text-xs text-text-muted">
              Last updated: {content?.last_updated || 'February 2026'}
            </p>
          </div>

          {/* Draft Notice */}
          <div className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Notice:</strong> This policy is a draft document provided for transparency and requires business/legal review prior to official corporate publication.
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
