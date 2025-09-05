import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ArrowLeft,
  ArrowRight,
  Home,
  ChevronRight,
  MapPin,
  Clock,
  Users,
  Star,
  Camera,
  Headphones,
  Monitor,
  Calendar
} from 'lucide-react';

const VirtualTour = () => {
  const [currentStop, setCurrentStop] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const tourStops = [
    {
      id: 1,
      title: "Main Entrance & Reception",
      description: "Welcome to our beautiful main entrance. Our reception area is staffed with friendly personnel ready to assist visitors and ensure campus security.",
      image: "/api/placeholder/800/500",
      duration: "2:30",
      highlights: ["Modern security system", "Visitor management", "Information displays"]
    },
    {
      id: 2,
      title: "Primary Classrooms",
      description: "Step into our bright, spacious primary classrooms designed for optimal learning. Each room features modern technology and flexible seating arrangements.",
      image: "/api/placeholder/800/500",
      duration: "3:45",
      highlights: ["Interactive whiteboards", "Learning zones", "Natural lighting"]
    },
    {
      id: 3,
      title: "Science Laboratory",
      description: "Explore our state-of-the-art science laboratory where students conduct hands-on experiments and discover the wonders of science.",
      image: "/api/placeholder/800/500",
      duration: "4:15",
      highlights: ["Modern equipment", "Safety features", "Research stations"]
    },
    {
      id: 4,
      title: "Library & Learning Center",
      description: "Our comprehensive library houses thousands of books, digital resources, and quiet study areas for independent learning.",
      image: "/api/placeholder/800/500",
      duration: "3:20",
      highlights: ["Digital catalog", "Study rooms", "Reading corners"]
    },
    {
      id: 5,
      title: "Sports Facilities",
      description: "Tour our excellent sports facilities including the gymnasium, outdoor courts, and playing fields for various athletic activities.",
      image: "/api/placeholder/800/500",
      duration: "5:00",
      highlights: ["Full-size gymnasium", "Outdoor courts", "Athletic equipment"]
    },
    {
      id: 6,
      title: "Art & Music Rooms",
      description: "Visit our creative spaces where students explore artistic expression through visual arts, music, and performance.",
      image: "/api/placeholder/800/500",
      duration: "3:30",
      highlights: ["Art studios", "Music practice rooms", "Performance space"]
    },
    {
      id: 7,
      title: "Cafeteria & Kitchen",
      description: "See our modern cafeteria and commercial kitchen where healthy, nutritious meals are prepared daily for our students.",
      image: "/api/placeholder/800/500",
      duration: "2:45",
      highlights: ["Commercial kitchen", "Healthy menus", "Spacious dining"]
    },
    {
      id: 8,
      title: "Playground & Outdoor Areas",
      description: "Explore our safe, fun outdoor spaces including playgrounds, gardens, and recreational areas for student activities.",
      image: "/api/placeholder/800/500",
      duration: "4:00",
      highlights: ["Safety equipment", "Age-appropriate zones", "Garden areas"]
    }
  ];

  const nextStop = () => {
    setCurrentStop((prev) => (prev + 1) % tourStops.length);
  };

  const previousStop = () => {
    setCurrentStop((prev) => (prev - 1 + tourStops.length) % tourStops.length);
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
            <span className="text-primary">Virtual Tour</span>
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
              <Camera className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Virtual School Tour</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Explore our campus from the comfort of your home. Take an interactive virtual tour and discover our amazing facilities, classrooms, and learning environments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" asChild>
              <Link to="/book-visit">
                <Calendar className="mr-2 h-5 w-5" />
                Book In-Person Visit
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tour Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tour Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our virtual tour includes high-quality visuals, expert narration, and interactive elements to give you the best possible experience.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">HD Video Quality</h3>
              <p className="text-sm text-muted-foreground">Crystal clear high-definition footage</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 mx-auto mb-4">
                <Headphones className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-2">Audio Commentary</h3>
              <p className="text-sm text-muted-foreground">Professional narration and sound</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 mx-auto mb-4">
                <Monitor className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Interactive Controls</h3>
              <p className="text-sm text-muted-foreground">Navigate at your own pace</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">8 Key Locations</h3>
              <p className="text-sm text-muted-foreground">Comprehensive campus coverage</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Tour Player */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden">
              {/* Video Player Area */}
              <div className="relative bg-black aspect-video">
                <img
                  src={tourStops[currentStop].image}
                  alt={tourStops[currentStop].title}
                  className="w-full h-full object-cover"
                />
                
                {/* Play/Pause Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-16 w-16 rounded-full"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  </Button>
                </div>

                {/* Controls Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                      <span className="text-sm">{tourStops[currentStop].duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={previousStop}
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">{currentStop + 1} / {tourStops.length}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={nextStop}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tour Information */}
              <div className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold mb-3">{tourStops[currentStop].title}</h3>
                    <p className="text-muted-foreground mb-4">{tourStops[currentStop].description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Key Highlights:</h4>
                      <ul className="space-y-1">
                        {tourStops[currentStop].highlights.map((highlight, index) => (
                          <li key={index} className="flex items-center text-sm text-muted-foreground">
                            <Star className="h-3 w-3 text-primary mr-2" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">Duration: {tourStops[currentStop].duration}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">Location: {tourStops[currentStop].title}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm">Stop {currentStop + 1} of {tourStops.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Tour Navigation */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">Tour Locations</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tourStops.map((stop, index) => (
                <Card
                  key={stop.id}
                  className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-[var(--shadow-large)] ${
                    currentStop === index ? 'ring-2 ring-primary shadow-[var(--shadow-large)]' : ''
                  }`}
                  onClick={() => setCurrentStop(index)}
                >
                  <div className="aspect-video mb-3 overflow-hidden rounded-lg">
                    <img
                      src={stop.image}
                      alt={stop.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{stop.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{stop.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary">Stop {index + 1}</span>
                    <span className="text-xs text-muted-foreground">{stop.duration}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience More?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Liked what you saw? Schedule an in-person visit to meet our teachers, interact with students, and get a feel for our vibrant school community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
              <Link to="/book-visit">
                <Calendar className="mr-2 h-5 w-5" />
                Book In-Person Visit
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
              <Link to="/contact">
                Contact Admissions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VirtualTour;