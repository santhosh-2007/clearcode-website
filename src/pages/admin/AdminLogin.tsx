import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, ArrowRight, Code2, AlertCircle, Info } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { SEOHead } from '@/components/common/SEOHead';

export const AdminLogin: React.FC = () => {
  const { login, isLoading, isMockMode } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const result = await login(email, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleUseDemoCreds = () => {
    setEmail('clearcode.dev16@gmail.com');
    setPassword('clearcode2026');
  };

  return (
    <>
      <SEOHead title="Admin Login — ClearCode.dev" />

      <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-blue/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2 group mb-2">
              <div className="w-10 h-10 rounded-xl bg-surface border border-surface-border flex items-center justify-center text-brand-cyan shadow-glow">
                <Code2 className="w-5 h-5 text-brand-blue" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                ClearCode<span className="text-brand-blue">.dev</span>
              </span>
            </Link>
            <h1 className="text-2xl font-heading font-bold text-white">
              Administrator Portal
            </h1>
            <p className="text-xs text-text-secondary">
              Authorized access only. Public registration is permanently disabled.
            </p>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isMockMode && (
            <div className="p-4 rounded-xl bg-brand-blue/10 border border-brand-blue/30 text-xs text-brand-cyan space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <Info className="w-4 h-4 shrink-0" />
                <span>Demo Evaluation Mode</span>
              </div>
              <p className="text-text-secondary text-[11px] leading-relaxed">
                Supabase keys not yet connected. Click below to prefill evaluation credentials and test the entire admin dashboard with live state!
              </p>
              <button
                type="button"
                onClick={handleUseDemoCreds}
                className="text-xs font-semibold underline text-white hover:text-brand-cyan cursor-pointer"
              >
                Auto-fill Demo Admin (clearcode.dev16@gmail.com / clearcode2026)
              </button>
            </div>
          )}

          <Card className="p-6 sm:p-8 shadow-glow">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@clearcode.dev"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white placeholder-text-muted text-sm border-glow-focus transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-primary uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface-cardHover border border-surface-border text-white placeholder-text-muted text-sm border-glow-focus transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="md"
                  className="w-full"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Sign In to Admin
                </Button>
              </div>
            </form>
          </Card>

          <div className="text-center">
            <Link to="/" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              ← Return to ClearCode.dev public website
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
