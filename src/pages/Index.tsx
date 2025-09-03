import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/ui/StatsCard';
import NewsCard from '@/components/ui/NewsCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Users,
  GraduationCap,
  Award,
  BookOpen,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Download,
  ExternalLink
} from 'lucide-react';

// Import images
import heroImage from '@/assets/hero-students.jpg';
import classroomImage from '@/assets/classroom-scene.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-95"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-fade-in-up">
              Nurturing Character, Excellence, and Innovation
            </h1>
            <p className="text-xl lg:text-2xl leading-relaxed text-primary-foreground/90 animate-fade-in-up [--animation-delay:200ms] animate-stagger">
              Excellence Academy is committed to providing world-class education that develops academic excellence, 
              strong character, and innovative thinking in every student.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up [--animation-delay:400ms] animate-stagger">
              <Button variant="secondary" size="xl" asChild>
                <Link to="/admissions">
                  Apply Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/portal">
                  Parent Portal
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/contact">
                  Contact Us
                  <Phone className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Years of Excellence"
              value="25+"
              description="Serving Kampala families since 1999"
              icon={<Award className="h-6 w-6" />}
            />
            <StatsCard
              title="Happy Students"
              value="1,200+"
              description="Currently enrolled across all levels"
              icon={<Users className="h-6 w-6" />}
            />
            <StatsCard
              title="Qualified Teachers"
              value="80+"
              description="Dedicated and experienced educators"
              icon={<GraduationCap className="h-6 w-6" />}
            />
            <StatsCard
              title="National Awards"
              value="15+"
              description="Recognition for academic excellence"
              icon={<BookOpen className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* News & Events Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Latest News & Events</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest happenings, achievements, and upcoming events at Excellence Academy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <NewsCard
              title="Science Fair 2024 Winners Announced"
              excerpt="Our students excelled in the annual inter-school science fair, winning top prizes in multiple categories including innovation and environmental science."
              date="December 15, 2024"
              image={classroomImage}
              href="/news/science-fair-2024"
              category="Achievement"
            />
            <NewsCard
              title="New ICT Lab Opens for A-Level Students"
              excerpt="State-of-the-art computer laboratory equipped with latest technology to enhance digital literacy and programming skills."
              date="December 10, 2024"
              href="/news/new-ict-lab"
              category="Facilities"
            />
            <NewsCard
              title="Parent-Teacher Conference - January 2025"
              excerpt="Join us for our quarterly parent-teacher conference to discuss student progress and upcoming term plans."
              date="January 8, 2025"
              href="/events/parent-teacher-conference"
              category="Event"
            />
          </div>
          
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/news">
                View All News & Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from our students, parents, and alumni about their experience at Excellence Academy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Excellence Academy has transformed my daughter's approach to learning. The teachers are incredibly supportive and the environment encourages both academic and personal growth."
              author="Sarah Nakato"
              role="Parent of S.4 Student"
            />
            <TestimonialCard
              quote="The science programs here are exceptional. I gained the skills and confidence that helped me secure admission to Makerere University for my engineering degree."
              author="James Okello"
              role="Alumni, Class of 2023"
            />
            <TestimonialCard
              quote="I love the house system and how it brings students together. The leadership opportunities have helped me develop confidence and teamwork skills."
              author="Grace Atuhaire"
              role="Head Girl, S.6 Student"
            />
          </div>
        </div>
      </section>

      {/* Partners & Accreditations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Accreditations & Partners</h2>
            <p className="text-xl text-muted-foreground">
              Recognized by leading educational bodies and partnering with institutions of excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center opacity-60">
            {/* Placeholder for partner logos */}
            <div className="h-16 bg-muted rounded-xl flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">UNEB</span>
            </div>
            <div className="h-16 bg-muted rounded-xl flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">Ministry of Education</span>
            </div>
            <div className="h-16 bg-muted rounded-xl flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">Cambridge Int'l</span>
            </div>
            <div className="h-16 bg-muted rounded-xl flex items-center justify-center">
              <span className="text-sm font-medium text-muted-foreground">USAID</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
