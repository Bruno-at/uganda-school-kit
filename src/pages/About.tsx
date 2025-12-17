import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Target, Eye, Heart, Users, BookOpen, Award, ArrowRight, Mail, Phone } from 'lucide-react';

// Import images
import principalImage from '@/assets/principal-headshot.jpg';
import classroomImage from '@/assets/classroom-scene.jpg';
const About = () => {
  const values = [{
    icon: <Heart className="h-8 w-8" />,
    title: "Character Development",
    description: "We prioritize moral values, integrity, and ethical behavior as the foundation of education."
  }, {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Academic Excellence",
    description: "Committed to high standards of learning and achievement across all subjects and levels."
  }, {
    icon: <Users className="h-8 w-8" />,
    title: "Community Focus",
    description: "Building strong relationships between students, families, and the broader community."
  }, {
    icon: <Award className="h-8 w-8" />,
    title: "Innovation",
    description: "Encouraging creative thinking, problem-solving, and adaptation to the modern world."
  }];
  const facultyMembers = [{
    name: "Dr. Margaret Ssemakula",
    role: "Head Teacher",
    qualifications: "PhD Education Leadership, M.Ed Curriculum Studies",
    image: principalImage,
    description: "Leading Excellence Academy with 20+ years in educational leadership and curriculum development."
  }, {
    name: "Mr. John Kiprotich",
    role: "Deputy Head - Academics",
    qualifications: "M.Sc Mathematics, B.Ed Secondary",
    description: "Overseeing curriculum delivery and academic programs across O-Level and A-Level."
  }, {
    name: "Ms. Grace Namubiru",
    role: "Head of Sciences",
    qualifications: "M.Sc Chemistry, B.Ed Science",
    description: "Leading our award-winning science department and laboratory programs."
  }, {
    name: "Mr. David Ochaya",
    role: "Director of Student Affairs",
    qualifications: "M.A Counseling Psychology, B.A Social Work",
    description: "Supporting student welfare, counseling services, and co-curricular activities."
  }];
  return <div className="min-h-screen bg-background">
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">About Excellence Academy</h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Building tomorrow's leaders through quality education, character development, and community engagement in the heart of Kampala.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            {/* Mission */}
            <Card className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                  <Target className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To provide holistic education that nurtures character, academic excellence, and innovation, 
                preparing students to become responsible global citizens and future leaders.
              </p>
            </Card>

            {/* Vision */}
            <Card className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
                  <Eye className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be Uganda's leading educational institution, recognized for academic excellence, 
                character development, and producing graduates who make positive impacts in society.
              </p>
            </Card>

            {/* Core Values */}
            <Card className="p-8 text-center lg:col-span-1">
              <div className="flex justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-success to-success/80 text-success-foreground">
                  <Heart className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Core Values</h3>
              <ul className="text-muted-foreground space-y-2">
                <li>• Integrity & Honesty</li>
                <li>• Excellence & Achievement</li>
                <li>• Respect & Diversity</li>
                <li>• Innovation & Creativity</li>
                <li>• Community & Service</li>
              </ul>
            </Card>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => <Card key={index} className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                    {value.icon}
                  </div>
                </div>
                <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Leadership Message */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img src={principalImage} alt="Dr. Margaret Ssemakula, Head Teacher" className="w-full max-w-md mx-auto rounded-2xl shadow-[var(--shadow-large)]" />
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold mb-4">Message from the Head Teacher</h2>
                <p className="text-lg text-muted-foreground">Dr. Margaret Ssemakula</p>
              </div>
              
              <blockquote className="text-lg leading-relaxed text-foreground">
                "Welcome to Excellence Academy, where we believe every child has the potential for greatness. 
                For over 25 years, we have been committed to providing an education that not only excels 
                academically but also develops character, critical thinking, and a love for learning."
              </blockquote>
              
              <blockquote className="text-lg leading-relaxed text-foreground">
                "Our dedicated team of educators works tirelessly to create an environment where students 
                can discover their passions, develop their talents, and prepare for a successful future. 
                We are proud of our achievements and excited about the journey ahead."
              </blockquote>
              
              <div className="flex items-center space-x-4 pt-4">
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                <p className="text-muted-foreground">Head Teacher</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Leadership Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated educators and administrators who guide our students toward excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facultyMembers.map((member, index) => <Card key={index} className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
                {member.image ? <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" /> : <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-primary-foreground font-bold text-xl">
                    {member.name.charAt(0)}
                  </div>}
                <h4 className="text-lg font-semibold mb-1">{member.name}</h4>
                <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground mb-3">{member.qualifications}</p>
                <p className="text-sm text-foreground">{member.description}</p>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Campus Tour CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Experience Our Campus</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit Excellence Academy and see our state-of-the-art facilities, meet our faculty, 
            and discover why we're the right choice for your child's education.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/contact">
                Schedule a Visit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/admissions" className="bg-gray-800">
                Download Prospectus
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default About;