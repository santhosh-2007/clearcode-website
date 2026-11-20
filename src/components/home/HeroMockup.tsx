import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Smartphone, Globe, CheckCircle2 } from 'lucide-react';

export const HeroMockup: React.FC = () => {
  return (
    <div className="relative mx-auto w-full max-w-5xl mt-12 lg:mt-16 perspective-[1200px]">
      {/* Background glow effects */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-4/5 h-64 bg-brand-blue/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-12 w-64 h-64 bg-brand-cyan/15 blur-[90px] rounded-full pointer-events-none" />

      {/* Main Laptop Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 6 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative mx-auto bg-surface border border-surface-borderLight rounded-2xl shadow-glow overflow-hidden z-10"
      >
        {/* Browser Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0c121e] border-b border-surface-border">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-surface border border-surface-border text-xs text-text-secondary font-mono max-w-xs w-full justify-center">
            <Globe className="w-3 h-3 text-brand-cyan shrink-0" />
            <span className="text-white truncate">https://clearcode.dev/studio</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-brand-cyan font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="hidden sm:inline">Production</span>
          </div>
        </div>

        {/* Browser Screen Content */}
        <div className="p-5 sm:p-8 bg-[#090e18] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-xs font-medium text-brand-cyan">
              <Zap className="w-3.5 h-3.5 text-brand-cyan" /> Next-Gen Agency Architecture
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white leading-tight">
              Crafting websites that turn casual clicks into committed clients.
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Engineered with clean React, TypeScript, and high-performance databases. Zero bloat, instant page responses, and custom visual identity.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-surface/70 border border-surface-border flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-white">99+ Google Speed</div>
                  <div className="text-[11px] text-text-muted">Core Web Vitals green</div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-surface/70 border border-surface-border flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-white">PostgreSQL + RLS</div>
                  <div className="text-[11px] text-text-muted">Enterprise database security</div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-surface/90 border border-surface-border rounded-xl p-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border text-xs">
              <span className="font-semibold text-white">Live Project Metrics</span>
              <span className="text-emerald-400 font-mono">+94% Conversions</span>
            </div>
            <div className="space-y-3 pt-3">
              <div>
                <div className="flex justify-between text-[11px] text-text-secondary mb-1">
                  <span>Mobile Usability</span>
                  <span className="text-brand-cyan font-bold">100%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-cardHover overflow-hidden">
                  <div className="h-full bg-gradient-brand w-full rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-text-secondary mb-1">
                  <span>SEO Visibility Score</span>
                  <span className="text-brand-cyan font-bold">98/100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-cardHover overflow-hidden">
                  <div className="h-full bg-brand-cyan w-[98%] rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-text-secondary mb-1">
                  <span>First Contentful Paint</span>
                  <span className="text-emerald-400 font-bold">0.38s</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-cardHover overflow-hidden">
                  <div className="h-full bg-emerald-400 w-[95%] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Mobile Phone Mockup */}
      <motion.div
        initial={{ opacity: 0, x: 40, y: 40 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
        className="hidden sm:block absolute -bottom-8 -right-6 lg:-right-10 w-64 bg-surface border-2 border-surface-borderLight rounded-3xl p-3 shadow-glow-lg z-20"
      >
        <div className="w-16 h-1 bg-surface-border mx-auto rounded-full mb-3" />
        <div className="bg-[#090e18] rounded-2xl p-3.5 border border-surface-border space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-brand-cyan" />
              <span className="text-[11px] font-semibold text-white">Mobile View</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">100% Fluid</span>
          </div>
          <div className="w-full h-20 rounded-lg bg-surface-cardHover border border-surface-border p-2 flex flex-col justify-between">
            <div className="w-3/4 h-2 bg-brand-blue/60 rounded" />
            <div className="w-1/2 h-2 bg-surface-borderLight rounded" />
            <div className="w-2/3 h-5 bg-brand-blue text-[9px] text-white font-semibold rounded flex items-center justify-center">
              Tap to WhatsApp
            </div>
          </div>
          <div className="text-[10px] text-text-secondary text-center">
            Responsive on all smartphones
          </div>
        </div>
      </motion.div>

      {/* Floating Badge Left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="hidden md:flex absolute -bottom-4 -left-6 items-center gap-3 bg-surface/90 backdrop-blur-md border border-brand-blue/40 px-4 py-2.5 rounded-2xl shadow-glow z-20"
      >
        <div className="w-8 h-8 rounded-xl bg-brand-blue/20 flex items-center justify-center text-brand-cyan">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-white">Turnkey Launch</div>
          <div className="text-[11px] text-text-secondary">DNS + SSL + Hosting included</div>
        </div>
      </motion.div>
    </div>
  );
};
