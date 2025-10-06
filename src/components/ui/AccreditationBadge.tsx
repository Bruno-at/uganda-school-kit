import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AccreditationBadgeProps {
  name: string;
  organization: string;
  year?: string;
  description?: string;
  verified?: boolean;
  className?: string;
}

const AccreditationBadge: React.FC<AccreditationBadgeProps> = ({
  name,
  organization,
  year,
  description,
  verified = true,
  className
}) => {
  return (
    <Card className={cn(
      "p-6 hover:shadow-[var(--shadow-large)] transition-all duration-300 relative overflow-hidden",
      className
    )}>
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
            <Award className="h-6 w-6" />
          </div>
          {verified && (
            <div className="flex items-center gap-1 text-success text-xs font-medium">
              <CheckCircle2 className="h-4 w-4" />
              Verified
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-bold mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{organization}</p>
        {year && (
          <p className="text-xs text-muted-foreground mb-3">Since {year}</p>
        )}
        {description && (
          <p className="text-sm text-foreground/80">{description}</p>
        )}
      </div>
    </Card>
  );
};

export default AccreditationBadge;
