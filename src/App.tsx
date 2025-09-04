import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Admissions from "./pages/Admissions";
import Contact from "./pages/Contact";
import Academics from "./pages/Academics";
import StudentLife from "./pages/StudentLife";
import Parents from "./pages/Parents";
import News from "./pages/News";
import Portal from "./pages/Portal";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
