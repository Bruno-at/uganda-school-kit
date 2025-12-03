import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { Separator } from '@/components/ui/separator';
import { Moon, Sun, Bell, Type, Shield, Newspaper, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [fontSize, setFontSize] = useState<string>('medium');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    // Set page title and meta description
    document.title = 'Settings - Excellence Academy';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Configure your language preferences and settings for Excellence Academy website.');
    }

    // Get saved preferences
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) setFontSize(savedFontSize);

    const savedEmailNotif = localStorage.getItem('emailNotifications');
    if (savedEmailNotif !== null) setEmailNotifications(savedEmailNotif === 'true');

    const savedPushNotif = localStorage.getItem('pushNotifications');
    if (savedPushNotif !== null) setPushNotifications(savedPushNotif === 'true');

    const savedAnalytics = localStorage.getItem('analyticsEnabled');
    if (savedAnalytics !== null) setAnalyticsEnabled(savedAnalytics === 'true');
  }, []);

  const handleFontSizeChange = (value: string) => {
    setFontSize(value);
    localStorage.setItem('fontSize', value);
    document.documentElement.style.fontSize = value === 'small' ? '14px' : value === 'large' ? '18px' : '16px';
    toast({ title: 'Font size updated', description: 'Your display preference has been saved.' });
  };

  const handleNotificationToggle = (type: 'email' | 'push', value: boolean) => {
    if (type === 'email') {
      setEmailNotifications(value);
      localStorage.setItem('emailNotifications', String(value));
    } else {
      setPushNotifications(value);
      localStorage.setItem('pushNotifications', String(value));
    }
    toast({ title: 'Notification preferences updated', description: `${type === 'email' ? 'Email' : 'Push'} notifications ${value ? 'enabled' : 'disabled'}.` });
  };

  const handleAnalyticsToggle = (value: boolean) => {
    setAnalyticsEnabled(value);
    localStorage.setItem('analyticsEnabled', String(value));
    toast({ title: 'Privacy settings updated', description: `Analytics ${value ? 'enabled' : 'disabled'}.` });
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t('settings.title')}</h1>
          <p className="text-muted-foreground">{t('settings.subtitle')}</p>
        </div>

        <div className="grid gap-6">
          {/* News & Events Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Newspaper className="h-5 w-5" />
                <CardTitle>News & Events</CardTitle>
              </div>
              <CardDescription>
                Manage news articles and upcoming events for your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/settings/news-events">
                <Button className="w-full">
                  <Newspaper className="h-4 w-4 mr-2" />
                  Open News & Events Settings
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Homepage Background Images */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                <CardTitle>Homepage Background Images</CardTitle>
              </div>
              <CardDescription>
                Manage the slideshow images displayed on your homepage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/settings/background-images">
                <Button className="w-full">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Manage Homepage Background Images
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                <CardTitle>{t('settings.appearance')}</CardTitle>
              </div>
              <CardDescription>
                {t('settings.appearanceDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="theme-toggle">{t('settings.theme')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.themeDesc')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <Switch
                    id="theme-toggle"
                    checked={theme === 'dark'}
                    onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                  />
                  <Moon className="h-4 w-4" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="font-size">{t('settings.fontSize')}</Label>
                <Select onValueChange={handleFontSizeChange} value={fontSize}>
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">{t('settings.fontSmall')}</SelectItem>
                    <SelectItem value="medium">{t('settings.fontMedium')}</SelectItem>
                    <SelectItem value="large">{t('settings.fontLarge')}</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {t('settings.fontSizeDesc')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>{t('settings.notifications')}</CardTitle>
              </div>
              <CardDescription>
                {t('settings.notificationsDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="email-notifications">{t('settings.emailNotifications')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.emailDesc')}
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={(checked) => handleNotificationToggle('email', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="push-notifications">{t('settings.pushNotifications')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.pushDesc')}
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={(checked) => handleNotificationToggle('push', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>{t('settings.privacy')}</CardTitle>
              </div>
              <CardDescription>
                {t('settings.privacyDesc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="analytics">{t('settings.analytics')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t('settings.analyticsDesc')}
                  </p>
                </div>
                <Switch
                  id="analytics"
                  checked={analyticsEnabled}
                  onCheckedChange={handleAnalyticsToggle}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
