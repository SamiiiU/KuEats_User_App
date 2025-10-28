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
  const [user, setUser] = useState("Sami");
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setUser(session?.user ?? null);
  //     setLoading(false);
  //   });

  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setUser(session?.user ?? null);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  const signIn = async (email: string, password: string) => {
    // 1. Authenticate with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data?.user) {
      return { error: error || { message: 'Authentication failed' } };
    }
    // 2. Fetch user from users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (userError || !userData) {
      return { error: { message: 'User not found in users table' } };
    }

    setIsAuthenticated(true);
    setUser(userData); // Optionally set user to userData if you want app-wide info

    return { error: null };
  };

  useEffect(() => {
    console.log("user data updated" , user)
  } , [user])

  const signUp = async ({ name, email, department, password }: any) => {
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
