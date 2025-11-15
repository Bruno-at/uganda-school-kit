import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/ui/StatsCard';
import NewsCard from '@/components/ui/NewsCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import AccreditationBadge from '@/components/ui/AccreditationBadge';
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
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-75"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
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
              <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/membership">
                  Join PTA/Alumni
                  <Users className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/shop">
                  School Shop
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="xl" className="text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/donate">
                  Support Us
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

      {/* International Accreditations & Partnerships */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">International Accreditations & Partnerships</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Globally recognized and partnering with leading educational institutions worldwide to provide world-class education.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <AccreditationBadge
              name="Cambridge International"
              organization="Cambridge Assessment International Education"
              year="2010"
              description="Authorized Cambridge International School offering IGCSE and A-Level programs recognized worldwide."
              verified
            />
            <AccreditationBadge
              name="IB World School"
              organization="International Baccalaureate"
              year="2015"
              description="Authorized to offer the IB Diploma Programme, recognized by universities globally."
              verified
            />
            <AccreditationBadge
              name="COBIS Membership"
              organization="Council of British International Schools"
              year="2018"
              description="Member of COBIS, ensuring British educational standards and international best practices."
              verified
            />
            <AccreditationBadge
              name="Ministry of Education"
              organization="Republic of Uganda"
              year="1999"
              description="Fully registered and accredited by the Uganda Ministry of Education and Sports."
              verified
            />
            <AccreditationBadge
              name="East African Examination Council"
              organization="EAEC"
              year="2012"
              description="Recognized examination center for East African Community educational assessments."
              verified
            />
            <AccreditationBadge
              name="UNESCO Associated School"
              organization="UNESCO ASPnet"
              year="2020"
              description="Part of UNESCO's global network promoting quality education, peace, and sustainable development."
              verified
            />
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-center mb-6">Global University Partnerships</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
              <div className="text-center p-4">
                <p className="font-semibold text-sm">University of Oxford</p>
                <p className="text-xs text-muted-foreground">Academic Exchange</p>
              </div>
              <div className="text-center p-4">
                <p className="font-semibold text-sm">MIT</p>
                <p className="text-xs text-muted-foreground">STEM Programs</p>
              </div>
              <div className="text-center p-4">
                <p className="font-semibold text-sm">Makerere University</p>
                <p className="text-xs text-muted-foreground">Research Partner</p>
              </div>
              <div className="text-center p-4">
                <p className="font-semibold text-sm">Yale University</p>
                <p className="text-xs text-muted-foreground">Leadership Programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
