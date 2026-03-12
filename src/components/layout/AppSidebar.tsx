import { 
  Home, 
  Info, 
  GraduationCap, 
  BookOpen, 
  Users, 
  FileText, 
  Phone, 
  Calendar,
  Settings,
  LogIn,
  LogOut,
  User,
  Shield,
  Camera,
  Award
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import LanguageSelector from '@/components/ui/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/components/auth/AuthProvider';
import AuthModal from '@/components/auth/AuthModal';
import AutoTranslate from '@/components/AutoTranslate';

export function AppSidebar() {
  const { open, isMobile, setOpenMobile } = useSidebar();
  const { t } = useLanguage();
  const { user, role, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const mainNavItems = [
    { title: t('nav.home'), url: '/', icon: Home },
    { title: t('nav.about'), url: '/about', icon: Info },
    { title: t('nav.admissions'), url: '/admissions', icon: GraduationCap },
    { title: t('nav.academics'), url: '/academics', icon: BookOpen },
    { title: t('nav.studentLife'), url: '/student-life', icon: Users },
    { title: t('nav.parents'), url: '/parents', icon: FileText },
    { title: t('nav.news'), url: '/news', icon: Calendar },
    { title: t('nav.contact'), url: '/contact', icon: Phone },
  ];

  const userItems = user ? [
    ...(role === 'admin' ? [{ title: 'Admin Dashboard', url: '/admin', icon: Shield }] : []),
    ...(role === 'student' ? [{ title: 'Student Dashboard', url: '/student-dashboard', icon: User }] : []),
    ...(role === 'parent' ? [{ title: 'Parent Portal', url: '/parent-portal', icon: Users }] : []),
  ] : [];

  const handleNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <AutoTranslate>
          {/* Logo Section */}
          <div className="px-4 py-6 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              {open && (
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-sidebar-foreground">Excellence Academy</span>
                  <span className="text-xs text-sidebar-foreground/60">Kampala, Uganda</span>
                </div>
              )}
            </div>
          </div>

          {/* Main Navigation */}
          <SidebarGroup>
            <SidebarGroupLabel>{t('nav.home') === 'Home' ? 'Main Menu' : t('nav.home')}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink 
                        to={item.url}
                        end
                        onClick={handleNavClick}
                        className={({ isActive }) => 
                          isActive 
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                            : ''
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* User Dashboard Links */}
          {userItems.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel>Your Portal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {userItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <NavLink 
                          to={item.url}
                          onClick={handleNavClick}
                          className={({ isActive }) => 
                            isActive 
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                              : ''
                          }
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )}

          {/* Settings */}
          <SidebarGroup>
            <SidebarGroupLabel>{t('nav.settings')}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={t('nav.settings')}>
                    <NavLink 
                      to="/settings"
                      onClick={handleNavClick}
                      className={({ isActive }) => 
                        isActive 
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' 
                          : ''
                      }
                    >
                      <Settings className="h-4 w-4" />
                      <span>{t('nav.settings')}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </AutoTranslate>

        {/* Auth Section */}
        <SidebarGroup>
          <SidebarGroupLabel data-no-translate>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2 space-y-2">
              {user ? (
                <div className="space-y-2">
                  <p className="text-xs text-sidebar-foreground/70 px-2 truncate">{user.email}</p>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2" onClick={() => { signOut(); handleNavClick(); }}>
                    <LogOut className="h-4 w-4" />
                    {open && 'Sign Out'}
                  </Button>
                </div>
              ) : (
                <Button size="sm" className="w-full justify-start gap-2" onClick={() => setAuthModalOpen(true)}>
                  <LogIn className="h-4 w-4" />
                  {open && 'Sign In'}
                </Button>
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Language Selector - excluded from auto-translate */}
        <SidebarGroup>
          <SidebarGroupLabel data-no-translate>Language</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-2" data-language-selector>
              <LanguageSelector />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </Sidebar>
  );
}
