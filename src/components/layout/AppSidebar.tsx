import { 
  Home, 
  Info, 
  GraduationCap, 
  BookOpen, 
  Users, 
  FileText, 
  Phone, 
  Calendar,
  LogIn,
  UserPlus,
  Sun,
  Moon
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTheme } from 'next-themes';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const mainNavItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'About', url: '/about', icon: Info },
  { title: 'Admissions', url: '/admissions', icon: UserPlus },
  { title: 'Academics', url: '/academics', icon: BookOpen },
  { title: 'Student Life', url: '/student-life', icon: Users },
  { title: 'Parents', url: '/parents', icon: FileText },
  { title: 'News & Events', url: '/news', icon: Calendar },
  { title: 'Contact', url: '/contact', icon: Phone },
];

const portalItems = [
  { title: 'Portal', url: '/portal', icon: GraduationCap },
  { title: 'Login', url: '/auth', icon: LogIn },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const { theme, setTheme } = useTheme();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
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
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url}
                      end
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

        {/* Portal Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {portalItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink 
                      to={item.url}
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
      </SidebarContent>

      {/* Theme Toggle Footer */}
      <SidebarFooter className="border-t border-sidebar-border">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            {open ? (
              <>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-sidebar-foreground" />
                  <Label htmlFor="theme-toggle" className="text-sm text-sidebar-foreground">
                    Dark Mode
                  </Label>
                </div>
                <Switch
                  id="theme-toggle"
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </>
            ) : (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-sidebar-accent"
              >
                {theme === 'dark' ? (
                  <Moon className="h-4 w-4 text-sidebar-foreground" />
                ) : (
                  <Sun className="h-4 w-4 text-sidebar-foreground" />
                )}
              </button>
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
