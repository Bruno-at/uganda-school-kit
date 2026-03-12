import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center gap-4">
          <Cookie className="h-6 w-6 text-secondary shrink-0 mt-1 md:mt-0" />
          <div className="flex-1">
            <p className="text-sm text-foreground font-medium">We use cookies</p>
            <p className="text-xs text-muted-foreground mt-1">
              This website uses cookies to enhance your browsing experience, serve personalized content, and analyze site traffic. 
              By clicking "Accept", you consent to our use of cookies. See our{' '}
              <a href="/privacy" className="text-primary underline">Privacy Policy</a> for more details.
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" size="sm" onClick={decline}>Decline</Button>
            <Button size="sm" onClick={accept}>Accept</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
