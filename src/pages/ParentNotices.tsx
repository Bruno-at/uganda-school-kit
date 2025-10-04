import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Download,
  Bell,
  Calendar,
  Search,
  Filter,
  FileText,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Home,
  ChevronRight
} from 'lucide-react';

const ParentNotices = () => {
  const notices = [
    {
      title: "Term 2 Academic Calendar Released",
      date: "December 20, 2024",
      type: "Academic",
      urgent: false,
      excerpt: "Important dates for Term 2 including examination periods, holidays, and school events.",
      content: "The complete Term 2 academic calendar has been released with all important dates for the upcoming term..."
    },
    {
      title: "School Fees Payment Reminder",
      date: "December 18, 2024", 
      type: "Finance",
      urgent: true,
      excerpt: "Reminder for Term 2 school fees payment. Deadline is January 15, 2025.",
      content: "This is a reminder that school fees for Term 2 are due by January 15, 2025. Please ensure timely payment..."
    },
    {
      title: "Parent-Teacher Conference Schedule",
      date: "December 15, 2024",
      type: "Event",
      urgent: false,
      excerpt: "Schedule for upcoming parent-teacher conferences in January 2025.",
      content: "Parent-teacher conferences are scheduled for January 20-22, 2025. Please book your appointments..."
    },
    {
      title: "New Uniform Guidelines",
      date: "December 10, 2024",
      type: "General",
      urgent: false,
      excerpt: "Updated uniform requirements and guidelines for all students effective Term 2.",
      content: "New uniform guidelines have been established to maintain our school's professional appearance..."
    },
    {
      title: "COVID-19 Safety Protocol Update",
      date: "December 8, 2024",
      type: "Health",
      urgent: true,
      excerpt: "Updated health and safety protocols for the school environment.",
      content: "Following the latest health ministry guidelines, we have updated our safety protocols..."
    },
    {
      title: "Inter-House Sports Competition",
      date: "December 5, 2024",
      type: "Sports",
      urgent: false,
      excerpt: "Annual inter-house sports competition scheduled for January 2025.",
      content: "The annual inter-house sports competition will take place from January 25-27, 2025..."
    }
  ];

  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('All');

  const types = ['All', 'Academic', 'Finance', 'Event', 'General', 'Health', 'Sports'];

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || notice.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      
      {/* Breadcrumb */}
      <section className="py-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to="/parents" className="text-muted-foreground hover:text-primary">
              For Parents
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-primary">Notices & Circulars</span>
          </nav>
        </div>
      </section>

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
              <Bell className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Notices & Circulars</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Stay informed with the latest school announcements, important updates, and official communications.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-surface">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {types.map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Notices List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="space-y-6 max-w-4xl mx-auto">
            {filteredNotices.map((notice, index) => (
              <Card key={index} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold">{notice.title}</h3>
                      {notice.urgent && (
                        <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Urgent
                        </span>
                      )}
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {notice.type}
                      </span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">{notice.content}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {notice.date}
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {filteredNotices.length === 0 && (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notices found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our notifications to never miss an important announcement.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
              <Link to="/parents">
                <ArrowRight className="mr-2 h-5 w-5" />
                Back to Parent Portal
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10" asChild>
              <Link to="/contact">
                Contact Administration
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentNotices;