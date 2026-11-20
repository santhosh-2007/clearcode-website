import React, { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Inbox, 
  FolderKanban, 
  Layers, 
  FileEdit, 
  MessageSquareQuote, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Code2, 
  ShieldCheck, 
  ExternalLink,
  Database
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, isLoading, isMockMode, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner message="Verifying administrative session..." size="lg" />
      </div>
    );
  }

  // Guard: if not authenticated or not an admin, redirect to /admin/login
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Enquiries', path: '/admin/enquiries', icon: <Inbox className="w-4 h-4" /> },
    { name: 'Portfolio Projects', path: '/admin/projects', icon: <FolderKanban className="w-4 h-4" /> },
    { name: 'Services', path: '/admin/services', icon: <Layers className="w-4 h-4" /> },
    { name: 'Website Content & FAQs', path: '/admin/content', icon: <FileEdit className="w-4 h-4" /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <MessageSquareQuote className="w-4 h-4" /> },
    { name: 'Site Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row text-text-primary">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-surface border-b border-surface-border sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-brand-blue" />
          <span className="font-heading font-bold text-white text-base">ClearCode Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg text-text-secondary hover:text-white bg-surface-cardHover"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-surface-border flex flex-col justify-between transition-transform duration-200 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & Status */}
          <div className="p-6 border-b border-surface-border">
            <Link to="/" target="_blank" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-surface-cardHover border border-surface-border flex items-center justify-center text-brand-cyan shadow-sm">
                <Code2 className="w-4 h-4 text-brand-blue" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-white text-base leading-none">
                  ClearCode<span className="text-brand-blue">.dev</span>
                </span>
                <span className="text-[10px] text-brand-cyan uppercase tracking-wider font-semibold mt-1">
                  Admin Console
                </span>
              </div>
            </Link>

            {/* Mode Indicator */}
            <div className="mt-4 p-2 rounded-lg bg-background/60 border border-surface-border text-[11px] flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
              <div className="truncate">
                <span className="text-text-muted">Storage: </span>
                <span className={isMockMode ? 'text-amber-400 font-semibold' : 'text-emerald-400 font-semibold'}>
                  {isMockMode ? 'Local Mode' : 'Supabase Live'}
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand-blue/20 text-brand-cyan border border-brand-blue/40 font-semibold shadow-sm'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-surface-border space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" /> View Public Site
            </span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-background overflow-y-auto">
        {/* Top Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-surface-border bg-surface/30">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Authorized Administrator: </span>
            <span className="text-white font-mono">{user?.email || 'admin@clearcode.dev'}</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand-cyan hover:underline inline-flex items-center gap-1 font-medium"
            >
              Open Website <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </header>

        {/* Dynamic Admin Page Outlet */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
