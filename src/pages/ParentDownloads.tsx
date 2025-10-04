import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Download,
  Calendar,
  CreditCard,
  Users,
  BookOpen,
  Clock,
  FileText,
  Search,
  Home,
  ChevronRight,
  ArrowRight,
  Shield,
  GraduationCap,
  Bus
} from 'lucide-react';

const ParentDownloads = () => {
  const downloads = [
    {
      title: "School Calendar 2024-2025",
      description: "Complete academic calendar with term dates, holidays, and events",
      type: "Calendar",
      size: "2.1 MB",
      downloadCount: "1,245",
      lastUpdated: "December 20, 2024",
      icon: <Calendar className="h-6 w-6" />
    },
    {
      title: "Fee Structure & Payment Guide",
      description: "Detailed breakdown of fees and payment methods available",
      type: "Finance",
      size: "1.8 MB", 
      downloadCount: "892",
      lastUpdated: "December 15, 2024",
      icon: <CreditCard className="h-6 w-6" />
    },
    {
      title: "Uniform Guidelines & Suppliers",
      description: "Official uniform requirements and approved supplier list",
      type: "Uniform",
      size: "950 KB",
      downloadCount: "1,567",
      lastUpdated: "December 10, 2024",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Student Handbook 2024-2025",
      description: "Complete guide to school policies, rules, and procedures",
      type: "Handbook",
      size: "4.2 MB",
      downloadCount: "2,134",
      lastUpdated: "August 20, 2024",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      title: "Transport Routes & Schedules", 
      description: "School bus routes, timings, and transport fee information",
      type: "Transport",
      size: "1.3 MB",
      downloadCount: "756",
      lastUpdated: "January 5, 2025",
      icon: <Bus className="h-6 w-6" />
    },
    {
      title: "Medical Forms Package",
      description: "Medical consent forms and health requirement documents",
      type: "Medical",
      size: "760 KB",
      downloadCount: "634",
      lastUpdated: "September 1, 2024",
      icon: <Shield className="h-6 w-6" />
    },
    {
      title: "Admission Forms 2025",
      description: "Application forms for new student admissions",
      type: "Admission",
      size: "1.1 MB",
      downloadCount: "1,890",
      lastUpdated: "November 1, 2024",
      icon: <GraduationCap className="h-6 w-6" />
    },
    {
      title: "Code of Conduct",
      description: "Student and parent code of conduct guidelines",
      type: "Policy",
      size: "850 KB",
      downloadCount: "1,023",
      lastUpdated: "August 15, 2024",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Parent-Teacher Conference Forms",
      description: "Forms for booking and feedback on conferences",
      type: "Conference",
      size: "425 KB",
      downloadCount: "567",
      lastUpdated: "December 5, 2024",
      icon: <Clock className="h-6 w-6" />
    }
  ];

  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('All');

  const types = ['All', 'Calendar', 'Finance', 'Uniform', 'Handbook', 'Transport', 'Medical', 'Admission', 'Policy', 'Conference'];

  const filteredDownloads = downloads.filter(download => {
    const matchesSearch = download.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         download.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || download.type === selectedType;
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
            <span className="text-primary">Downloads</span>
          </nav>
        </div>
      </section>

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/20">
              <Download className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Downloads</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Access important documents, forms, and resources for parents and students.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-surface">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {types.slice(0, 6).map(type => (
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

      {/* Downloads Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDownloads.map((download, index) => (
              <Card key={index} className="p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
                    {download.icon}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground block">{download.size}</span>
                    <span className="text-xs text-success">{download.downloadCount} downloads</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{download.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{download.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {download.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Updated: {download.lastUpdated}
                  </span>
                </div>
                
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={`/downloads/${download.title.toLowerCase().replace(/\s+/g, '-')}.pdf`} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </a>
                </Button>
              </Card>
            ))}
          </div>
          
          {filteredDownloads.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No documents found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Documents Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">8.2K</div>
              <div className="text-muted-foreground">Total Downloads</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-secondary to-secondary-dark text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Finding Something?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Can't find the document you're looking for? Contact our administration team for assistance.
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
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentDownloads;