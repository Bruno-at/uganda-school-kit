import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Download,
  GraduationCap,
  Users,
  BookOpen,
  DollarSign,
  CheckCircle,
  FileText,
  Calendar,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    phone: '',
    email: '',
    currentClass: '',
    applyingFor: '',
    previousSchool: '',
    message: ''
  });

  const requirements = {
    oLevel: [
      "Completed Primary 7 with PLE certificate",
      "Birth certificate or equivalent proof of age",
      "Medical certificate from approved health center",
      "Transfer letter from previous school (if applicable)",
      "Recent passport-size photographs (4 copies)",
      "Registration fee: UGX 50,000"
    ],
    aLevel: [
      "Completed O-Level with UCE certificate",
      "Minimum of 5 passes including English and Mathematics",
      "Subject combinations aligned with desired A-Level track",
      "Medical certificate from approved health center",
      "Character reference from previous school",
      "Registration fee: UGX 75,000"
    ]
  };

  const feeStructure = [
    {
      category: "O-Level (S.1 - S.4)",
      tuition: "UGX 1,800,000",
      boarding: "UGX 2,200,000",
      lunch: "UGX 400,000",
      description: "Per term fees"
    },
    {
      category: "A-Level (S.5 - S.6)",
      tuition: "UGX 2,100,000",
      boarding: "UGX 2,500,000",
      lunch: "UGX 450,000",
      description: "Per term fees"
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
    // Handle form submission here
    console.log('Application submitted:', formData);
    alert('Application submitted successfully! We will contact you within 2 business days.');
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Admissions</h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Join the Excellence Academy family and embark on a journey of academic excellence, character development, and lifelong learning.
          </p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                  <Download className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Download Prospectus</h3>
              <p className="text-sm text-muted-foreground mb-4">Get detailed information about our programs, facilities, and admission process.</p>
              <Button variant="outline" size="sm" className="w-full">
                Download PDF
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Schedule Visit</h3>
              <p className="text-sm text-muted-foreground mb-4">Book a campus tour to experience our facilities and meet our faculty.</p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/contact">Book Visit</Link>
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-success/80 text-success-foreground">
                  <Phone className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Contact Admissions</h3>
              <p className="text-sm text-muted-foreground mb-4">Speak directly with our admissions team for personalized guidance.</p>
              <Button variant="outline" size="sm" className="w-full">
                Call Now
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Entry Requirements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Entry Requirements</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Clear guidelines for admission to O-Level and A-Level programs at Excellence Academy.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground mr-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">O-Level (S.1 - S.4)</h3>
                  <p className="text-muted-foreground">Secondary Education Foundation</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {requirements.oLevel.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{requirement}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground mr-4">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">A-Level (S.5 - S.6)</h3>
                  <p className="text-muted-foreground">Advanced Secondary Education</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {requirements.aLevel.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{requirement}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Fee Structure</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transparent and competitive fees for quality education with various payment options available.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {feeStructure.map((level, index) => (
              <Card key={index} className="p-8">
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground mr-4">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{level.category}</h3>
                    <p className="text-muted-foreground">{level.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="font-medium">Day School Tuition</span>
                    <span className="text-lg font-bold text-primary">{level.tuition}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="font-medium">Boarding (Full)</span>
                    <span className="text-lg font-bold text-primary">{level.boarding}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg">
                    <span className="font-medium">Lunch Program</span>
                    <span className="text-lg font-bold text-primary">{level.lunch}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-4">
                  * Additional fees may apply for uniforms, textbooks, and co-curricular activities
                </p>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Flexible payment plans available. Contact our finance office for more information.
            </p>
            <Button variant="outline" asChild>
              <Link to="/contact">
                Discuss Payment Plans
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Apply Now</h2>
            <p className="text-xl text-muted-foreground">
              Start your child's journey at Excellence Academy. Complete the form below and we'll contact you within 2 business days.
            </p>
          </div>
          
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Full Name *</Label>
                  <Input
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter student's full name"
                    className="shadow-sm"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                  <Input
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter parent/guardian name"
                    className="shadow-sm"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+256 700 123 456"
                    className="shadow-sm"
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
                    placeholder="parent@example.com"
                    className="shadow-sm"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentClass">Current Class/Level</Label>
                  <Select onValueChange={(value) => handleSelectChange('currentClass', value)}>
                    <SelectTrigger className="shadow-sm">
                      <SelectValue placeholder="Select current class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="p7">Primary 7</SelectItem>
                      <SelectItem value="s1">Senior 1</SelectItem>
                      <SelectItem value="s2">Senior 2</SelectItem>
                      <SelectItem value="s3">Senior 3</SelectItem>
                      <SelectItem value="s4">Senior 4</SelectItem>
                      <SelectItem value="s5">Senior 5</SelectItem>
                      <SelectItem value="s6">Senior 6</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="applyingFor">Applying For *</Label>
                  <Select onValueChange={(value) => handleSelectChange('applyingFor', value)}>
                    <SelectTrigger className="shadow-sm">
                      <SelectValue placeholder="Select class applying for" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s1">Senior 1 (O-Level)</SelectItem>
                      <SelectItem value="s2">Senior 2 (O-Level)</SelectItem>
                      <SelectItem value="s3">Senior 3 (O-Level)</SelectItem>
                      <SelectItem value="s4">Senior 4 (O-Level)</SelectItem>
                      <SelectItem value="s5">Senior 5 (A-Level)</SelectItem>
                      <SelectItem value="s6">Senior 6 (A-Level)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="previousSchool">Previous School</Label>
                <Input
                  id="previousSchool"
                  name="previousSchool"
                  value={formData.previousSchool}
                  onChange={handleInputChange}
                  placeholder="Name of current/previous school"
                  className="shadow-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Any additional information you'd like to share..."
                  rows={4}
                  className="shadow-sm"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" variant="admission" size="lg" className="flex-1">
                  Submit Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button type="button" variant="outline" size="lg" asChild>
                  <Link to="/contact">
                    Contact Admissions
                    <Phone className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Admissions;