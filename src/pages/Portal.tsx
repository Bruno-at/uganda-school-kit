import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  User,
  GraduationCap,
  Users,
  Settings,
  BookOpen,
  Calendar,
  FileText,
  BarChart3,
  Bell,
  Lock,
  ArrowRight,
  ExternalLink,
  Shield,
  CheckCircle
} from 'lucide-react';

const Portal = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const portalTypes = [
    {
      role: 'student',
      title: 'Student Portal',
      description: 'Access grades, assignments, timetables, and school resources',
      icon: <GraduationCap className="h-8 w-8" />,
      color: 'from-primary to-primary-light',
      features: [
        'View academic progress and grades',
        'Download study materials and assignments',
        'Check class timetables and schedules',
        'Access digital library resources',
        'Submit assignments online',
        'View examination results'
      ]
    },
    {
      role: 'parent',
      title: 'Parent Portal',
      description: 'Monitor your child\'s progress and stay connected with school',
      icon: <Users className="h-8 w-8" />,
      color: 'from-secondary to-secondary-dark',
      features: [
        'Track child\'s academic performance',
        'View attendance records',
        'Receive important notifications',
        'Access fee statements and payment history',
        'Schedule parent-teacher meetings',
        'Download school reports and certificates'
      ]
    },
    {
      role: 'teacher',
      title: 'Teacher Portal',
      description: 'Manage classes, grades, and communicate with students',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'from-success to-success/80',
      features: [
        'Manage class attendance and grades',
        'Upload and share course materials',
        'Create and grade assignments',
        'Generate progress reports',
        'Communicate with parents and students',
        'Access teaching resources and curriculum'
      ]
    },
    {
      role: 'admin',
      title: 'Admin Portal',
      description: 'Comprehensive school management and administration tools',
      icon: <Settings className="h-8 w-8" />,
      color: 'from-orange-500 to-orange-600',
      features: [
        'Manage student and staff records',
        'Generate comprehensive reports',
        'Handle admissions and enrollment',
        'Manage financial records and fees',
        'System configuration and settings',
        'Monitor overall school performance'
      ]
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { ...loginData, role: selectedRole });
    alert(`Login functionality would be implemented for ${selectedRole} portal`);
  };

  const selectedPortal = portalTypes.find(portal => portal.role === selectedRole);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">School Portal</h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Secure access to academic records, school resources, and communication tools for students, parents, teachers, and administrators.
          </p>
        </div>
      </section>

      {/* Portal Selection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Portal</h2>
            <p className="text-xl text-muted-foreground">
              Select the appropriate portal for your role at Excellence Academy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {portalTypes.map((portal) => (
              <Card 
                key={portal.role}
                className={`p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-large)] hover:-translate-y-1 ${
                  selectedRole === portal.role ? 'ring-2 ring-primary shadow-[var(--shadow-large)]' : ''
                }`}
                onClick={() => setSelectedRole(portal.role)}
              >
                <div className="flex justify-center mb-4">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${portal.color} text-white`}>
                    {portal.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{portal.title}</h3>
                <p className="text-sm text-muted-foreground">{portal.description}</p>
                {selectedRole === portal.role && (
                  <div className="mt-3 flex justify-center">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Portal Details and Login */}
          {selectedPortal && (
            <div className="max-w-6xl mx-auto">
              <Tabs defaultValue="features" className="w-full">
                <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                
                <TabsContent value="features">
                  <Card className="p-8">
                    <div className="text-center mb-8">
                      <div className="flex justify-center mb-4">
                        <div className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedPortal.color} text-white`}>
                          {selectedPortal.icon}
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold mb-2">{selectedPortal.title}</h3>
                      <p className="text-muted-foreground text-lg">{selectedPortal.description}</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedPortal.features.map((feature, index) => (
                        <div key={index} className="flex items-center p-4 bg-surface rounded-lg">
                          <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="login">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Login Form */}
                    <Card className="p-8">
                      <div className="text-center mb-6">
                        <div className="flex justify-center mb-4">
                          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedPortal.color} text-white`}>
                            {selectedPortal.icon}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Login to {selectedPortal.title}</h3>
                        <p className="text-muted-foreground">Enter your credentials to access your portal</p>
                      </div>
                      
                      <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username / Student ID</Label>
                          <Input
                            id="username"
                            value={loginData.username}
                            onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                            placeholder="Enter your username or student ID"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                            placeholder="Enter your password"
                            required
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-2 text-sm">
                            <input
                              type="checkbox"
                              checked={loginData.rememberMe}
                              onChange={(e) => setLoginData({...loginData, rememberMe: e.target.checked})}
                              className="rounded border-gray-300"
                            />
                            <span>Remember me</span>
                          </label>
                          <Button variant="link" size="sm" className="p-0 h-auto">
                            Forgot password?
                          </Button>
                        </div>
                        
                        <Button type="submit" className="w-full" size="lg">
                          <Lock className="mr-2 h-5 w-5" />
                          Login Securely
                        </Button>
                      </form>
                      
                      <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                          Need help accessing your account?{' '}
                          <Link to="/contact" className="text-primary hover:underline">
                            Contact IT Support
                          </Link>
                        </p>
                      </div>
                    </Card>
                    
                    {/* Security Information */}
                    <div className="space-y-6">
                      <Card className="p-6">
                        <div className="flex items-center mb-4">
                          <Shield className="h-6 w-6 text-primary mr-3" />
                          <h4 className="text-lg font-semibold">Secure Access</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Your portal access is protected with enterprise-grade security. All data transmission is encrypted and your privacy is our priority.
                        </p>
                        <ul className="text-sm space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            256-bit SSL encryption
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Regular security updates
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            Data backup and recovery
                          </li>
                        </ul>
                      </Card>
                      
                      <Card className="p-6">
                        <div className="flex items-center mb-4">
                          <Bell className="h-6 w-6 text-secondary mr-3" />
                          <h4 className="text-lg font-semibold">First Time Users</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          If this is your first time accessing the portal, your initial login credentials are:
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="p-3 bg-surface rounded-lg">
                            <strong>Students:</strong> Student ID + Date of Birth (DDMMYYYY)
                          </div>
                          <div className="p-3 bg-surface rounded-lg">
                            <strong>Parents:</strong> Child's Student ID + Phone Number (last 4 digits)
                          </div>
                          <div className="p-3 bg-surface rounded-lg">
                            <strong>Staff:</strong> Employee ID + NIN (last 4 digits)
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-3">
                          You will be prompted to change your password on first login.
                        </p>
                      </Card>
                      
                      <Card className="p-6">
                        <h4 className="text-lg font-semibold mb-3">Need Technical Support?</h4>
                        <div className="space-y-3">
                          <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                            <Link to="/contact">
                              <User className="h-4 w-4 mr-2" />
                              Contact IT Help Desk
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <FileText className="h-4 w-4 mr-2" />
                            Download User Guide
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Watch Tutorial Videos
                          </Button>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Call to Action for Non-Users */}
          {!selectedRole && (
            <div className="text-center mt-12">
              <Card className="p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">New to Excellence Academy?</h3>
                <p className="text-muted-foreground mb-6">
                  If you're not yet part of our school community, learn more about our programs and admission process.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="default" size="lg" asChild>
                    <Link to="/admissions">
                      Apply for Admission
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/about">
                      Learn More About Us
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portal;