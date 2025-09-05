import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  CheckCircle,
  Home,
  ChevronRight,
  Phone,
  Mail,
  MessageCircle,
  Building,
  GraduationCap,
  BookOpen,
  MapIcon
} from 'lucide-react';

const BookVisit = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    preferredDate: '',
    preferredTime: '',
    visitType: '',
    interests: [] as string[],
    additionalInfo: '',
    agreeToTerms: false
  });

  const visitTypes = [
    { value: 'individual', label: 'Individual Family Tour' },
    { value: 'group', label: 'Group Tour' },
    { value: 'open-house', label: 'Open House Event' },
    { value: 'meeting', label: 'Meeting with Principal' }
  ];

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', 
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const interests = [
    'Academic Programs',
    'Extracurricular Activities',
    'Special Needs Support',
    'Language Programs',
    'Sports & Athletics',
    'Arts & Music',
    'Science Labs',
    'Library & Resources'
  ];

  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i !== interest)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Visit Booked Successfully!",
      description: "We'll contact you within 24 hours to confirm your visit details.",
    });
    
    // Reset form
    setFormData({
      parentName: '',
      email: '',
      phone: '',
      childName: '',
      childAge: '',
      preferredDate: '',
      preferredTime: '',
      visitType: '',
      interests: [],
      additionalInfo: '',
      agreeToTerms: false
    });
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
            <Link to="/admissions" className="text-muted-foreground hover:text-primary">
              Admissions
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-primary">Book a Visit</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
              <Calendar className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Book Your School Visit</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Experience our vibrant learning environment firsthand. Schedule a personalized tour and discover why our school is the perfect choice for your child's educational journey.
          </p>
        </div>
      </section>

      {/* Visit Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Visit Type</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer various visit options to suit your schedule and preferences.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Individual Tour</h3>
              <p className="text-sm text-muted-foreground">Personalized one-on-one tour with our admissions team</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mx-auto mb-4">
                <Building className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Group Tour</h3>
              <p className="text-sm text-muted-foreground">Join other families for a comprehensive group tour</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mx-auto mb-4">
                <MapIcon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Open House</h3>
              <p className="text-sm text-muted-foreground">Attend our monthly open house events</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Principal Meeting</h3>
              <p className="text-sm text-muted-foreground">Schedule a meeting with our principal</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Schedule Your Visit</h2>
              <p className="text-muted-foreground">
                Fill out the form below and we'll contact you to confirm your visit details.
              </p>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) => setFormData(prev => ({ ...prev, parentName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childAge">Child's Age</Label>
                    <Input
                      id="childAge"
                      value={formData.childAge}
                      onChange={(e) => setFormData(prev => ({ ...prev, childAge: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="childName">Child's Name</Label>
                  <Input
                    id="childName"
                    value={formData.childName}
                    onChange={(e) => setFormData(prev => ({ ...prev, childName: e.target.value }))}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate">Preferred Date *</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredTime">Preferred Time *</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTime: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visitType">Visit Type *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, visitType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select visit type" />
                    </SelectTrigger>
                    <SelectContent>
                      {visitTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Areas of Interest (select all that apply)</Label>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {interests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <Checkbox
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                        />
                        <Label htmlFor={interest} className="text-sm">{interest}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any specific questions or requirements for your visit?"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      terms and conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      privacy policy
                    </Link>
                  </Label>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Your Visit
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Questions About Your Visit?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our admissions team is here to help. Contact us for any questions about scheduling your visit.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-4">Speak directly with our admissions team</p>
              <Button variant="outline" size="sm" asChild>
                <a href="tel:+1234567890">Call Now</a>
              </Button>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mx-auto mb-4">
                <Mail className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-4">Send us your questions anytime</p>
              <Button variant="outline" size="sm" asChild>
                <a href="mailto:admissions@school.edu">Send Email</a>
              </Button>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-4">Chat with us during business hours</p>
              <Button variant="outline" size="sm">
                Start Chat
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookVisit;