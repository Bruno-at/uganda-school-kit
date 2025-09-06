import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Users,
  Calendar,
  MessageCircle,
  Heart,
  HandHeart,
  Home,
  ChevronRight,
  Mail,
  Phone,
  Clock,
  MapPin,
  Star,
  Target,
  BookOpen,
  Coffee
} from 'lucide-react';

const PTA = () => {
  const events = [
    {
      title: "Monthly PTA Meeting",
      date: "January 15, 2025",
      time: "7:00 PM",
      location: "School Auditorium",
      description: "Discuss upcoming fundraising events and school improvements",
      startDate: "20250115T190000",
      endDate: "20250115T200000"
    },
    {
      title: "Parent-Teacher Conference",
      date: "January 22, 2025", 
      time: "3:00 PM - 8:00 PM",
      location: "Various Classrooms",
      description: "Individual meetings to discuss student progress",
      startDate: "20250122T150000",
      endDate: "20250122T200000"
    },
    {
      title: "Spring Fundraiser Planning",
      date: "February 5, 2025",
      time: "6:30 PM",
      location: "Conference Room",
      description: "Plan our annual spring fundraising event",
      startDate: "20250205T183000",
      endDate: "20250205T193000"
    }
  ];

  const generateCalendarLink = (event) => {
    const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const params = new URLSearchParams({
      text: event.title,
      dates: `${event.startDate}/${event.endDate}`,
      details: event.description,
      location: event.location
    });
    return `${baseUrl}&${params.toString()}`;
  };

  const initiatives = [
    {
      title: "Library Enhancement Project",
      description: "Expanding our library with new books and digital resources",
      progress: 75,
      target: "$15,000",
      raised: "$11,250"
    },
    {
      title: "Playground Safety Upgrade",
      description: "Installing new safety equipment and surfaces",
      progress: 45,
      target: "$8,000",
      raised: "$3,600"
    },
    {
      title: "Technology Fund",
      description: "Purchasing tablets and computers for classrooms",
      progress: 60,
      target: "$12,000",
      raised: "$7,200"
    }
  ];

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
            <span className="text-primary">PTA</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
              <Users className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Parent Teacher Association</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Working together to create the best possible educational experience for our children through community, support, and shared commitment.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/contact">
              <Mail className="mr-2 h-5 w-5" />
              Join the PTA
            </Link>
          </Button>
        </div>
      </section>

      {/* About PTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Our PTA</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our Parent Teacher Association is a vibrant community of parents, teachers, and staff working together to enhance our children's educational experience. We organize events, fundraise for school improvements, and foster strong relationships between home and school.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">150+</div>
                    <div className="text-sm text-muted-foreground">Active Members</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                    <HandHeart className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold">$45K</div>
                    <div className="text-sm text-muted-foreground">Raised This Year</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold">25+</div>
                    <div className="text-sm text-muted-foreground">Events Per Year</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">12</div>
                    <div className="text-sm text-muted-foreground">Projects Completed</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Educational Support</h3>
                    <p className="text-sm text-muted-foreground">Enhancing learning resources</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                    <Heart className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Community Building</h3>
                    <p className="text-sm text-muted-foreground">Bringing families together</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Coffee className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Social Events</h3>
                    <p className="text-sm text-muted-foreground">Fun activities for all</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join us for these upcoming PTA events and meetings. Your participation makes a difference!
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <Card key={index} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={generateCalendarLink(event)} target="_blank" rel="noopener noreferrer">
                    Add to Calendar
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Initiatives */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Current Initiatives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how we're making a difference in our school community through these ongoing projects.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold mb-3">{initiative.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{initiative.description}</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="text-primary font-medium">{initiative.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${initiative.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Raised: {initiative.raised}</span>
                    <span className="text-muted-foreground">Target: {initiative.target}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Join */}
      <section className="py-16 bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ready to make a difference? Join our PTA community and help shape your child's educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
              <a href="tel:+1234567890">
                <Phone className="mr-2 h-5 w-5" />
                Call PTA Office
              </a>
            </Button>
            <Button variant="outline" size="lg" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
              <a href="mailto:pta@school.edu">
                <Mail className="mr-2 h-5 w-5" />
                Email PTA
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PTA;