import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Download,
  Bell,
  Calendar,
  Users,
  Phone,
  Mail,
  FileText,
  CreditCard,
  BookOpen,
  Clock,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

const Parents = () => {
  const notices = [
    {
      title: "Term 2 Academic Calendar Released",
      date: "December 20, 2024",
      type: "Academic",
      urgent: false,
      excerpt: "Important dates for Term 2 including examination periods, holidays, and school events."
    },
    {
      title: "School Fees Payment Reminder",
      date: "December 18, 2024", 
      type: "Finance",
      urgent: true,
      excerpt: "Reminder for Term 2 school fees payment. Deadline is January 15, 2025."
    },
    {
      title: "Parent-Teacher Conference Schedule",
      date: "December 15, 2024",
      type: "Event",
      urgent: false,
      excerpt: "Schedule for upcoming parent-teacher conferences in January 2025."
    },
    {
      title: "New Uniform Guidelines",
      date: "December 10, 2024",
      type: "General",
      urgent: false,
      excerpt: "Updated uniform requirements and guidelines for all students effective Term 2."
    }
  ];

  const downloads = [
    {
      title: "School Calendar 2024-2025",
      description: "Complete academic calendar with term dates, holidays, and events",
      type: "Calendar",
      size: "2.1 MB",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      title: "Fee Structure & Payment Guide",
      description: "Detailed breakdown of fees and payment methods available",
      type: "Finance",
      size: "1.8 MB", 
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      title: "Uniform Guidelines & Suppliers",
      description: "Official uniform requirements and approved supplier list",
      type: "Uniform",
      size: "950 KB",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Student Handbook 2024-2025",
      description: "Complete guide to school policies, rules, and procedures",
      type: "Handbook",
      size: "4.2 MB",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      title: "Transport Routes & Schedules", 
      description: "School bus routes, timings, and transport fee information",
      type: "Transport",
      size: "1.3 MB",
      icon: <Clock className="h-5 w-5" />
    },
    {
      title: "Medical Forms Package",
      description: "Medical consent forms and health requirement documents",
      type: "Medical",
      size: "760 KB",
      icon: <FileText className="h-5 w-5" />
    }
  ];

  const supportContacts = [
    {
      department: "Admissions Office",
      contact: "Ms. Patricia Namusoke",
      phone: "+256 700 123 457",
      email: "admissions@excellenceacademy.ug",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
      services: ["New admissions", "Transfer students", "School tours"]
    },
    {
      department: "Finance Office", 
      contact: "Mr. Robert Kiiza",
      phone: "+256 700 123 459",
      email: "finance@excellenceacademy.ug",
      hours: "Mon-Fri: 8:00 AM - 4:00 PM",
      services: ["Fee payments", "Payment plans", "Financial assistance"]
    },
    {
      department: "Academic Office",
      contact: "Mrs. Sarah Nalubega",
      phone: "+256 700 123 460", 
      email: "academic@excellenceacademy.ug",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
      services: ["Academic progress", "Subject selection", "Curriculum queries"]
    },
    {
      department: "Student Welfare",
      contact: "Mr. David Ochaya",
      phone: "+256 700 123 461",
      email: "welfare@excellenceacademy.ug", 
      hours: "Mon-Fri: 7:30 AM - 5:30 PM",
      services: ["Student counseling", "Disciplinary issues", "Health matters"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">For Parents</h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Stay connected with your child's education through our comprehensive parent resources and support services.
          </p>
        </div>
      </section>

      {/* Quick Access Portal */}
      <section className="py-12 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                  <ExternalLink className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Parent Portal</h3>
              <p className="text-sm text-muted-foreground mb-4">Access grades, attendance, and school updates</p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/portal">Login</Link>
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
                  <CreditCard className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pay School Fees</h3>
              <p className="text-sm text-muted-foreground mb-4">Secure online payment platform</p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/fees">Pay Now</Link>
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-success/80 text-success-foreground">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">School Calendar</h3>
              <p className="text-sm text-muted-foreground mb-4">View important dates and events</p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/parents/downloads">View Calendar</Link>
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                  <MessageSquare className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Contact School</h3>
              <p className="text-sm text-muted-foreground mb-4">Get in touch with teachers and admin</p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/contact">Contact</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="notices" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-8">
              <TabsTrigger value="notices">Notices</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notices" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Notices & Circulars</h2>
                <p className="text-muted-foreground">
                  Stay informed with the latest school announcements and important updates.
                </p>
              </div>
              
              <div className="space-y-4 max-w-4xl mx-auto">
                {notices.map((notice, index) => (
                  <Card key={index} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{notice.title}</h3>
                          {notice.urgent && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full flex items-center">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Urgent
                            </span>
                          )}
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                            {notice.type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notice.excerpt}</p>
                        <p className="text-xs text-muted-foreground">{notice.date}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Read More
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="downloads" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Downloads</h2>
                <p className="text-muted-foreground">
                  Access important documents, forms, and resources for parents.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {downloads.map((download, index) => (
                  <Card key={index} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                        {download.icon}
                      </div>
                      <span className="text-xs text-muted-foreground">{download.size}</span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2">{download.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{download.description}</p>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="support" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Parent Support</h2>
                <p className="text-muted-foreground">
                  Contact the right department for assistance with your specific needs.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {supportContacts.map((contact, index) => (
                  <Card key={index} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300">
                    <h3 className="text-xl font-bold mb-2">{contact.department}</h3>
                    <p className="text-primary font-medium mb-4">{contact.contact}</p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span className="text-sm">{contact.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span className="text-sm">{contact.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span className="text-sm">{contact.hours}</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-2">Services:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {contact.services.map((service, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="h-3 w-3 mr-2 text-success" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Parent Engagement CTA */}
      <section className="py-16 bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Parent Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of your child's educational journey. Join the Parent-Teacher Association and stay actively involved in school activities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
              <Link to="/pta">
                <Users className="mr-2 h-5 w-5" />
                Join PTA
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
              <Link to="/contact">
                Schedule Meeting
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Parents;