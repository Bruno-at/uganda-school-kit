import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Newspaper, Image as ImageIcon, Activity, Shield, KeyRound, Mail, Lock, LogOut, Users, ImageIcon as GalleryIcon } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AdminRoute from '@/components/auth/AdminRoute';

const AdminDashboardContent = () => {
  const { user, signOut } = useAuth();
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatingEmail, setUpdatingEmail] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) return;
    setUpdatingEmail(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    setUpdatingEmail(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Email update initiated! Check both old and new email for confirmation links.');
      setNewEmail('');
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setUpdatingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setUpdatingPassword(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated successfully!');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Signed in as <strong>{user?.email}</strong></p>
          </div>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Content Management */}
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage your website content</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <Link to="/settings/news-events">
                <Button variant="outline" className="w-full h-24 flex-col gap-2">
                  <Newspaper className="h-6 w-6" />
                  News & Events
                </Button>
              </Link>
              <Link to="/settings/activities">
                <Button variant="outline" className="w-full h-24 flex-col gap-2">
                  <Activity className="h-6 w-6" />
                  School Activities
                </Button>
              </Link>
              <Link to="/settings/background-images">
                <Button variant="outline" className="w-full h-24 flex-col gap-2">
                  <ImageIcon className="h-6 w-6" />
                  Background Images
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Change Login Credentials */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                <CardTitle>Change Admin Credentials</CardTitle>
              </div>
              <CardDescription>
                Update your admin email or password. Use this when handing over admin access to a new person.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Change Email */}
              <form onSubmit={handleUpdateEmail} className="space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Change Email
                </h3>
                <p className="text-xs text-muted-foreground">Current: {user?.email}</p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="New email address"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" disabled={updatingEmail}>
                    {updatingEmail ? 'Updating...' : 'Update'}
                  </Button>
                </div>
              </form>

              <Separator />

              {/* Change Password */}
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Lock className="h-4 w-4" /> Change Password
                </h3>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="New password (min 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" disabled={updatingPassword}>
                  {updatingPassword ? 'Updating...' : 'Update Password'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => (
  <AdminRoute>
    <AdminDashboardContent />
  </AdminRoute>
);

export default AdminDashboard;
