import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Calendar = () => {
  const events = [
    {
      title: "Parent-Teacher Conference",
      date: "January 8, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "School Main Hall",
      type: "Conference",
      description: "Quarterly progress discussions and academic planning.",
      icsFile: "/parent-teacher-conference.ics"
    },
    {
      title: "Inter-House Football Championship",
      date: "January 15, 2025", 
      time: "2:00 PM - 5:00 PM",
      location: "School Sports Ground",
      type: "Sports",
      description: "Annual football competition between school houses.",
      icsFile: "/football-championship.ics"
    },
    {
      title: "Science Project Exhibition",
      date: "January 22, 2025",
      time: "10:00 AM - 3:00 PM", 
      location: "Science Laboratories",
      type: "Academic",
      description: "Students showcase innovative science projects and experiments.",
      icsFile: "/science-exhibition.ics"
    },
    {
      title: "Cultural Day Celebration",
      date: "February 5, 2025",
      time: "8:00 AM - 6:00 PM",
      location: "Entire Campus",
      type: "Cultural",
      description: "Celebrating Uganda's diverse cultures through music, dance, and food.",
      icsFile: "/cultural-day.ics"
    }
  ];

  const upcomingMonths = [
    { month: "January 2025", events: events.filter(e => e.date.includes("January")) },
    { month: "February 2025", events: events.filter(e => e.date.includes("February")) }
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">School Calendar</h1>
          <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Stay up to date with all upcoming events, important dates, and school activities.
          </p>
        </div>
      </section>

      {/* Calendar View */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {upcomingMonths.map((monthData, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">{monthData.month}</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {monthData.events.map((event, eventIndex) => (
                  <Card key={eventIndex} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
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
                    
                    <div className="space-y-2 border-t pt-4 mb-4">
                      <div className="flex items-center text-sm">
                        <CalendarIcon className="h-4 w-4 mr-3 text-muted-foreground" />
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
                    
                    <a href={event.icsFile} download>
                      <Button variant="outline" size="sm" className="w-full">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Add to Calendar
                      </Button>
                    </a>
                  </Card>
                ))}
              </div>
            </div>
          ))}
          
          {/* Calendar Integration */}
          <div className="text-center mt-16">
            <Card className="p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to our calendar to automatically receive updates about all school events and important dates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.open('https://calendar.google.com/calendar/u/0/r', '_blank')}
                  className="flex items-center"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Google Calendar
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('https://outlook.live.com/calendar/', '_blank')}
                  className="flex items-center"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Outlook Calendar
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calendar;