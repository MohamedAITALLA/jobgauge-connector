
import React from 'react';
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({ 
  className,
  children
}) => {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl",
      className
    )}>
      <div className="absolute inset-0 bg-temu-gradient animate-gradient-shift rounded-xl" style={{ backgroundSize: '200% 200%' }} />
      <div className="absolute inset-0 backdrop-blur-[1px] rounded-xl" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedGradient;
