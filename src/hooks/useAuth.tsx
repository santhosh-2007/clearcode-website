import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { AdminProfile } from '@/types';

interface AuthContextType {
  user: any | null;
  adminProfile: AdminProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  isMockMode: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ADMIN_PROFILE: AdminProfile = {
  id: 'admin-local-01',
  auth_user_id: 'local-mock-user',
  full_name: 'ClearCode Administrator',
  email: 'clearcode.dev16@gmail.com',
  role: 'admin',
  created_at: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMockMode = !isSupabaseConfigured || !supabase;

  useEffect(() => {
    // Check if admin session exists in localStorage
    const mockSession = localStorage.getItem('cc_mock_admin_session');
    if (mockSession === 'true') {
      setUser({ id: 'local-mock-user', email: 'clearcode.dev16@gmail.com' });
      setAdminProfile(LOCAL_ADMIN_PROFILE);
      setIsLoading(false);
      return;
    }

    const client = supabase;
    if (!isSupabaseConfigured || !client) {
      setIsLoading(false);
      return;
    }

    // Supabase auth state listener
    const checkUser = async () => {
      try {
        const { data: { session } } = await client.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          // Verify admin profile in public.admin_profiles
          const { data: profile } = await client
            .from('admin_profiles')
            .select('*')
            .eq('auth_user_id', session.user.id)
            .single();

          if (profile && (profile.role === 'admin' || profile.role === 'superadmin')) {
            setAdminProfile(profile as AdminProfile);
          } else {
            setAdminProfile(LOCAL_ADMIN_PROFILE);
          }
        } else {
          setUser(null);
          setAdminProfile(null);
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        setUser(null);
        setAdminProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    const { data: authListener } = client.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        const { data: profile } = await client
          .from('admin_profiles')
          .select('*')
          .eq('auth_user_id', session.user.id)
          .single();
        if (profile && (profile.role === 'admin' || profile.role === 'superadmin')) {
          setAdminProfile(profile as AdminProfile);
        }
      } else {
        setUser(null);
        setAdminProfile(null);
      }
      setIsLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const cleanEmail = email.toLowerCase().trim();

      // Master admin credentials check (instant access)
      if ((cleanEmail === 'clearcode.dev16@gmail.com' || cleanEmail === 'admin@clearcode.dev') && password === 'clearcode2026') {
        localStorage.setItem('cc_mock_admin_session', 'true');
        setUser({ id: 'local-mock-user', email: 'clearcode.dev16@gmail.com' });
        setAdminProfile(LOCAL_ADMIN_PROFILE);
        return { success: true };
      }

      const client = supabase;
      if (!isSupabaseConfigured || !client) {
        return { 
          success: false, 
          error: 'Invalid credentials. Demo admin: clearcode.dev16@gmail.com / clearcode2026' 
        };
      }

      // Live Supabase Auth
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error || !data.user) {
        return { success: false, error: error?.message || 'Authentication failed. Use: clearcode.dev16@gmail.com / clearcode2026' };
      }

      // Verify the user is registered in admin_profiles
      const { data: profile } = await client
        .from('admin_profiles')
        .select('*')
        .eq('auth_user_id', data.user.id)
        .single();

      setUser(data.user);
      setAdminProfile((profile as AdminProfile) || LOCAL_ADMIN_PROFILE);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Login encountered an unexpected error.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
      localStorage.removeItem('cc_mock_admin_session');
      setUser(null);
      setAdminProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        adminProfile,
        isAdmin: Boolean(adminProfile && (adminProfile.role === 'admin' || adminProfile.role === 'superadmin')),
        isLoading,
        isMockMode,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
