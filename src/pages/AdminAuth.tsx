import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Shield, KeyRound, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminAuth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { 
    user, 
    isAdmin, 
    isLoading, 
    adminExists, 
    signIn, 
    signUp, 
    signOut,
    updateCredentials,
    refreshAdminExists 
  } = useAdminAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Change credentials state
  const [showChangeDialog, setShowChangeDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingCredentials, setChangingCredentials] = useState(false);

  // Get redirect path from location state
  const redirectTo = (location.state as any)?.from || '/settings';

  useEffect(() => {
    document.title = 'Admin Login | Excellence Academy';
    refreshAdminExists();
  }, []);

  useEffect(() => {
    // If admin is logged in, redirect to intended page
    if (!isLoading && user && isAdmin) {
      navigate(redirectTo, { replace: true });
    }
  }, [user, isAdmin, isLoading, navigate, redirectTo]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    
    if (error) {
      toast({ title: 'Sign in failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Welcome', description: 'You are now signed in as admin.' });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }
    
    if (password.length < 6) {
      toast({ title: 'Error', description: 'Password must be at least 6 characters', variant: 'destructive' });
      return;
    }
    
    setLoading(true);
    const { error, needsConfirmation } = await signUp(email, password);
    setLoading(false);
    
    if (error) {
      toast({ title: 'Sign up failed', description: error.message, variant: 'destructive' });
    } else if (needsConfirmation) {
      toast({ 
        title: 'Check your email', 
        description: 'We sent you a confirmation link. After confirming, return here to sign in.' 
      });
      await refreshAdminExists();
    } else {
      toast({ title: 'Account created', description: 'You are now signed in as admin.' });
    }
  };

  const handleChangeCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast({ title: 'Error', description: 'Please enter your current password', variant: 'destructive' });
      return;
    }
    
    if (newPassword && newPassword !== confirmPassword) {
      toast({ title: 'Error', description: 'New passwords do not match', variant: 'destructive' });
      return;
    }
    
    if (newPassword && newPassword.length < 6) {
      toast({ title: 'Error', description: 'New password must be at least 6 characters', variant: 'destructive' });
      return;
    }
    
    if (!newEmail && !newPassword) {
      toast({ title: 'Error', description: 'Please enter a new email or password', variant: 'destructive' });
      return;
    }
    
    setChangingCredentials(true);
    const { error } = await updateCredentials(currentPassword, newEmail, newPassword);
    setChangingCredentials(false);
    
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Your credentials have been updated.' });
      setShowChangeDialog(false);
      setCurrentPassword('');
      setNewEmail('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast({ title: 'Signed out', description: 'You have been signed out.' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If logged in as admin, show admin panel
  if (user && isAdmin) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4 max-w-md">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <CardTitle>Admin Panel</CardTitle>
              </div>
              <CardDescription>Logged in as {user.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Dialog open={showChangeDialog} onOpenChange={setShowChangeDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <KeyRound className="h-4 w-4 mr-2" />
                    Change Admin Credentials
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Credentials</DialogTitle>
                    <DialogDescription>
                      Enter your current password and new credentials
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleChangeCredentials} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-email">New Email (optional)</Label>
                      <Input
                        id="new-email"
                        type="email"
                        placeholder={user.email || ''}
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password (optional)</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="Leave blank to keep current"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={!newPassword}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={changingCredentials}>
                      {changingCredentials ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        'Update Credentials'
                      )}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
              
              <Button variant="destructive" onClick={handleSignOut} className="w-full">
                Sign Out
              </Button>
              
              <Link to="/settings">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-md">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <CardTitle>Admin Access</CardTitle>
            </div>
            <CardDescription>
              {adminExists 
                ? 'Sign in with your admin credentials'
                : 'Create your admin account to get started'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {adminExists === false ? (
              // Show only signup when no admin exists
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum 6 characters
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Admin Account'
                  )}
                </Button>
              </form>
            ) : (
              // Show only login when admin exists
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            )}
            
            <div className="text-center mt-6">
              <Link to="/settings" className="text-primary underline text-sm">
                Back to Settings
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAuth;
