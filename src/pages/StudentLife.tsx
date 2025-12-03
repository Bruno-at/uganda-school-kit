import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Trophy, Music, Palette, Book, Heart, Home, Calendar, Camera, ArrowRight, Award, Shield, Star } from 'lucide-react';
const StudentLife = () => {
  const clubs = [{
    name: "Debate Club",
    icon: <Book className="h-6 w-6" />,
    description: "Developing critical thinking and public speaking skills",
    activities: ["Weekly debates", "Inter-school competitions", "Model UN participation"]
  }, {
    name: "Drama Society",
    icon: <Users className="h-6 w-6" />,
    description: "Expressing creativity through theatrical performances",
    activities: ["Annual school plays", "Drama festivals", "Creative writing workshops"]
  }, {
    name: "Science Club",
    icon: <Award className="h-6 w-6" />,
    description: "Hands-on experiments and scientific discovery",
    activities: ["Science fair projects", "Laboratory experiments", "STEM competitions"]
  }, {
    name: "Environmental Club",
    icon: <Heart className="h-6 w-6" />,
    description: "Promoting sustainability and environmental awareness",
    activities: ["Tree planting", "Recycling programs", "Environmental education"]
  }];
  const sports = [{
    name: "Football",
    level: "Boys & Girls Teams",
    achievements: "Regional Champions 2024",
    icon: <Trophy className="h-6 w-6" />
  }, {
    name: "Basketball",
    level: "Senior & Junior Teams",
    achievements: "Inter-school Tournament Winners",
    icon: <Trophy className="h-6 w-6" />
  }, {
    name: "Netball",
    level: "Girls Teams",
    achievements: "District League Champions",
    icon: <Trophy className="h-6 w-6" />
  }, {
    name: "Athletics",
    level: "Track & Field",
    achievements: "Multiple individual medals",
    icon: <Star className="h-6 w-6" />
  }];
  const houses = [{
    name: "Wisdom House",
    color: "Blue",
    motto: "Knowledge is Power",
    patron: "Owl",
    achievements: "Academic Excellence Award 2024"
  }, {
    name: "Courage House",
    color: "Red",
    motto: "Brave Hearts, Strong Minds",
    patron: "Lion",
    achievements: "Sports Day Champions 2024"
  }, {
    name: "Unity House",
    color: "Green",
    motto: "Together We Achieve",
    patron: "Eagle",
    achievements: "Community Service Award 2024"
  }, {
    name: "Excellence House",
    color: "Gold",
    motto: "Striving for Greatness",
    patron: "Phoenix",
    achievements: "Overall House Cup Winners 2024"
  }];
  return <div className="min-h-screen bg-background">
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground bg-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Student Life</h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Beyond academics - discover the vibrant community, clubs, sports, and activities that make Excellence Academy a home away from home.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">20+</h3>
              <p className="text-sm text-muted-foreground">Student Clubs</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
                  <Trophy className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">15+</h3>
              <p className="text-sm text-muted-foreground">Sports Teams</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-success/80 text-success-foreground">
                  <Shield className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">4</h3>
              <p className="text-sm text-muted-foreground">School Houses</p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">50+</h3>
              <p className="text-sm text-muted-foreground">Annual Events</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Activities Tabs */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Co-Curricular Activities</h2>
            <p className="text-xl text-muted-foreground">
              Discover your passion and develop new skills through our diverse range of activities.
            </p>
          </div>

          <Tabs defaultValue="clubs" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-8">
              <TabsTrigger value="clubs">Clubs</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
              <TabsTrigger value="arts">Arts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="clubs" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {clubs.map((club, index) => <Card key={index} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                        {club.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center">{club.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 text-center">{club.description}</p>
                    
                    <div className="space-y-2">
                      {club.activities.map((activity, i) => <div key={i} className="flex items-center text-xs">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          <span>{activity}</span>
                        </div>)}
                    </div>
                  </Card>)}
              </div>
            </TabsContent>
            
            <TabsContent value="sports" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sports.map((sport, index) => <Card key={index} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
                        {sport.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center">{sport.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2 text-center">{sport.level}</p>
                    
                    <div className="p-3 bg-success/10 rounded-lg text-center">
                      <p className="text-xs text-success-foreground font-medium">
                        🏆 {sport.achievements}
                      </p>
                    </div>
                  </Card>)}
              </div>
            </TabsContent>
            
            <TabsContent value="arts" className="space-y-8">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                      <Music className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Music Program</h3>
                  <p className="text-muted-foreground mb-4">
                    Choir, instrumental music, and music theory classes for all skill levels.
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>• School Choir</li>
                    <li>• Piano & Guitar Lessons</li>
                    <li>• Music Festivals</li>
                  </ul>
                </Card>

                <Card className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
                      <Palette className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Visual Arts</h3>
                  <p className="text-muted-foreground mb-4">
                    Exploring creativity through painting, drawing, and digital arts.
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>• Art Exhibitions</li>
                    <li>• Painting Workshops</li>
                    <li>• Digital Design</li>
                  </ul>
                </Card>

                <Card className="p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-success to-success/80 text-success-foreground">
                      <Users className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Performing Arts</h3>
                  <p className="text-muted-foreground mb-4">
                    Drama, dance, and cultural performances throughout the year.
                  </p>
                  <ul className="text-sm space-y-2">
                    <li>• Annual Plays</li>
                    <li>• Cultural Dance</li>
                    <li>• Poetry Recitals</li>
                  </ul>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* House System */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">House System</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building character, leadership, and healthy competition through our four-house system.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {houses.map((house, index) => <Card key={index} className="p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                    <Home className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{house.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">Color: {house.color}</p>
                <p className="text-sm font-medium text-primary mb-2">"{house.motto}"</p>
                <p className="text-xs text-muted-foreground mb-4">Patron: {house.patron}</p>
                
                <div className="p-3 bg-success/10 rounded-lg">
                  <p className="text-xs text-success-foreground font-medium">
                    🏆 {house.achievements}
                  </p>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Student Leadership */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Student Leadership</h2>
            <p className="text-xl text-muted-foreground">
              Developing tomorrow's leaders through student government and leadership opportunities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Head Boy & Girl</h3>
              <p className="text-sm text-muted-foreground">
                Top student leaders representing the entire school community.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Prefect Body</h3>
              <p className="text-sm text-muted-foreground">
                Student leaders maintaining discipline and supporting school activities.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-success to-success/80 text-success-foreground">
                  <Shield className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">House Captains</h3>
              <p className="text-sm text-muted-foreground">
                Leaders organizing house activities and promoting house spirit.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery CTA */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Experience Student Life</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            See our vibrant student community in action through photos and videos of school events and activities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Camera className="mr-2 h-5 w-5" />
              View Photo Gallery
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">
                Schedule Visit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>;
};
export default StudentLife;