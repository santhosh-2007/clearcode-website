import React, { useEffect, useState } from 'react';
import { Mail, MessageSquare, MapPin, Github, Linkedin, Instagram, Twitter, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { SEOHead } from '@/components/common/SEOHead';
import { dataService } from '@/services/dataService';
import type { SiteSettingsGeneral } from '@/types';

export const Contact: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettingsGeneral | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    dataService.getSettings().then(setSettings);
  }, []);

  const phone = settings?.whatsapp_number?.replace(/\D/g, '') || '919876543210';
  const businessEmail = settings?.contact_email || 'contact@clearcode.dev';
  const location = settings?.location || 'Global Remote Studio';

  const handleQuickContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setIsSending(true);

    dataService
      .createEnquiry({
        customer_name: name,
        email,
        phone: 'Contact Form Message',
        project_description: message,
        budget: 'Not decided yet',
      })
      .then(() => {
        setIsSending(false);
        setSent(true);
        setName('');
        setEmail('');
        setMessage('');
      });
  };

  return (
    <>
      <SEOHead
        title="Contact Us — ClearCode.dev"
        description="Get in touch with ClearCode.dev for website development inquiries, WhatsApp direct consultation, or custom software projects."
      />

      <section className="pt-16 pb-24 bg-background relative overflow-hidden gradient-glow-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Let's Talk About <span className="gradient-text">Your Website</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
              Have a question, need a consultation, or ready to start a project? Reach out through any of our direct communication channels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details & WhatsApp Button */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-6 sm:p-8 space-y-6">
                <h2 className="text-xl font-heading font-bold text-white">Direct Communication</h2>
                
                {/* WhatsApp Button */}
                <a
                  href={`https://wa.me/${phone}?text=${encodeURIComponent(
                    "Hello ClearCode.dev! I'm interested in developing a website. I would like to discuss my project."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 rounded-xl font-semibold shadow-lg shadow-[#25D366]/20 transition-all duration-200"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Start WhatsApp Conversation</span>
                </a>

                <div className="space-y-4 pt-4 border-t border-surface-border">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-surface-cardHover border border-surface-border flex items-center justify-center text-brand-blue shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-text-muted block">Official Email</span>
                      <a href={`mailto:${businessEmail}`} className="text-sm font-semibold text-white hover:text-brand-cyan transition-colors">
                        {businessEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-surface-cardHover border border-surface-border flex items-center justify-center text-brand-cyan shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-text-muted block">Availability & Response</span>
                      <span className="text-sm text-white">Mon – Sat (Responses within 24 hours)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-surface-cardHover border border-surface-border flex items-center justify-center text-emerald-400 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-text-muted block">Operating Base</span>
                      <span className="text-sm text-white">{location}</span>
                    </div>
                  </div>
                </div>

                {/* Socials */}
                <div className="pt-4 border-t border-surface-border">
                  <span className="text-xs text-text-muted block mb-3 font-semibold uppercase tracking-wider">
                    Follow Our Updates
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={settings?.social_links?.github || 'https://github.com/clearcode-dev'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-surface-cardHover border border-surface-border flex items-center justify-center text-text-secondary hover:text-white hover:border-brand-blue transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={settings?.social_links?.linkedin || 'https://linkedin.com/company/clearcode-dev'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-surface-cardHover border border-surface-border flex items-center justify-center text-text-secondary hover:text-white hover:border-brand-blue transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={settings?.social_links?.instagram || 'https://instagram.com/clearcode.dev'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-surface-cardHover border border-surface-border flex items-center justify-center text-text-secondary hover:text-white hover:border-brand-blue transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={settings?.social_links?.twitter || 'https://twitter.com/clearcodedev'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-surface-cardHover border border-surface-border flex items-center justify-center text-text-secondary hover:text-white hover:border-brand-blue transition-colors"
                      aria-label="Twitter / X"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Contact Message Form */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8">
                <h2 className="text-xl font-heading font-bold text-white mb-2">Send Us a Direct Message</h2>
                <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                  For formal project estimations and budget breakdowns, you can also use our detailed{' '}
                  <a href="/enquiry" className="text-brand-cyan hover:underline font-semibold">
                    Project Enquiry Form
                  </a>.
                </p>

                {sent ? (
                  <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                    <h3 className="font-heading font-bold text-white text-lg">Message Delivered!</h3>
                    <p className="text-xs text-text-secondary">
                      Thank you for contacting ClearCode.dev. We have received your message and will reply shortly.
                    </p>
                    <Button size="sm" variant="secondary" onClick={() => setSent(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleQuickContact} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Sarah Miller"
                        className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white placeholder-text-muted text-sm border-glow-focus transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white placeholder-text-muted text-sm border-glow-focus transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                        Your Message or Query
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what you are looking for..."
                        className="w-full px-4 py-3 rounded-lg bg-surface-cardHover border border-surface-border text-white placeholder-text-muted text-sm border-glow-focus transition-all"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="md"
                      isLoading={isSending}
                      rightIcon={<Send className="w-4 h-4" />}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
