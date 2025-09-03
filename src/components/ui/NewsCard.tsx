import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  href: string;
  category?: string;
  className?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  excerpt,
  date,
  image,
  href,
  category,
  className
}) => {
  return (
    <article className={cn(
      "card-elevated overflow-hidden card-hover group",
      className
    )}>
      {image && (
        <div className="aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time>{date}</time>
          </div>
          {category && (
            <span className="px-2 py-1 text-xs font-medium bg-secondary/20 text-secondary-dark rounded-full">
              {category}
            </span>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-3">
            {excerpt}
          </p>
        </div>
        
        <Button variant="ghost" size="sm" className="group/btn p-0 h-auto hover:bg-transparent" asChild>
          <Link to={href}>
            Read More
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default NewsCard;