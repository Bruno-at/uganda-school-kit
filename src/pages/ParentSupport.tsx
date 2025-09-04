import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Phone,
  Mail,
  Clock,
  MessageSquare,
  CheckCircle,
  Users,
  GraduationCap,
  CreditCard,
  Heart,
  Home,
  ChevronRight,
  ArrowRight,
  Send,
  MapPin,
  Calendar
} from 'lucide-react';

// Import teacher images
import teacherFemale1 from '@/assets/teacher-female-1.jpg';
import teacherMale1 from '@/assets/teacher-male-1.jpg';
import teacherFemale2 from '@/assets/teacher-female-2.jpg';
import teacherMale2 from '@/assets/teacher-male-2.jpg';

const ParentSupport = () => {
  const supportContacts = [
    {
      department: "Admissions Office",
      contact: "Ms. Patricia Namusoke",
      phone: "+256 700 123 457",
      email: "admissions@excellenceacademy.ug",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
      services: ["New admissions", "Transfer students", "School tours", "Application support"],
      image: teacherFemale1,
      icon: <GraduationCap className="h-6 w-6" />
    },
    {
      department: "Finance Office", 
      contact: "Mr. Robert Kiiza",
      phone: "+256 700 123 459",
      email: "finance@excellenceacademy.ug",
      hours: "Mon-Fri: 8:00 AM - 4:00 PM",
      services: ["Fee payments", "Payment plans", "Financial assistance", "Scholarship information"],
      image: teacherMale1,
      icon: <CreditCard className="h-6 w-6" />
    },
    {
      department: "Academic Office",
      contact: "Mrs. Sarah Nalubega",
      phone: "+256 700 123 460", 
      email: "academic@excellenceacademy.ug",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
      services: ["Academic progress", "Subject selection", "Curriculum queries", "Assessment support"],
      image: teacherFemale2,
      icon: <Users className="h-6 w-6" />
    },
    {
      department: "Student Welfare",
      contact: "Mr. David Ochaya",
      phone: "+256 700 123 461",
      email: "welfare@excellenceacademy.ug", 
      hours: "Mon-Fri: 7:30 AM - 5:30 PM",
      services: ["Student counseling", "Disciplinary issues", "Health matters", "Pastoral care"],
      image: teacherMale2,
      icon: <Heart className="h-6 w-6" />
    }
  ];

  const quickLinks = [
    {
      title: "Schedule a Meeting",
      description: "Book an appointment with any department",
      icon: <Calendar className="h-6 w-6" />,
      action: "Book Now"
    },
    {
      title: "Emergency Contact",
      description: "24/7 emergency support line",
      icon: <Phone className="h-6 w-6" />,
      action: "Call Now"
    },
    {
      title: "General Inquiry",
      description: "Submit a general question or concern",
      icon: <MessageSquare className="h-6 w-6" />,
      action: "Send Message"
    },
    {
      title: "Visit Campus",
      description: "Plan a visit to our school campus",
      icon: <MapPin className="h-6 w-6" />,
      action: "Schedule Visit"
    }
  ];

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    department: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <section className="py-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to="/parents" className="text-muted-foreground hover:text-primary">
              For Parents
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-primary">Parent Support</span>
          </nav>
        </div>
      </section>

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
              <MessageSquare className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Parent Support</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Contact the right department for assistance with your specific needs. We're here to help.
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                    {link.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/contact">{link.action}</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Support Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet our dedicated team members who are here to assist you with any questions or concerns.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {supportContacts.map((contact, index) => (
              <Card key={index} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={contact.image} 
                    alt={contact.contact}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {contact.icon}
                      <h3 className="text-xl font-bold">{contact.department}</h3>
                    </div>
                    <p className="text-primary font-medium mb-2">{contact.contact}</p>
                  </div>
                </div>
                
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
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
              <p className="text-muted-foreground">
                Have a specific question or concern? Fill out the form below and we'll get back to you promptly.
              </p>
            </div>
            
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Department</label>
                    <select 
                      className="w-full p-2 border border-border rounded-md bg-background"
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="admissions">Admissions Office</option>
                      <option value="finance">Finance Office</option>
                      <option value="academic">Academic Office</option>
                      <option value="welfare">Student Welfare</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief subject line"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Please describe your question or concern in detail..."
                    rows={5}
                    required
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-br from-red-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Emergency Contact</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            For urgent matters outside business hours, please use our emergency contact line.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <Phone className="mr-2 h-5 w-5" />
              +256 700 123 999
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link to="/parents">
                <ArrowRight className="mr-2 h-5 w-5" />
                Back to Parent Portal
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ParentSupport;