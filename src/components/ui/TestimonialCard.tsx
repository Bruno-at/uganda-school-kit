import React from 'react';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  avatar,
  className
}) => {
  return (
    <div className={cn(
      "card-elevated p-6 space-y-4 relative",
      className
    )}>
      <div className="absolute top-4 right-4 text-primary/20">
        <Quote className="h-8 w-8" />
      </div>
      
      <blockquote className="text-lg leading-relaxed text-foreground">
        "{quote}"
      </blockquote>
      
      <div className="flex items-center space-x-3 pt-2">
        {avatar ? (
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-primary-foreground font-semibold text-sm">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <p className="font-semibold text-foreground">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;