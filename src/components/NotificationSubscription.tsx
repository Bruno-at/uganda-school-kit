import React, { useState, useEffect } from 'react';
import { Bell, BellOff, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface NotificationPreferences {
  email: string;
  events: boolean;
  news: boolean;
  announcements: boolean;
  enabled: boolean;
}

const STORAGE_KEY = 'notification_preferences';

const NotificationSubscription: React.FC = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { email: '', events: true, news: true, announcements: true, enabled: false };
      }
    }
    return { email: '', events: true, news: true, announcements: true, enabled: false };
  });
  const [pushSupported, setPushSupported] = useState(false);
  const [pushPermission, setPushPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPushSupported(true);
      setPushPermission(Notification.permission);
    }
  }, []);

  const savePreferences = (newPrefs: NotificationPreferences) => {
    setPreferences(newPrefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
  };

  const requestPushPermission = async () => {
    if (!pushSupported) {
      toast({
        title: 'Not Supported',
        description: 'Push notifications are not supported in this browser.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPushPermission(permission);
      
      if (permission === 'granted') {
        const newPrefs = { ...preferences, enabled: true };
        savePreferences(newPrefs);
        
        // Show a test notification
        new Notification('Excellence Academy', {
          body: 'You will now receive notifications for school events and activities!',
          icon: '/favicon.png',
          badge: '/favicon.png',
        });

        toast({
          title: 'Notifications Enabled!',
          description: 'You will receive push notifications for school events and updates.',
        });
      } else if (permission === 'denied') {
        toast({
          title: 'Permission Denied',
          description: 'Please enable notifications in your browser settings.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Push notification error:', error);
      toast({
        title: 'Error',
        description: 'Failed to enable push notifications.',
        variant: 'destructive',
      });
    }
  };

  const disableNotifications = () => {
    const newPrefs = { ...preferences, enabled: false };
    savePreferences(newPrefs);
    toast({
      title: 'Notifications Disabled',
      description: 'You will no longer receive push notifications.',
    });
  };

  const handleEmailSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!preferences.email || !preferences.email.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    const newPrefs = { ...preferences, enabled: true };
    savePreferences(newPrefs);

    toast({
      title: 'Subscribed Successfully!',
      description: `Notifications will be sent to ${preferences.email} for selected categories.`,
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
          <BellRing className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Event Notifications</h3>
          <p className="text-sm text-muted-foreground">Get notified about upcoming school events and activities</p>
        </div>
      </div>

      {/* Push Notifications */}
      {pushSupported && (
        <div className="mb-6 p-4 rounded-lg bg-muted/50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="font-medium text-sm">Browser Push Notifications</span>
            </div>
            {pushPermission === 'granted' && preferences.enabled ? (
              <Button variant="outline" size="sm" onClick={disableNotifications}>
                <BellOff className="h-4 w-4 mr-1" />
                Disable
              </Button>
            ) : (
              <Button size="sm" onClick={requestPushPermission}>
                <Bell className="h-4 w-4 mr-1" />
                Enable
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {pushPermission === 'granted' && preferences.enabled
              ? '✅ Push notifications are active. You will receive alerts for new events.'
              : pushPermission === 'denied'
              ? '❌ Notifications blocked. Enable them in browser settings.'
              : 'Receive instant alerts when new events are posted.'}
          </p>
        </div>
      )}

      {/* Email Notifications */}
      <form onSubmit={handleEmailSubscribe} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notification-email">Email for Notifications</Label>
          <Input
            id="notification-email"
            type="email"
            placeholder="your@email.com"
            value={preferences.email}
            onChange={(e) => savePreferences({ ...preferences, email: e.target.value })}
          />
        </div>

        <div className="space-y-3">
          <Label className="text-sm font-medium">Notification Categories</Label>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notif-events" className="text-sm">Upcoming Events</Label>
              <p className="text-xs text-muted-foreground">Sports days, conferences, exhibitions</p>
            </div>
            <Switch
              id="notif-events"
              checked={preferences.events}
              onCheckedChange={(checked) => savePreferences({ ...preferences, events: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notif-news" className="text-sm">School News</Label>
              <p className="text-xs text-muted-foreground">Achievements, announcements, updates</p>
            </div>
            <Switch
              id="notif-news"
              checked={preferences.news}
              onCheckedChange={(checked) => savePreferences({ ...preferences, news: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notif-announcements" className="text-sm">General Announcements</Label>
              <p className="text-xs text-muted-foreground">Fee reminders, schedule changes</p>
            </div>
            <Switch
              id="notif-announcements"
              checked={preferences.announcements}
              onCheckedChange={(checked) => savePreferences({ ...preferences, announcements: checked })}
            />
          </div>
        </div>

        <Button type="submit" className="w-full">
          <Bell className="h-4 w-4 mr-2" />
          Subscribe to Notifications
        </Button>
      </form>
    </Card>
  );
};

export default NotificationSubscription;
