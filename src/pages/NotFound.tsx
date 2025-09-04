import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-20 flex items-center justify-center min-h-[60vh]">
        <div className="container mx-auto px-4 text-center">
          <Card className="p-12 max-w-2xl mx-auto">
            <div className="mb-8">
              <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
              <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Sorry, the page you're looking for doesn't exist or has been moved.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Requested path: <code className="bg-muted px-2 py-1 rounded">{location.pathname}</code>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Go to Homepage
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link to="/contact">
                  <Search className="mr-2 h-5 w-5" />
                  Get Help
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 p-4 bg-surface rounded-lg">
              <h3 className="font-semibold mb-2">Popular Pages:</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link to="/about" className="text-sm text-primary hover:underline">About Us</Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/admissions" className="text-sm text-primary hover:underline">Admissions</Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/academics" className="text-sm text-primary hover:underline">Academics</Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/contact" className="text-sm text-primary hover:underline">Contact</Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NotFound;
