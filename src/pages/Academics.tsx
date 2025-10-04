import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BookOpen,
  Users,
  Award,
  Calendar,
  Download,
  ArrowRight,
  GraduationCap,
  Microscope,
  Calculator,
  Globe,
  Palette,
  Computer
} from 'lucide-react';

const Academics = () => {
  const subjects = {
    oLevel: [
      { name: "Mathematics", icon: <Calculator className="h-6 w-6" />, description: "Pure and Applied Mathematics" },
      { name: "English Language", icon: <BookOpen className="h-6 w-6" />, description: "Communication and Literature" },
      { name: "Sciences", icon: <Microscope className="h-6 w-6" />, description: "Biology, Chemistry, Physics" },
      { name: "Social Studies", icon: <Globe className="h-6 w-6" />, description: "History, Geography, Religious Studies" },
      { name: "Languages", icon: <Users className="h-6 w-6" />, description: "Luganda, French, Latin" },
      { name: "Arts", icon: <Palette className="h-6 w-6" />, description: "Fine Art, Music, Literature" },
      { name: "ICT", icon: <Computer className="h-6 w-6" />, description: "Computer Studies" },
      { name: "Life Skills", icon: <Award className="h-6 w-6" />, description: "Entrepreneurship, Agriculture" }
    ],
    aLevel: [
      { name: "Science Combinations", icon: <Microscope className="h-6 w-6" />, description: "PCM, PCB, BCM" },
      { name: "Arts Combinations", icon: <BookOpen className="h-6 w-6" />, description: "HEL, HEG, HGL" },
      { name: "Mathematics", icon: <Calculator className="h-6 w-6" />, description: "Pure Mathematics, Economics" },
      { name: "Languages", icon: <Globe className="h-6 w-6" />, description: "English, French, Luganda" }
    ]
  };

  const departments = [
    {
      name: "Mathematics Department",
      head: "Mr. John Kiprotich",
      description: "Developing analytical and problem-solving skills through pure and applied mathematics.",
      subjects: ["Pure Mathematics", "Applied Mathematics", "Economics"],
      achievements: "Top performer in national mathematics competitions"
    },
    {
      name: "Science Department", 
      head: "Ms. Grace Namubiru",
      description: "Hands-on learning in modern laboratories with qualified science teachers.",
      subjects: ["Physics", "Chemistry", "Biology"],
      achievements: "Winner of Inter-school Science Fair 2024"
    },
    {
      name: "Languages Department",
      head: "Mrs. Sarah Nalubega",
      description: "Building communication skills and cultural understanding through language studies.",
      subjects: ["English", "French", "Luganda", "Literature"],
      achievements: "Excellence in national debate competitions"
    },
    {
      name: "Arts Department",
      head: "Mr. David Musoke",
      description: "Fostering creativity and cultural appreciation through various art forms.",
      subjects: ["Fine Art", "Music", "Drama", "History"],
      achievements: "Cultural festival award winners"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Academics</h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Comprehensive curriculum designed to develop critical thinking, creativity, and academic excellence from O-Level to A-Level.
          </p>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Curriculum</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Following the Uganda National Curriculum with enhanced programs to prepare students for UNEB examinations and beyond.
            </p>
          </div>

          <Tabs defaultValue="olevel" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="olevel">O-Level (S.1-S.4)</TabsTrigger>
              <TabsTrigger value="alevel">A-Level (S.5-S.6)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="olevel" className="space-y-8">
              <Card className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                    <BookOpen className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">O-Level Program</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our O-Level program provides a strong foundation in core subjects, preparing students for UCE examinations and future academic pursuits.
                </p>
              </Card>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjects.oLevel.map((subject, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                        {subject.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{subject.name}</h4>
                    <p className="text-sm text-muted-foreground">{subject.description}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="alevel" className="space-y-8">
              <Card className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">A-Level Program</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Specialized programs in Science, Arts, and Mathematics combinations, preparing students for UACE examinations and university admission.
                </p>
              </Card>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {subjects.aLevel.map((subject, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
                        {subject.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{subject.name}</h4>
                    <p className="text-sm text-muted-foreground">{subject.description}</p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Academic Departments</h2>
            <p className="text-xl text-muted-foreground">
              Expert faculty leading specialized departments to ensure comprehensive education.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <Card key={index} className="p-8 hover:shadow-[var(--shadow-large)] transition-all duration-300">
                <h3 className="text-xl font-bold mb-2">{dept.name}</h3>
                <p className="text-primary font-medium mb-3">Head: {dept.head}</p>
                <p className="text-muted-foreground mb-4">{dept.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Subjects Offered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {dept.subjects.map((subject, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 bg-success/10 rounded-lg">
                  <p className="text-sm text-success-foreground font-medium">
                    🏆 {dept.achievements}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Learning Resources</h2>
            <p className="text-xl text-muted-foreground">
              Access curriculum materials, timetables, and academic support resources.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Class Timetables</h3>
              <p className="text-sm text-muted-foreground mb-4">Download current term timetables for all classes</p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="/downloads/timetables.pdf" download>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </a>
              </Button>
            </Card>

            <Card className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
                  <BookOpen className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Curriculum Guide</h3>
              <p className="text-sm text-muted-foreground mb-4">Comprehensive guide to our academic programs</p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="/downloads/curriculum.pdf" download>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </a>
              </Button>
            </Card>

            <Card className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-success/80 text-success-foreground">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Assessment Policy</h3>
              <p className="text-sm text-muted-foreground mb-4">Learn about our evaluation and grading system</p>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="/downloads/assessment-policy.pdf" download>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Academic CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Excel?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join Excellence Academy and experience world-class education that prepares you for success in academics and life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/admissions">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">
                Schedule Campus Visit
                <Calendar className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;