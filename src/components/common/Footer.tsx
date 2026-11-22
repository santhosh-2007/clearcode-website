import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, MessageSquare, Github, Linkedin, Instagram, Twitter, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { dataService } from '@/services/dataService';
import type { SiteSettingsGeneral } from '@/types';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettingsGeneral | null>(null);

  useEffect(() => {
    dataService.getSettings().then(setSettings);
  }, []);

  const phone = settings?.whatsapp_number?.replace(/\D/g, '') || '919876543210';
  const email = settings?.contact_email || 'clearcode.dev16@gmail.com';
  const footerDescription = settings?.footer_description || 'Modern Web Development Studio. We engineer lightning-fast, high-converting websites and scalable web applications for startups, businesses, and ambitious creators.';
  const footerCopyright = settings?.footer_copyright || 'ClearCode.dev. Code It. Build It. Launch It. All rights reserved.';

  return (
    <footer className="bg-background-secondary border-t border-surface-border relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-blue/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface border border-surface-border flex items-center justify-center text-brand-cyan shadow-glow">
                <Code2 className="w-5 h-5 text-brand-blue" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-white">
                ClearCode<span className="text-brand-blue">.dev</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary max-w-sm leading-relaxed">
              {footerDescription}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={settings?.social_links?.github || 'https://github.com/clearcode-dev'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-surface border border-surface-border flex items-center justify-center text-text-secondary hover:text-white hover:border-brand-blue transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={settings?.social_links?.linkedin || 'https://linkedin.com/company/clearcode-dev'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-surface border border-surface-border flex items-center justify-center text-text-secondary hover:text-white hover:border-brand-blue transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={settings?.social_links?.instagram || 'https://instagram.com/clearcode.dev'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-surface border border-surface-border flex items-center justify-center text-text-secondary hover:text-white hover:border-brand-blue transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings?.social_links?.twitter || 'https://twitter.com/clearcodedev'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-surface border border-surface-border flex items-center justify-center text-text-secondary hover:text-white hover:border-brand-blue transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link to="/" className="hover:text-brand-cyan transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-cyan transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-cyan transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-brand-cyan transition-colors">Portfolio / Work</Link>
              </li>
              <li>
                <Link to="/enquiry" className="hover:text-brand-cyan transition-colors">Project Enquiry</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-cyan transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-brand-cyan transition-colors">FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-text-secondary">
              <li>
                <Link to="/services" className="hover:text-brand-cyan transition-colors">Business Websites</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-cyan transition-colors">E-commerce Stores</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-cyan transition-colors">Personal Portfolios</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-cyan transition-colors">Restaurant & Hotel</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-cyan transition-colors">Custom Web Apps</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-cyan transition-colors">Website Redesign</Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Contact & Support
            </h4>
            <div className="space-y-3 text-sm text-text-secondary">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-brand-blue" />
                <span>{email}</span>
              </a>
              <a
                href={`https://wa.me/${phone}?text=${encodeURIComponent("Hello ClearCode.dev! I would like to discuss a project.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#25D366] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Instant Chat</span>
              </a>
              <div className="pt-3">
                <Link to="/admin/login" className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text-secondary transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            &copy; {new Date().getFullYear()} {footerCopyright}
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:text-text-secondary transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
