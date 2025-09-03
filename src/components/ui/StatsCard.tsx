import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  description,
  icon,
  className
}) => {
  return (
    <div className={cn(
      "card-elevated p-6 text-center hover:shadow-[var(--shadow-large)] transition-all duration-300 hover:-translate-y-1",
      className
    )}>
      {icon && (
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
            {icon}
          </div>
        </div>
      )}
      <div className="space-y-2">
        <p className="text-3xl font-bold text-gradient-primary">{value}</p>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;