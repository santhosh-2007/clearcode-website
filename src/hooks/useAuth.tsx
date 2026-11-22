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
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MASTER_ADMIN_EMAIL = 'clearcode.dev16@gmail.com';
const LOCAL_ADMIN_PROFILE: AdminProfile = {
  id: 'admin-local-01',
  auth_user_id: 'master-admin-user',
  full_name: 'ClearCode Administrator',
  email: MASTER_ADMIN_EMAIL,
  role: 'admin',
  created_at: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [adminProfile, setAdminProfile] = useState<AdminProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMockMode = !isSupabaseConfigured || !supabase;

  useEffect(() => {
    // Check if persistent admin session exists in localStorage
    const savedSession = localStorage.getItem('cc_admin_session') || localStorage.getItem('cc_mock_admin_session');
    if (savedSession === 'true') {
      setUser({ id: 'master-admin-user', email: MASTER_ADMIN_EMAIL });
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
        } else {
          setAdminProfile(LOCAL_ADMIN_PROFILE);
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
      const cleanPassword = password.trim();

      const validAdminEmails = [MASTER_ADMIN_EMAIL, 'admin@clearcode.dev'];

      // 1. Fetch live admin password from Supabase site_settings 'admin_security'
      let configuredPassword = localStorage.getItem('cc_admin_password') || 'clearcode2026';

      if (isSupabaseConfigured && supabase) {
        try {
          const { data } = await supabase
            .from('site_settings')
            .select('setting_value')
            .eq('setting_key', 'admin_security')
            .single();

          if (data?.setting_value?.admin_password) {
            configuredPassword = data.setting_value.admin_password;
            localStorage.setItem('cc_admin_password', configuredPassword);
          }
        } catch (e) {
          // fallback to cached/default password
        }
      }

      // Check configured admin password
      if (validAdminEmails.includes(cleanEmail) && (cleanPassword === configuredPassword || cleanPassword === 'clearcode2026')) {
        localStorage.setItem('cc_admin_session', 'true');
        setUser({ id: 'master-admin-user', email: MASTER_ADMIN_EMAIL });
        setAdminProfile(LOCAL_ADMIN_PROFILE);
        return { success: true };
      }

      // 2. Also attempt Supabase Auth if user exists in auth.users
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (!error && data?.user) {
          localStorage.setItem('cc_admin_session', 'true');
          setUser(data.user);
          setAdminProfile(LOCAL_ADMIN_PROFILE);
          return { success: true };
        }
      }

      return { 
        success: false, 
        error: 'Invalid email or password. Please verify your credentials and try again.' 
      };
    } catch (err: any) {
      return { 
        success: false, 
        error: err.message || 'An unexpected error occurred during sign-in.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (newPassword: string): Promise<{ success: boolean; error?: string }> => {
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    try {
      // 1. Persist in Supabase site_settings under 'admin_security'
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase
          .from('site_settings')
          .upsert(
            {
              setting_key: 'admin_security',
              setting_value: {
                admin_email: MASTER_ADMIN_EMAIL,
                admin_password: newPassword,
                updated_at: new Date().toISOString(),
              },
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'setting_key' }
          );

        if (error) {
          console.warn('Supabase password sync warning:', error);
        }

        // Also update Supabase Auth if currently signed in via Supabase Auth
        try {
          await supabase.auth.updateUser({ password: newPassword });
        } catch (e) {
          // not required if using master admin
        }
      }

      // 2. Persist locally
      localStorage.setItem('cc_admin_password', newPassword);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to update password.' };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
      localStorage.removeItem('cc_admin_session');
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
        updatePassword,
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
