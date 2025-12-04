import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAdminAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminExists, setAdminExists] = useState<boolean | null>(null);

  const checkAdminExists = async () => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('id')
      .eq('role', 'admin')
      .limit(1);
    
    if (error) {
      console.error('Error checking admin existence:', error);
      return false;
    }
    return data && data.length > 0;
  };

  const checkIsAdmin = async (userId: string) => {
    const { data, error } = await supabase
      .rpc('has_role', { _user_id: userId, _role: 'admin' });
    
    if (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
    return data === true;
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer admin check
        if (session?.user) {
          setTimeout(async () => {
            const adminStatus = await checkIsAdmin(session.user.id);
            setIsAdmin(adminStatus);
            setIsLoading(false);
          }, 0);
        } else {
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session and admin existence
    const initialize = async () => {
      const [sessionResult, adminExistsResult] = await Promise.all([
        supabase.auth.getSession(),
        checkAdminExists()
      ]);
      
      setAdminExists(adminExistsResult);
      
      const currentSession = sessionResult.data.session;
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        const adminStatus = await checkIsAdmin(currentSession.user.id);
        setIsAdmin(adminStatus);
      }
      setIsLoading(false);
    };

    initialize();

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) return { error };
    
    // Verify this user is an admin
    if (data.user) {
      const adminStatus = await checkIsAdmin(data.user.id);
      if (!adminStatus) {
        await supabase.auth.signOut();
        return { error: { message: 'Access denied. You are not an administrator.' } };
      }
    }
    
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    // First check if admin already exists - block signup if so
    const exists = await checkAdminExists();
    if (exists) {
      return { error: { message: 'An admin account already exists. Only one admin is allowed.' } };
    }

    const redirectUrl = `${window.location.origin}/admin-auth`;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl }
    });
    
    if (error) return { error };
    
    // Check if email is already registered
    if (data.user && !data.user.identities?.length) {
      return { error: { message: 'This email is already registered. Please sign in instead.' } };
    }
    
    // First signup - automatically assign admin role
    if (data.user) {
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({ user_id: data.user.id, role: 'admin' });
      
      if (roleError) {
        // If role assignment fails, sign out the user to prevent orphaned accounts
        console.error('Error adding admin role:', roleError);
        await supabase.auth.signOut();
        return { error: { message: 'Failed to create admin account. Please try again.' } };
      }
      
      setAdminExists(true);
    }
    
    return { error: null, needsConfirmation: !data.session };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  const updateCredentials = async (currentPassword: string, newEmail: string, newPassword: string) => {
    // First verify current password by re-authenticating
    if (!user?.email) {
      return { error: { message: 'No user logged in' } };
    }

    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (verifyError) {
      return { error: { message: 'Current password is incorrect' } };
    }

    // Update email if changed
    if (newEmail && newEmail !== user.email) {
      const { error: emailError } = await supabase.auth.updateUser({ email: newEmail });
      if (emailError) {
        return { error: { message: `Failed to update email: ${emailError.message}` } };
      }
    }

    // Update password if provided
    if (newPassword) {
      const { error: passwordError } = await supabase.auth.updateUser({ password: newPassword });
      if (passwordError) {
        return { error: { message: `Failed to update password: ${passwordError.message}` } };
      }
    }

    return { error: null };
  };

  const refreshAdminExists = async () => {
    const exists = await checkAdminExists();
    setAdminExists(exists);
    return exists;
  };

  return {
    user,
    session,
    isAdmin,
    isLoading,
    adminExists,
    signIn,
    signUp,
    signOut,
    updateCredentials,
    refreshAdminExists,
  };
};
