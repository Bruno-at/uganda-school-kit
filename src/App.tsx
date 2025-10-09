import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppLayout } from "@/components/layout/AppLayout";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="excellence-academy-theme">
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
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
