
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSplashProps {
  className?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'accent';
}

const AnimatedSplash: React.FC<AnimatedSplashProps> = ({
  className,
  color = 'var(--primary)',
  size = 'md',
  variant = 'default',
}) => {
  const sizeClasses = {
    sm: 'w-[200px] h-[200px]',
    md: 'w-[300px] h-[300px]',
    lg: 'w-[500px] h-[500px]',
  };

  const variantClasses = {
    default: 'opacity-20',
    accent: 'opacity-30',
  };

  return (
    <div 
      className={cn(
        'absolute -z-10 rounded-full blur-[80px] animate-pulse-gentle', 
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={{ 
        backgroundColor: color,
        animationDuration: `${Math.random() * 5 + 8}s`
      }}
    />
  );
};

export default AnimatedSplash;
