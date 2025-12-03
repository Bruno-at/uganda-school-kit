import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NewsCard from '@/components/ui/NewsCard';
import { useNewsItems } from '@/hooks/useNewsItems';
import { useEvents } from '@/hooks/useEvents';
import { format } from 'date-fns';
import classroomImage from '@/assets/classroom-scene.jpg';
import {
  Search,
  Calendar,
  Tag,
  Clock,
  ArrowRight,
  Trophy,
  BookOpen,
  Users,
  MapPin
} from 'lucide-react';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: newsData, isLoading: newsLoading } = useNewsItems();
  const { data: eventsData, isLoading: eventsLoading } = useEvents();

  // Filter only published news items
  const newsItems = (newsData || []).filter(item => item.status === 'published').map(item => ({
    title: item.title,
    excerpt: item.short_description,
    date: format(new Date(item.date_published), 'MMMM dd, yyyy'),
    category: item.category,
    image: item.image_url,
    readTime: item.reading_time ? `${item.reading_time} min read` : '3 min read',
    featured: item.is_featured,
    slug: item.slug,
  }));

  // Filter only upcoming events
  const upcomingEvents = (eventsData || [])
    .filter(event => event.status === 'upcoming')
    .map(event => ({
      title: event.title,
      date: format(new Date(event.start_date), 'MMMM dd, yyyy'),
      time: `${format(new Date(event.start_date), 'h:mm a')} - ${format(new Date(event.end_date), 'h:mm a')}`,
      location: event.location,
      type: event.category,
      description: event.short_description,
      slug: event.slug,
      image: event.image_url,
    }));

  const legacyNewsItems = [
    {
      title: "Excellence Academy Wins Regional Science Fair 2024",
      excerpt: "Our students dominated the annual regional science fair, taking home first place in three categories including Environmental Science, Innovation, and Engineering Design.",
      date: "December 20, 2024",
      category: "Achievement",
      image: classroomImage,
      readTime: "3 min read",
      featured: true,
      slug: "excellence-academy-wins-regional-science-fair-2024"
    },
    {
      title: "New State-of-the-Art ICT Laboratory Officially Opens",
      excerpt: "The newly constructed computer laboratory, equipped with 50 modern workstations and high-speed internet, is now available for all A-Level students.",
      date: "December 18, 2024",
      category: "Facilities",
      readTime: "2 min read",
      slug: "new-state-of-the-art-ict-laboratory-officially-opens"
    },
    {
      title: "Annual Sports Day Brings Community Together",
      excerpt: "Over 800 parents and students participated in our annual sports day celebration, showcasing talent across various sporting disciplines.",
      date: "December 15, 2024",
      category: "Sports",
      readTime: "4 min read",
      slug: "annual-sports-day-brings-community-together"
    },
    {
      title: "Student Leadership Elections 2025 Announcement",
      excerpt: "Nominations are now open for Head Boy, Head Girl, and House Captain positions for the 2025 academic year. Students can submit applications until January 10.",
      date: "December 12, 2024",
      category: "Student Life",
      readTime: "2 min read",
      slug: "student-leadership-elections-2025-announcement"
    },
    {
      title: "Excellence Academy Choir Wins National Competition",
      excerpt: "Our school choir emerged victorious at the National Secondary Schools Music Festival, earning recognition for outstanding vocal performance.",
      date: "December 10, 2024",
      category: "Achievement",
      readTime: "3 min read",
      slug: "excellence-academy-choir-wins-national-competition"
    },
    {
      title: "Mathematics Olympiad Team Selected",
      excerpt: "Five students have been selected to represent Uganda at the East African Mathematics Olympiad scheduled for February 2025.",
      date: "December 8, 2024",
      category: "Academic",
      readTime: "2 min read",
      slug: "mathematics-olympiad-team-selected"
    }
  ];

  // Combine legacy and database news items
  const allNewsItems = newsItems.length > 0 ? newsItems : legacyNewsItems;

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'achievement', label: 'Achievements' },
    { value: 'academic', label: 'Academic' },
    { value: 'sports', label: 'Sports' },
    { value: 'facilities', label: 'Facilities' },
    { value: 'student-life', label: 'Student Life' },
    { value: 'cultural', label: 'Cultural' }
  ];

  const filteredNews = allNewsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           item.category.toLowerCase().replace(' ', '-') === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredNews = allNewsItems.filter(item => item.featured);

  if (newsLoading || eventsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading news and events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">News & Events</h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest happenings, achievements, and upcoming events at Excellence Academy.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-surface border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search news and events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
              <TabsTrigger value="news">Latest News</TabsTrigger>
              <TabsTrigger value="events">Upcoming Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="news" className="space-y-12">
              {/* Featured News */}
              {featuredNews.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold mb-8 text-center">Featured Stories</h2>
                  <div className="grid lg:grid-cols-2 gap-8 mb-12">
                    {featuredNews.map((item, index) => (
                      <Card key={index} className="overflow-hidden hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
                        {item.image && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                              {item.category}
                            </span>
                            <span className="text-xs text-muted-foreground">Featured</span>
                          </div>
                          <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                          <p className="text-muted-foreground mb-4">{item.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                              <span>{item.date}</span>
                              <span>{item.readTime}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              Read More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* All News */}
              <div>
                <h2 className="text-3xl font-bold mb-8 text-center">All News</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredNews.map((item, index) => (
                    <NewsCard
                      key={index}
                      title={item.title}
                      excerpt={item.excerpt}
                      date={item.date}
                      category={item.category}
                      image={item.image}
                      href={`/news/${item.slug || item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                  ))}
                </div>
                
                {filteredNews.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No news found matching your search criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="space-y-8">
              <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
                    {event.image && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                              {event.type}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                          <p className="text-muted-foreground mb-4">{event.description}</p>
                        </div>
                      </div>
                    
                    <div className="space-y-2 border-t pt-4">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                      <a 
                        href={index === 0 ? "/parent-teacher-conference.ics" : 
                              index === 1 ? "/football-championship.ics" :
                              index === 2 ? "/science-exhibition.ics" : 
                              "/cultural-day.ics"} 
                        download
                      >
                        <Button variant="outline" size="sm" className="w-full mt-4">
                          <Calendar className="h-4 w-4 mr-2" />
                          Add to Calendar
                        </Button>
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
              
              <div className="text-center">
                <a href="/calendar">
                  <Button variant="outline" size="lg">
                    <Calendar className="mr-2 h-5 w-5" />
                    View Full Calendar
                  </Button>
                </a>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Informed</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest news, event updates, and important announcements directly to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              placeholder="Your email address"
              className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/60"
            />
            <Button variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;