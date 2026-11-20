import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Code2 } from 'lucide-react';
import { Button } from './Button';
import { dataService } from '@/services/dataService';
import type { SiteSettingsGeneral } from '@/types';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettingsGeneral | null>(null);
  const location = useLocation();

  useEffect(() => {
    dataService.getSettings().then(setSettings);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Our Work', path: '/portfolio' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Announcement Banner */}
      {settings?.announcement_banner?.enabled && (
        <div className="bg-brand-blue/15 border-b border-brand-blue/30 text-xs sm:text-sm text-brand-cyan py-2 px-4 text-center font-medium relative z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span>{settings.announcement_banner.text}</span>
            <Link to="/enquiry" className="underline hover:text-white font-semibold ml-2 inline-flex items-center gap-1">
              Start now <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/85 backdrop-blur-md border-b border-surface-border shadow-lg'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-surface border border-surface-border flex items-center justify-center text-brand-cyan shadow-glow group-hover:border-brand-blue group-hover:shadow-glow-lg transition-all duration-300">
                <Code2 className="w-5 h-5 text-brand-blue group-hover:text-brand-cyan transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl tracking-tight text-white flex items-center">
                  ClearCode<span className="text-brand-blue">.dev</span>
                </span>
                <span className="text-[10px] tracking-widest text-text-muted uppercase font-semibold">
                  Modern Web Studio
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-surface/40 p-1.5 rounded-full border border-surface-border/60 backdrop-blur-sm">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-blue/20 text-brand-cyan border border-brand-blue/40 shadow-sm'
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button */}
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/enquiry">
                <Button size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Start a Project
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-surface border border-surface-border text-text-secondary hover:text-white focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-surface-border animate-in slide-in-from-top-4 duration-200">
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                      isActive
                        ? 'bg-brand-blue/20 text-brand-cyan border border-brand-blue/40 font-semibold'
                        : 'text-text-secondary hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-surface-border">
                <Link to="/enquiry" className="block w-full">
                  <Button className="w-full" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Start a Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
