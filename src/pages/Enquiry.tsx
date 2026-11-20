import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { enquirySchema, type EnquiryFormValues } from '@/utils/validators';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { SEOHead } from '@/components/common/SEOHead';
import { dataService } from '@/services/dataService';
import type { Service, BudgetRange } from '@/types';

export const Enquiry: React.FC = () => {
  const [searchParams] = useSearchParams();
  const serviceSlugParam = searchParams.get('service');

  const [services, setServices] = useState<Service[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState<string>('');
  const [serverError, setServerError] = useState<string | null>(null);

  const budgetOptions: BudgetRange[] = [
    'Below ₹5,000',
    '₹5,000–₹10,000',
    '₹10,000–₹25,000',
    '₹25,000–₹50,000',
    'Above ₹50,000',
    'Not decided yet',
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      customer_name: '',
      business_name: '',
      email: '',
      phone: '',
      whatsapp: '',
      service_id: '',
      project_description: '',
      reference_url: '',
      budget: '₹10,000–₹25,000',
      expected_date: '',
      additional_requirements: '',
      website_honeypot: '',
    },
  });

  useEffect(() => {
    dataService.getServices().then((data) => {
      setServices(data);
      if (serviceSlugParam) {
        const matched = data.find((s) => s.slug === serviceSlugParam);
        if (matched) {
          setValue('service_id', matched.id);
        }
      }
    });
  }, [serviceSlugParam, setValue]);

  const onSubmit = async (values: EnquiryFormValues) => {
    // Spam honeypot check
    if (values.website_honeypot && values.website_honeypot.length > 0) {
      console.warn('Spam submission caught by honeypot.');
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const selectedService = services.find((s) => s.id === values.service_id);

      const created = await dataService.createEnquiry({
        customer_name: values.customer_name.trim(),
        business_name: values.business_name?.trim() || undefined,
        email: values.email.trim(),
        phone: values.phone.trim(),
        whatsapp: values.whatsapp?.trim() || undefined,
        service_id: values.service_id || undefined,
        service_title: selectedService?.title,
        project_description: values.project_description.trim(),
        reference_url: values.reference_url?.trim() || undefined,
        budget: values.budget,
        expected_date: values.expected_date || undefined,
        additional_requirements: values.additional_requirements?.trim() || undefined,
      });

      setSubmittedId(created.id);
      setSubmittedSuccess(true);
      reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setServerError(err.message || 'Failed to submit enquiry. Please try again or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Project Enquiry — ClearCode.dev"
        description="Submit your project details for website development, e-commerce, or web applications. Get a transparent quote and launch strategy."
      />

      <section className="pt-16 pb-24 bg-background relative overflow-hidden gradient-glow-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {submittedSuccess ? (
            <Card className="p-8 sm:p-12 text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-heading font-bold text-white mb-3">
                Project Enquiry Received!
              </h1>
              <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-6">
                Thank you for reaching out to ClearCode.dev. We have logged your project specifications in our secure PostgreSQL database. Our team will review your requirements and get back to you within 24 hours.
              </p>

              <div className="p-4 rounded-xl bg-surface border border-surface-border text-xs text-text-muted mb-8 font-mono">
                Reference ID: <span className="text-brand-cyan select-all">{submittedId}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/">
                  <Button variant="secondary" size="md">
                    Return to Homepage
                  </Button>
                </Link>
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hello ClearCode.dev! I just submitted an enquiry (Ref: ${submittedId}). Would love to discuss it further.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="md" leftIcon={<MessageSquare className="w-4 h-4 text-[#25D366]" />}>
                    Message on WhatsApp
                  </Button>
                </a>
              </div>
            </Card>
          ) : (
            <>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-xs font-medium text-brand-cyan mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" /> Start Your Project
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
                  Tell Us About <span className="gradient-text">Your Project</span>
                </h1>
                <p className="mt-4 text-base text-text-secondary max-w-xl mx-auto leading-relaxed">
                  Provide your requirements below. We evaluate every detail and respond with technical clarity, timeline estimates, and honest pricing.
                </p>
              </div>

              {serverError && (
                <div className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <Card className="p-6 sm:p-10 shadow-glow">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Honeypot field (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      {...register('website_honeypot')}
                    />
                  </div>

                  {/* Customer & Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                        Your Full Name <span className="text-brand-cyan">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register('customer_name')}
                        className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white placeholder-text-muted text-sm border-glow-focus transition-all"
                      />
                      {errors.customer_name && (
                        <p className="text-xs text-rose-400 mt-1.5">{errors.customer_name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                        Business / Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Apex Innovations (Optional)"
                        {...register('business_name')}
                        className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white placeholder-text-muted text-sm border-glow-focus transition-all"
                      />
                      {errors.business_name && (
                        <p className="text-xs text-rose-400 mt-1.5">{errors.business_name.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                        Email Address <span className="text-brand-cyan">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        {...register('email')}
                        className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white placeholder-text-muted text-sm border-glow-focus transition-all"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 mt-1.5">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                        Phone Number <span className="text-brand-cyan">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        {...register('phone')}
                        className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white placeholder-text-muted text-sm border-glow-focus transition-all"
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-400 mt-1.5">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* WhatsApp & Required Service */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                        WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210 (For quick updates)"
                        {...register('whatsapp')}
                        className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white placeholder-text-muted text-sm border-glow-focus transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                        Required Service
                      </label>
                      <select
                        {...register('service_id')}
                        className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white text-sm border-glow-focus transition-all cursor-pointer"
                      >
                        <option value="">Select a service (or leave general)</option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id} className="bg-surface text-white">
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Budget & Expected Completion Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                        Approximate Budget <span className="text-brand-cyan">*</span>
                      </label>
                      <select
                        {...register('budget')}
                        className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white text-sm border-glow-focus transition-all cursor-pointer"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b} className="bg-surface text-white">
                            {b}
                          </option>
                        ))}
                      </select>
                      {errors.budget && (
                        <p className="text-xs text-rose-400 mt-1.5">{errors.budget.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                        Expected Completion Date
                      </label>
                      <input
                        type="date"
                        {...register('expected_date')}
                        className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white text-sm border-glow-focus transition-all cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Reference URL */}
                  <div>
                    <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                      Reference Website URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com (Websites you like the look/feel of)"
                      {...register('reference_url')}
                      className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white placeholder-text-muted text-sm border-glow-focus transition-all"
                    />
                    {errors.reference_url && (
                      <p className="text-xs text-rose-400 mt-1.5">{errors.reference_url.message}</p>
                    )}
                  </div>

                  {/* Project Description */}
                  <div>
                    <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                      Project Description <span className="text-brand-cyan">*</span>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Describe the website you want to build, key pages, desired integrations, target audience, and any specific ideas..."
                      {...register('project_description')}
                      className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white placeholder-text-muted text-sm border-glow-focus transition-all"
                    />
                    {errors.project_description && (
                      <p className="text-xs text-rose-400 mt-1.5">{errors.project_description.message}</p>
                    )}
                  </div>

                  {/* Additional Requirements */}
                  <div>
                    <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                      Additional Requirements / Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Domain or hosting already purchased? Need multilingual support? Need custom animations?"
                      {...register('additional_requirements')}
                      className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white placeholder-text-muted text-sm border-glow-focus transition-all"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto"
                      isLoading={isSubmitting}
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Submit Project Enquiry
                    </Button>
                    <span className="block sm:inline-block sm:ml-4 text-xs text-text-muted mt-3 sm:mt-0">
                      🔒 Your data is stored securely in PostgreSQL with encrypted transmission.
                    </span>
                  </div>
                </form>
              </Card>
            </>
          )}
        </div>
      </section>
    </>
  );
};
