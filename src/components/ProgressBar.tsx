
import React from 'react';
import { cn } from "@/lib/utils";
import { ChevronRight } from 'lucide-react';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  current,
  total,
  className
}) => {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
            Step {current} of {total}
          </span>
        </div>
        <div className="text-xs font-medium text-primary">
          {percentage}% Complete
        </div>
      </div>
      
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-2">
        {Array.from({ length: total }).map((_, index) => (
          <div 
            key={index}
            className={cn(
              "relative group flex items-center justify-center",
              "w-6 h-6 rounded-full text-xs font-medium transition-all",
              index < current 
                ? "bg-primary text-white" 
                : index === current
                  ? "bg-primary/20 text-primary animate-pulse-soft ring-2 ring-primary/50"
                  : "bg-secondary text-muted-foreground"
            )}
          >
            {index < current ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              index + 1
            )}
            
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              {index === 0 ? "Start" : 
               index === total - 1 ? "Complete" : 
               `Question ${index + 1}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
