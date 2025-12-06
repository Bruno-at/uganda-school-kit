import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  GraduationCap, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Youtube,
  Music,
  Send,
  Linkedin,
  Instagram,
  MessageCircle
} from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Excellence Academy</h3>
                <p className="text-sm text-primary-foreground/80">{t('footer.location') || 'Kampala, Uganda'}</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80">
              {t('footer.schoolDesc')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+256 700 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@excellenceacademy.ug</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Kyanja, Kampala, Uganda</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.quickLinks')}</h4>
            <nav className="space-y-2">
              {[
                { href: '/about', label: t('footer.aboutUs') },
                { href: '/admissions', label: t('nav.admissions') },
                { href: '/academics', label: t('nav.academics') },
                { href: '/student-life', label: t('nav.studentLife') },
                { href: '/news', label: t('nav.news') },
                { href: '/contact', label: t('nav.contact') },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* For Parents */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.forParents')}</h4>
            <nav className="space-y-2">
              {[
                { href: '/parents/notices', label: t('footer.noticesCirculars') },
                { href: '/parents/downloads', label: t('parents.downloads') },
                { href: '/parents/support', label: t('footer.parentSupport') },
                { href: '/portal', label: t('footer.parentPortal') },
                { href: '/fees', label: t('footer.feeStructure') },
                { href: '/uniforms', label: t('footer.uniformGuide') },
                { href: '/pta', label: t('nav.pta') },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.stayConnected')}</h4>
            <p className="text-sm text-primary-foreground/80">
              {t('footer.subscribeDesc')}
            </p>
            
            {/* Newsletter Form */}
            <form className="space-y-2">
              <Input
                type="email"
                placeholder={t('footer.yourEmail')}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button 
                type="submit" 
                variant="secondary" 
                size="sm" 
                className="w-full"
              >
                <Send className="h-4 w-4 mr-2" />
                {t('cta.subscribe')}
              </Button>
            </form>

            {/* Social Media */}
            <div className="space-y-2">
              <p className="text-sm font-medium">{t('footer.followUs')}</p>
              <div className="flex space-x-2">
                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-primary-foreground/10" asChild>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-primary-foreground/10" asChild>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-primary-foreground/10" asChild>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <Youtube className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-primary-foreground/10" asChild>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <Music className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-primary-foreground/10" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-primary-foreground/10" asChild>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8 hover:bg-primary-foreground/10" asChild>
                  <a href="https://t.me" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-foreground/80">
            {t('footer.copyright')}
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/terms" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
              {t('footer.termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
