import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  Calendar,
  Navigation,
  Globe
} from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Numbers",
      details: [
        "Main Office: +256 700 123 456",
        "Admissions: +256 700 123 457",
        "Emergency: +256 700 123 458"
      ]
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Addresses",
      details: [
        "General: info@excellenceacademy.ug",
        "Admissions: admissions@excellenceacademy.ug",
        "Principal: principal@excellenceacademy.ug"
      ]
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Physical Address",
      details: [
        "Excellence Academy",
        "Plot 123, Kyanja Road",
        "Kampala, Uganda"
      ]
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Office Hours",
      details: [
        "Monday - Friday: 7:30 AM - 5:00 PM",
        "Saturday: 8:00 AM - 1:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Message sent successfully! We will respond within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiryType: ''
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            We're here to help! Get in touch with Excellence Academy for admissions, general inquiries, or to schedule a campus visit.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-sm text-muted-foreground">
                      {detail}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Form and Map */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Send Us a Message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24 hours. For urgent matters, please call our main office.
                </p>
              </div>
              
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+256 700 123 456"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select onValueChange={(value) => handleSelectChange('inquiryType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admissions">Admissions</SelectItem>
                          <SelectItem value="academics">Academics</SelectItem>
                          <SelectItem value="fees">Fees & Payments</SelectItem>
                          <SelectItem value="facilities">Facilities</SelectItem>
                          <SelectItem value="transport">Transport</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Brief subject of your inquiry"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Please provide details about your inquiry..."
                      rows={6}
                    />
                  </div>
                  
                  <Button type="submit" variant="default" size="lg" className="w-full">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Map and Quick Actions */}
            <div className="space-y-8">
              {/* Interactive Map Placeholder */}
              <Card className="p-8">
                <h3 className="text-xl font-semibold mb-4">Find Us on the Map</h3>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium">Excellence Academy</p>
                    <p className="text-muted-foreground">Kyanja, Kampala, Uganda</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="absolute bottom-4 right-4"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Located in the heart of Kyanja, easily accessible by public transport and private vehicles. 
                  Ample parking available on campus.
                </p>
              </Card>

              {/* Quick Actions */}
              <div className="space-y-4">
                <Card className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Schedule a Campus Visit</h4>
                      <p className="text-sm text-muted-foreground">Book a personalized tour of our facilities</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Book Now
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">WhatsApp Quick Chat</h4>
                      <p className="text-sm text-muted-foreground">Get instant answers to your questions</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Chat Now
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-success/80 text-success-foreground">
                      <Globe className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Virtual School Tour</h4>
                      <p className="text-sm text-muted-foreground">Explore our campus from home</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Start Tour
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find quick answers to common questions about Excellence Academy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6">
              <h4 className="font-semibold mb-2">What are the admission requirements?</h4>
              <p className="text-sm text-muted-foreground">
                Requirements vary by level. For O-Level, students need PLE certificate. For A-Level, UCE with at least 5 passes is required. 
                Visit our admissions page for complete details.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-semibold mb-2">Do you offer boarding facilities?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, we offer both day and boarding options. Our boarding facilities are modern, secure, and provide a conducive environment for studying.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-sm text-muted-foreground">
                We accept bank transfers, mobile money (MTN, Airtel), and cash payments. Flexible payment plans are available for families who need them.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-semibold mb-2">What co-curricular activities are available?</h4>
              <p className="text-sm text-muted-foreground">
                We offer sports (football, basketball, netball), clubs (debate, drama, music), and academic competitions. All students are encouraged to participate.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;