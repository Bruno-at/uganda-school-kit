import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const Settings = () => {
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Settings - Excellence Academy';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Configure your language preferences and settings for Excellence Academy website.');
    }

    // Load Google Translate script
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate
    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,sw,fr,ar,zh-CN,es,de,pt,it,ja,ko,hi,ru',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );

      // Restore saved language preference
      const savedLang = localStorage.getItem('preferredLanguage');
      if (savedLang && savedLang !== 'en') {
        setTimeout(() => {
          const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
          if (select) {
            select.value = savedLang;
            select.dispatchEvent(new Event('change'));
          }
        }, 1000);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleLanguageChange = (value: string) => {
    localStorage.setItem('preferredLanguage', value);
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = value;
      select.dispatchEvent(new Event('change'));
    }
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
              <Select onValueChange={handleLanguageChange} defaultValue="en">
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

            {/* Hidden Google Translate Element */}
            <div id="google_translate_element" style={{ display: 'none' }}></div>

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
