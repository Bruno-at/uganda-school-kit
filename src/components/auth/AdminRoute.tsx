import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, LogIn, Mail, Lock, AlertTriangle, UserPlus, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user, role, loading } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // User is logged in and is admin
  if (user && role === 'admin') {
    return <>{children}</>;
  }

  // User is logged in but not admin
  if (user && role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You are signed in as <strong>{user.email}</strong> with the role <strong>{role || 'user'}</strong>. 
              Only administrators can access this area.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Please sign out and sign in with admin credentials to access settings management.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not logged in - show login/register toggle
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>Admin Access Required</CardTitle>
          <CardDescription>
            {mode === 'login'
              ? 'Sign in with your admin credentials to manage settings.'
              : 'Register a new admin account. Only the first admin registration is allowed.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mode === 'login' ? <AdminLogin /> : <AdminRegistration />}
          <div className="mt-4 text-center">
            {mode === 'login' ? (
              <p className="text-sm text-muted-foreground">
                No admin account yet?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-primary underline hover:text-primary/80 font-medium"
                >
                  Register as Admin
                </button>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Already have an admin account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-primary underline hover:text-primary/80 font-medium"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSigningIn(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Signed in successfully!');
    }
  };

  return (
    <form onSubmit={handleAdminSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="admin-email">Admin Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input id="admin-email" type="email" placeholder="admin@example.com" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="admin-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input id="admin-password" type="password" placeholder="••••••••" className="pl-9" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={signingIn}>
        <LogIn className="h-4 w-4 mr-2" />
        {signingIn ? 'Signing in...' : 'Sign In as Admin'}
      </Button>
    </form>
  );
}

function AdminRegistration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Create profile
      await supabase.from('profiles').insert({
        user_id: data.user.id,
        full_name: fullName,
      });

      // Assign admin role (RLS "Allow first admin signup" policy will block if admin already exists)
      const { error: roleError } = await supabase.from('user_roles').insert({
        user_id: data.user.id,
        role: 'admin' as any,
      });

      if (roleError) {
        toast.error('An admin already exists. Please sign in with the existing admin credentials.');
      } else {
        toast.success('Admin account created! You may need to confirm your email.');
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input placeholder="Admin Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="email" placeholder="admin@example.com" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="password" placeholder="Min 6 characters" className="pl-9" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        <UserPlus className="h-4 w-4 mr-2" />
        {loading ? 'Creating...' : 'Register as Admin'}
      </Button>
    </form>
  );
}
