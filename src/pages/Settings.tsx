import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Settings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  useEffect(() => {
    // Set page title and meta description
    document.title = 'Settings - Excellence Academy';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Configure your language preferences and settings for Excellence Academy website.');
    }

    // Get saved language from localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      setSelectedLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    localStorage.setItem('preferredLanguage', value);
    
    // Wait for Google Translate to be ready
    const checkAndTranslate = () => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = value;
        select.dispatchEvent(new Event('change'));
      } else {
        // If not ready, try again in 100ms
        setTimeout(checkAndTranslate, 100);
      }
    };
    
    checkAndTranslate();
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'sw', name: 'Kiswahili' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية (Arabic)' },
    { code: 'zh-CN', name: '中文 (Chinese)' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' },
    { code: 'pt', name: 'Português' },
    { code: 'it', name: 'Italiano' },
    { code: 'ja', name: '日本語 (Japanese)' },
    { code: 'ko', name: '한국어 (Korean)' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'ru', name: 'Русский (Russian)' },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Language Settings</CardTitle>
            <CardDescription>
              Choose your preferred language. The entire website will be translated automatically.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="language-select">Choose Language</Label>
              <Select onValueChange={handleLanguageChange} value={selectedLanguage}>
                <SelectTrigger id="language-select">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Your language preference will be saved and remembered on your next visit.
              </p>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">About Translation</h3>
              <p className="text-sm text-muted-foreground">
                Translation is powered by Google Translate. The selected language will apply to all pages across the website.
                Please note that automatic translations may not always be perfect.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
