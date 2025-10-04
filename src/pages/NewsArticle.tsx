import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Mail,
  Home,
  ChevronRight,
  Clock,
  Eye,
  Tag
} from 'lucide-react';

const NewsArticle = () => {
  const { id } = useParams();

  // Mock article data based on ID
  const articles = {
    '1': {
      title: "Annual Science Fair Showcases Student Innovation",
      content: `
        <p>Our annual Science Fair took place last week, featuring incredible projects from students across all grade levels. This year's theme, "Innovation for Tomorrow," inspired students to explore cutting-edge technologies and sustainable solutions.</p>
        
        <h3>Outstanding Projects</h3>
        <p>The competition was fierce, with over 150 projects submitted. Some standout entries included:</p>
        <ul>
          <li>A solar-powered water purification system by Grade 8 student Sarah Johnson</li>
          <li>An AI-powered recycling sorter created by the Grade 10 robotics team</li>
          <li>A biodegradable plastic alternative developed by chemistry students</li>
        </ul>
        
        <h3>Community Impact</h3>
        <p>This year's fair was attended by over 500 visitors, including parents, local businesses, and community leaders. Several projects caught the attention of local tech companies, leading to mentorship opportunities for our students.</p>
        
        <p>The event not only showcased our students' scientific abilities but also their commitment to solving real-world problems. We're incredibly proud of all participants and look forward to next year's fair.</p>
      `,
      date: "December 15, 2024",
      author: "Dr. Emily Chen",
      category: "Academic Excellence",
      readTime: "3 min read",
      views: "1,245",
      image: "/api/placeholder/800/400",
      tags: ["Science", "Innovation", "Students", "STEM"]
    },
    '2': {
      title: "New State-of-the-Art Library Opens",
      content: `
        <p>We're thrilled to announce the opening of our new library and learning center, a $2.5 million investment in our students' future. The facility features modern design, cutting-edge technology, and flexible learning spaces.</p>
        
        <h3>Modern Features</h3>
        <p>The new library includes:</p>
        <ul>
          <li>Over 25,000 books and digital resources</li>
          <li>10 private study rooms with smart boards</li>
          <li>A maker space with 3D printers and robotics equipment</li>
          <li>Collaborative learning areas with moveable furniture</li>
          <li>Quiet reading nooks with natural lighting</li>
        </ul>
        
        <h3>Digital Integration</h3>
        <p>Every aspect of the library has been designed with digital learning in mind. Students can access our entire digital catalog, book study rooms online, and use augmented reality stations to enhance their research.</p>
        
        <p>The library will be open from 7:00 AM to 6:00 PM on school days and 9:00 AM to 4:00 PM on weekends, providing extended access for our school community.</p>
      `,
      date: "December 10, 2024",
      author: "Principal Margaret Smith",
      category: "School News",
      readTime: "2 min read", 
      views: "2,156",
      image: "/api/placeholder/800/400",
      tags: ["Library", "Technology", "Learning", "Facilities"]
    },
    '3': {
      title: "Winter Concert Brings Community Together",
      content: `
        <p>Our annual Winter Concert was a resounding success, featuring performances from our choir, orchestra, and individual soloists. The event brought together families and community members for an evening of beautiful music and celebration.</p>
        
        <h3>Musical Highlights</h3>
        <p>The evening featured a diverse repertoire including:</p>
        <ul>
          <li>Traditional holiday classics performed by our senior choir</li>
          <li>Contemporary pieces by our jazz ensemble</li>
          <li>Solo performances by talented student musicians</li>
          <li>A special collaborative piece combining all musical groups</li>
        </ul>
        
        <h3>Community Support</h3>
        <p>The concert raised over $3,000 for our music program through ticket sales and donations. These funds will be used to purchase new instruments and support upcoming music competitions.</p>
        
        <p>Special thanks to our music teachers, Mrs. Anderson and Mr. Rodriguez, for their dedication in preparing our students for this wonderful performance.</p>
      `,
      date: "December 8, 2024",
      author: "Music Department",
      category: "Arts & Culture",
      readTime: "2 min read",
      views: "987",
      image: "/api/placeholder/800/400",
      tags: ["Music", "Performance", "Community", "Arts"]
    }
  };

  const article = articles[id as keyof typeof articles] || articles['1'];

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${article.title}`;

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
            <Link to="/news" className="text-muted-foreground hover:text-primary">
              News
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-primary truncate">{article.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" className="mb-8" asChild>
              <Link to="/news">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to News
              </Link>
            </Button>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary">{article.category}</Badge>
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{article.views} views</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-sm font-medium">Share:</span>
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`}>
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigator.share?.({ title: article.title, url: shareUrl })}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="aspect-video mb-8 overflow-hidden rounded-xl">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none prose-headings:font-bold prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:mb-6 prose-ul:mb-6 prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">Tags:</span>
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium">Share:</span>
                  <Button size="sm" variant="ghost" asChild>
                    <a
                      href={`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="sm" variant="ghost" asChild>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="sm" variant="ghost" asChild>
                    <a href={`mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`}>
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsArticle;