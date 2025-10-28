// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (data: {
    name: string;
    email: string;
    department: string;
    password: string;
  }) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>("Sami");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated , setIsAuthenticated] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setIsAuthenticated(true)
    console.log(data);
    return { error };
  };

  const signUp = async ({ name, email, department,  password }: any) => {
    // 1. Create auth account
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return { error };

    // 2. Insert user metadata in "users" table
    if (data?.user) {
      const { error: insertError } = await supabase.from('users').insert([
        {
          id: data.user.id,
          name,
          email,
          department,
        },
      ]);

      if (insertError) return { error: insertError };
    }

    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false)
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
