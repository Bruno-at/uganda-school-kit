import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
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
  CheckCircle,
  Calendar as CalendarIcon,
  UserPlus
} from 'lucide-react';

const registrationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
  fullName: z.string().min(2, { message: "Full name is required" }).max(100),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }).max(15).optional().or(z.literal('')),
  dateOfBirth: z.date({ required_error: "Date of birth is required" }),
  address: z.string().max(500).optional().or(z.literal('')),
  emergencyContact: z.string().max(100).optional().or(z.literal('')),
  emergencyPhone: z.string().min(10).max(15).optional().or(z.literal('')),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Portal = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phone: '',
      address: '',
      emergencyContact: '',
      emergencyPhone: '',
    },
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const onSubmitRegistration = async (values: z.infer<typeof registrationSchema>) => {
    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `${window.location.origin}/portal`,
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: data.user.id,
            full_name: values.fullName,
            phone: values.phone || null,
            date_of_birth: format(values.dateOfBirth, 'yyyy-MM-dd'),
            address: values.address || null,
            emergency_contact: values.emergencyContact || null,
            emergency_phone: values.emergencyPhone || null,
          });

        if (profileError) throw profileError;

        // Create user role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: data.user.id,
            role: selectedRole as 'student' | 'parent' | 'teacher' | 'admin',
          });

        if (roleError) throw roleError;

        toast({
          title: "Registration successful!",
          description: "Please check your email to verify your account.",
        });

        form.reset();
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    }
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
                <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto mb-8">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
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

                <TabsContent value="register">
                  <Card className="p-8 max-w-2xl mx-auto">
                    <div className="text-center mb-6">
                      <div className="flex justify-center mb-4">
                        <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedPortal.color} text-white`}>
                          <UserPlus className="h-8 w-8" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Register for {selectedPortal.title}</h3>
                      <p className="text-muted-foreground">Create your account to access the portal</p>
                    </div>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmitRegistration)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="Enter your email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="At least 6 characters" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Confirm password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem className="flex flex-col">
                                <FormLabel>Date of Birth</FormLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <FormControl>
                                      <Button
                                        variant="outline"
                                        className={cn(
                                          "w-full pl-3 text-left font-normal",
                                          !field.value && "text-muted-foreground"
                                        )}
                                      >
                                        {field.value ? (
                                          format(field.value, "PPP")
                                        ) : (
                                          <span>Pick a date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                      </Button>
                                    </FormControl>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0" align="start">
                                    <CalendarComponent
                                      mode="single"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      disabled={(date) =>
                                        date > new Date() || date < new Date("1900-01-01")
                                      }
                                      initialFocus
                                      className={cn("p-3 pointer-events-auto")}
                                    />
                                  </PopoverContent>
                                </Popover>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address (Optional)</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Enter your address" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="emergencyContact"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Emergency Contact (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Contact name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="emergencyPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Emergency Phone (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Emergency phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <Button type="submit" className="w-full" size="lg">
                          <UserPlus className="mr-2 h-5 w-5" />
                          Register for {selectedPortal.title}
                        </Button>
                      </form>
                    </Form>

                    <div className="mt-6 text-center">
                      <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Button 
                          variant="link" 
                          className="p-0 h-auto"
                          onClick={() => {
                            const loginTab = document.querySelector('[value="login"]') as HTMLElement;
                            loginTab?.click();
                          }}
                        >
                          Login here
                        </Button>
                      </p>
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
                        <p className="text-muted-foreground">Use your registered email to login</p>
                      </div>
                      
                      <div className="space-y-6">
                        <p className="text-center text-sm text-muted-foreground">
                          Please use the Auth page to login with your registered credentials.
                        </p>
                        
                        <Button asChild className="w-full" size="lg">
                          <Link to="/auth">
                            <Lock className="mr-2 h-5 w-5" />
                            Go to Login Page
                          </Link>
                        </Button>
                      </div>
                      
                      <div className="mt-6 text-center">
                        <p className="text-sm text-muted-foreground">
                          Don't have an account?{' '}
                          <Button 
                            variant="link" 
                            className="p-0 h-auto"
                            onClick={() => {
                              const registerTab = document.querySelector('[value="register"]') as HTMLElement;
                              registerTab?.click();
                            }}
                          >
                            Register here
                          </Button>
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