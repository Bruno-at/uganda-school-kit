import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, Mail, GraduationCap, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSelector from '@/components/ui/LanguageSelector';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/admissions', label: 'Admissions' },
    { href: '/academics', label: 'Academics' },
    { href: '/student-life', label: 'Student Life' },
    { href: '/parents', label: 'Parents' },
    { href: '/news', label: 'News & Events' },
    { href: '/shop', label: 'Shop' },
    { href: '/donate', label: 'Donate' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-2 px-4">
        <div className="container mx-auto text-center">
          <p className="text-sm font-medium">
            🎓 Admissions Open for 2024 Academic Year - Term 1 Starts Soon!{' '}
            <Link to="/admissions" className="underline hover:no-underline font-semibold">
              Apply Now
            </Link>
          </p>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300',
          isScrolled && 'shadow-[var(--shadow-medium)]'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="Excellence Academy Logo" className="h-12 w-12 object-contain" />
              <div>
                <h1 className="text-xl font-bold text-primary">Excellence Academy</h1>
                <p className="text-xs text-muted-foreground">Kampala, Uganda</p>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    location.pathname === item.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA buttons */}
            <div className="hidden lg:flex items-center space-x-2">
              <LanguageSelector />
              <Button variant="outline" size="sm" asChild>
                <Link to="/portal">Portal</Link>
              </Button>
              <Button variant="admission" size="sm" asChild>
                <Link to="/admissions">Apply Now</Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/settings" aria-label="Settings">
                  <Settings className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    'block px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    location.pathname === item.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-foreground'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <div className="flex justify-center mb-2">
                  <LanguageSelector />
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/portal">Portal Login</Link>
                </Button>
                <Button variant="admission" className="w-full" asChild>
                  <Link to="/admissions">Apply Now</Link>
                </Button>
                <Button variant="ghost" className="w-full" asChild>
                  <Link to="/settings">
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;