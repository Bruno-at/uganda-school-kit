import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { useEffect } from 'react';
import Index from "./pages/Index";
import About from "./pages/About";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";
import Academics from "./pages/Academics";
import StudentLife from "./pages/StudentLife";
import Parents from "./pages/Parents";
import News from "./pages/News";
import Portal from "./pages/Portal";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import UniformGuide from "./pages/UniformGuide";
import ParentNotices from "./pages/ParentNotices";
import ParentDownloads from "./pages/ParentDownloads";
import ParentSupport from "./pages/ParentSupport";
import FeeStructure from "./pages/FeeStructure";
import PTA from "./pages/PTA";
import BookVisit from "./pages/BookVisit";
import VirtualTour from "./pages/VirtualTour";
import NewsArticle from "./pages/NewsArticle";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Donate from "./pages/Donate";
import Membership from "./pages/Membership";
import Shop from "./pages/Shop";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslateLoader = () => {
  useEffect(() => {
    // Add comprehensive styling to hide Google Translate UI elements
    const style = document.createElement('style');
    style.innerHTML = `
      .goog-te-banner-frame,
      .goog-te-balloon-frame,
      #goog-gt-tt,
      .goog-te-balloon-frame,
      .skiptranslate,
      .goog-te-gadget,
      .goog-te-combo,
      body > .skiptranslate,
      body > .skiptranslate iframe.skiptranslate,
      #goog-gt-,
      .VIpgJd-ZVi9od-ORHb-OEVmcd {
        display: none !important;
      }
      #google_translate_element {
        display: none !important;
      }
      body {
        top: 0 !important;
        position: static !important;
      }
      .translated-ltr {
        margin-top: 0 !important;
      }
      .goog-te-banner-frame.skiptranslate {
        display: none !important;
      }
      body {
        position: relative !important;
      }
    `;
    document.head.appendChild(style);

    // Set custom event for language change detection
    window.addEventListener('languageChanged', ((event: CustomEvent) => {
      const lang = event.detail.language;
      if (lang === 'en') {
        // Reset to original language
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (select) {
          select.value = '';
          select.dispatchEvent(new Event('change'));
        }
      }
    }) as EventListener);

    // Load Google Translate script
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;

    // Initialize Google Translate
    window.googleTranslateElementInit = function() {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,sw,fr,ar,zh-CN,es,de,pt,it,ja,ko,hi,ru',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true,
        },
        'google_translate_element'
      );

      // Wait for the translate element to be fully initialized
      const checkTranslateReady = setInterval(() => {
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (select) {
          clearInterval(checkTranslateReady);
          
          // Restore saved language preference
          const savedLang = localStorage.getItem('preferredLanguage');
          if (savedLang && savedLang !== 'en') {
            setTimeout(() => {
              select.value = savedLang;
              select.dispatchEvent(new Event('change'));
            }, 500);
          }
        }
      }, 100);

      // Clear the interval after 10 seconds if not found
      setTimeout(() => clearInterval(checkTranslateReady), 10000);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      window.removeEventListener('languageChanged', (() => {}) as EventListener);
    };
  }, []);

  return <div id="google_translate_element" style={{ display: 'none', visibility: 'hidden', width: 0, height: 0 }}></div>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="excellence-academy-theme">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <GoogleTranslateLoader />
          <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/academics" element={<Academics />} />
              <Route path="/student-life" element={<StudentLife />} />
              <Route path="/parents" element={<Parents />} />
              <Route path="/news" element={<News />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/uniforms" element={<UniformGuide />} />
              <Route path="/parents/notices" element={<ParentNotices />} />
              <Route path="/parents/downloads" element={<ParentDownloads />} />
              <Route path="/parents/support" element={<ParentSupport />} />
              <Route path="/fees" element={<FeeStructure />} />
              <Route path="/pta" element={<PTA />} />
              <Route path="/book-visit" element={<BookVisit />} />
              <Route path="/virtual-tour" element={<VirtualTour />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/news/:id" element={<NewsArticle />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/settings" element={<Settings />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
